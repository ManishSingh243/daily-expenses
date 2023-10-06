const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
//const authenticate = require('../middleware/authMiddleware')

//signup route
router.post("/signup", userController.postSignUp);

//login route
router.post("/login", userController.postLogin);

module.exports = router;
