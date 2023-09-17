const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('hello')
})

app.listen(4000, (req, res)=>{
    console.log("back end is working fine")
})