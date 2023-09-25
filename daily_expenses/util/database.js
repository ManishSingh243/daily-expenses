const mysql2 = require('mysql2/promise');
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys'
})

module.exports = db;
