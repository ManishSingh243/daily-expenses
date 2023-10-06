const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController')
const authenticate = require('../middleware/authMiddleware')

//addExpense
router.post("/add-expense", authenticate, expenseController.postExpense)

//userExpenses
router.get("/user-expenses", authenticate, expenseController.getExpense)

module.exports = router;
