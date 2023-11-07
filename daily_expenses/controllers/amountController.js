const db = require('../util/database')

exports.postAmount = async (req, res) => {
    try{
        console.log("program initiated")
        const [users] = await db.query("SELECT userid, name, totalexpense FROM users");
        console.log("line 5 executed successfully")
        console.log("users list:", users);
       /* const arr = [];
        console.log("arr created successfully")

        for (const user of users) {
            console.log("entered into an array successfully", user.userid)
            const [totalAmountResult] = await db.query("SELECT SUM(amount) as totalAmount FROM userexpense WHERE userid = ?", [user.userid]);
            console.log("query executed successfully");
            const totalAmount = totalAmountResult[0].totalAmount || 0;
            console.log("amount calculated successfully")

            arr.push({
                userName: user.name,
                Amount: totalAmount
            });
            console.log("data pushed successfully")
        }
        console.log(arr) 
        res.send(arr); */
        res.send(users);
    } catch(err){
        res.status(500).json({message: "Internal error"})
    }
}
