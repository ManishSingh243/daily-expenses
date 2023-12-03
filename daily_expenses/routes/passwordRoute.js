const express = require('express');

const passwordController = require('../controllers/passwordController')
const router = express.Router();

router.post('/forgot-password', passwordController.postPassword)

module.exports = router;
