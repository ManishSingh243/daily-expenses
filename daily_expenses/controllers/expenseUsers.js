const db = require('../util/database')
const bcrypt = require("bcrypt");

exports.postAddExpense = async (req, res) => {
    const {money, description, category} = req.body;
    try{
        await db.query('INSERT INTO expensedetail (money, description, category) VALUES (?, ?, ?)', [money, description, category])
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
}

exports.getUserExpenses = async (req, res) => {
    try{
        const [expenses] = await db.query("SELECT * FROM expensedetail");
        res.status(200).json(expenses)
    }
    catch(err){
        res.status(500).json({error: "Internal server error"});
    }
}
