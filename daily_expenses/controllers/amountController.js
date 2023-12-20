const db = require('../util/database')

exports.postAmount = async (req, res) => {
    try{
        const [users] = await db.query("SELECT userid, name, totalexpense FROM users");
        res.send(users);
    } catch(err){
        res.status(500).json({message: "Internal error"})
    }
}
