const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./db");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

const port = process.env.PORT;
const app = express();

// To realize the body of json requests.
app.use(express.json());

// Routes
app.use(userRoutes);
app.use('/accounts', accountRoutes);

app.listen(port, () => {
  console.log("server running successfully");
});
