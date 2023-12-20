/*const mysql2 = require('mysql2/promise');
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys'
})

module.exports = db;*/

const mysql2 = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;

