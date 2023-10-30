const db = require("../util/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.query(
      "INSERT INTO users (name, email, password, status) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassowrd, 'null']
    );
    res.status(200).json({ exists : true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user[0].userid }, 'MANISH');
      console.log(token);
      res.status(200).json({ token, isPremium: user[0].status === 'premium' });
    } else {
      res.status(401).json({ error: "User not authorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
