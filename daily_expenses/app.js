const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const userRoutes = require('./routes/userLogin')

app.use(userRoutes);

app.listen(4000, (req, res) => {
  console.log("back end is working fine");
});
