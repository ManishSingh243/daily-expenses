// authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "MANISH"); // Replace with your secret key
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authenticate;
