const express = require('express');
const amountController = require('../controllers/amountController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/expense-amount', authenticate, amountController.postAmount)

module.exports = router;
