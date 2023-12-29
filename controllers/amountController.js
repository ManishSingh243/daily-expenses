const db = require('../util/database')

exports.postAmount = async (req, res) => {
    const userId = req.user.userId;
    try{
        const [users] = await db.query("SELECT name, email, totalexpense FROM users WHERE userid = ?", [userId]);
        res.send(users);
    } catch(err){
        res.status(500).json({message: "Internal error"})
    }
}
