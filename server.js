const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;
require("./db");

const app = express();

app.get("/home", (req, res) => {
  console.log("hi da!");
  res.send();
});

app.listen(port, () => {
  console.log("server running successfully");
});
