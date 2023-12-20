const express = require('express');
const amountController = require('../controllers/amountController')
const router = express.Router();

router.get('/expense-amount', amountController.postAmount)

module.exports = router;
