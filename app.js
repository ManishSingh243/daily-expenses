const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const loginRoute = require('./routes/loginRoute')
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute')
const passwordRoute = require('./routes/passwordRoute')

const PORT = process.env.PORT;

app.use(loginRoute);
app.use(userRoute);
app.use(adminRoute);
app.use(passwordRoute);

app.listen(PORT, (req, res) => {
  console.log("back end is working fine");
});