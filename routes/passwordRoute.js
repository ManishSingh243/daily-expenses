const express = require('express');

const passwordController = require('../controllers/passwordController')
const router = express.Router();

router.post('/forgot-password', passwordController.postPassword)
router.post('/reset-password/:requestId', passwordController.postResetPassword)

module.exports = router;
