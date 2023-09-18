const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//const db = require('./util/database');
const mysql2 = require('mysql2/promise');
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys'
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const [existingUsers] = await db.query('SELECT * FROM expenseusers WHERE email = ?', [email]);
  
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Insert the new user into the database
      await db.query('INSERT INTO expenseusers (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(4000, (req, res)=>{
    console.log("back end is working fine")
})