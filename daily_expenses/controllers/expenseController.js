const db = require('../util/database')
const bcrypt = require("bcrypt");
const Razorpay = require('razorpay');
const { options } = require('../routes/userRoute');

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const authenticate = require('../middleware/authMiddleware');

AWS.config.update({
  accessKeyId: 'AKIAV5SHRHVIJVKWBUPA',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

var razorpay = new Razorpay({
  key_id: 'rzp_test_eYUyK6TSJLcUyt',
  key_secret: 'dIZlI3pLzs90VaLOMaRheWj7',
});

exports.postRazorpay = async (req, res) => {

  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";
  const options = {
    amount,
    currency,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);

    res.status(200).json({
      id: response.id,
      amount: response.amount,
      currency: response.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
};

exports.postPayment = async (req, res)=>{
  const userId = req.user.userId;
  await db.query("UPDATE users SET status = 'premium' WHERE userid = ?", [userId]);
  const [userData] = await db.query("SELECT * FROM users WHERE userid=?", [userId]);

  console.log(userData[0].status)

  res.status(200).json({
    isPremium: userData[0].status === 'premium'
  })
}

exports.postExpense = async (req, res) => {
    const {amount, description, category} = req.body;
    const userId = req.user.userId;
    try{
        const [userAmountResult] = await db.query('SELECT totalexpense FROM users WHERE userid = ?', [userId]);
        const userAmount = parseFloat(userAmountResult[0].totalexpense);
        const newAmount = userAmount + parseFloat(amount);
        await db.query('UPDATE users SET totalexpense = ? WHERE userid = ?', [newAmount, userId])
        await db.query('INSERT INTO userexpense (amount, description, category, userid) VALUES (?, ?, ?, ?)', [amount, description, category, userId]);
        res.status(200).json({message: "Expense added successfully"})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}

exports.getExpense = async (req, res) => {
    try{
        const userId = req.user.userId;
        console.log(userId);
        const [expenses] = await db.query("SELECT * FROM userexpense WHERE userid = ?", [userId]);
        console.log(expenses);
        res.status(200).json(expenses);
    }
    catch(err){
        res.status(500).json({error: "Internal server error"});
    }
}

exports.deleteExpense = async (req, res) => {
    try{
        const expenseId = req.params.expenseId;

        await db.query("DELETE FROM userexpense WHERE expenseid = ?", [expenseId]);

        res.status(200).json({message: "expense deleted successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

exports.getExpenseFile = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Check if the user is premium
    const [userData] = await db.query('SELECT status FROM users WHERE userid = ?', [userId]);

    if (userData[0].status !== 'premium') {
      return res.status(401).json({ error: 'Unauthorized. Premium access required.' });
    }

    // Query expenses for the user
    const [expenses] = await db.query('SELECT * FROM userexpense WHERE userid = ?', [userId]);

    // Generate a CSV file
    const filePath = path.join(__dirname, `../expense_report_${userId}.csv`);
    const csvData = expenses.map((expense) => `${expense.amount},${expense.description},${expense.category}`).join('\n');
    fs.writeFileSync(filePath, 'Amount,Description,Category\n' + csvData, 'utf-8');

    // Upload the file to S3
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'expensetracker-manish1',
      Key: `expense_reports/expense_report_${userId}.csv`,
      Body: fs.createReadStream(filePath),
    };

    await s3.upload(params).promise();

    // Get the file URL
    const fileUrl = s3.getSignedUrl('getObject', { Bucket: params.Bucket, Key: params.Key, Expires: 60 });

    // Delete the local file
    fs.unlinkSync(filePath);

    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
