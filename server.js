const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./db");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT;
const app = express();

// To realize the body of json requests.
app.use(express.json());

// Routes
app.use(userRoutes);

app.listen(port, () => {
  console.log("server running successfully");
});
