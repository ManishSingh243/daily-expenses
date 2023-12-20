/*const mysql2 = require('mysql2/promise');
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys'
})

module.exports = db;*/

const mysql2 = require('mysql2/promise');

const db = mysql2.createPool({
    host: 'database-2.c10ey06e6xuk.ap-south-1.rds.amazonaws.com',
    user: 'john',
    password: 'mufilrahman',
    database: 'sys',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
