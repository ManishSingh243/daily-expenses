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

app.use(loginRoute);
app.use(userRoute);

app.listen(4000, (req, res) => {
  console.log("back end is working fine");
});
