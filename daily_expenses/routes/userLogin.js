const express = require('express');
const userController = require('../controllers/userSignUp')
const expenseController = require('../controllers/expenseUsers')
const router = express.Router();

//signup route
router.post("/signup", userController.postUserSignUp);

//login route
router.post("/login", userController.postUserLogin);

//addExpense
router.post("/addExpense", expenseController.postAddExpense)

//userExpenses
router.get("/expenses", expenseController.getUserExpenses)

module.exports = router;
