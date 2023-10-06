const db = require('../util/database')
const bcrypt = require("bcrypt");

exports.postExpense = async (req, res) => {
    const {amount, description, category} = req.body;
    const userId = req.user.userId;
    try{
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
