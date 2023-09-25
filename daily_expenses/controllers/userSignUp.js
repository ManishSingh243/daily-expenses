const db = require('../util/database')
const bcrypt = require("bcrypt");

exports.postUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const [existingUsers] = await db.query(
        "SELECT * FROM expenseusers WHERE email = ?",
        [email]
      );
  
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const hashedPassowrd = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      await db.query(
        "INSERT INTO expenseusers (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassowrd]
      );
  
      res.json({ exists: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
}

exports.postUserLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user with the provided email exists
      const [user] = await db.query(
        "SELECT * FROM expenseusers WHERE email = ?",
        [email]
      );
  
      if (user.length === 0) {
        return res.status(404).json({ exists: false });
      }
  
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user[0].password);
  
      if (passwordMatch) {
        res.json({ exists: true });
      } else {
        res.status(401).json({ error: "User not authorized" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
}
