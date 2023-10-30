const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController')
const authenticate = require('../middleware/authMiddleware')

//addExpense
router.post("/add-expense", authenticate, expenseController.postExpense)

//userExpenses
router.get("/user-expenses", authenticate, expenseController.getExpense)

//delete-expense
router.delete("/delete-expense/:expenseId", expenseController.deleteExpense);

router.post("/razorpay", authenticate, expenseController.postRazorpay);

router.post("/capture-payment", authenticate, expenseController.postPayment)

module.exports = router;
