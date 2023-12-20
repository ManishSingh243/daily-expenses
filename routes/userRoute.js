const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticate = require('../middleware/authMiddleware');

router.post('/add-expense', authenticate, expenseController.postExpense);
router.get('/user-expenses', authenticate, expenseController.getExpense);
router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);
router.post('/razorpay', authenticate, expenseController.postRazorpay);
router.post('/capture-payment', authenticate, expenseController.postPayment);

// New endpoint for downloading expense file
router.get('/download-expense-file', authenticate, expenseController.getExpenseFile);

module.exports = router;
