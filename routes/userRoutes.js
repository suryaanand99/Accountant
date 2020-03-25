const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// ROUTE - POST /register
// DESC - Registers a new user
// AUTH - Public
router.post("/register", userControllers.registerUser);

module.exports = router;
