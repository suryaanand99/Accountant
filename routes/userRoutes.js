const express = require("express");
const authenticate = require("../midddlewares/authenticate");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// ROUTE - POST /register
// DESC - Registers a new user
// AUTH - Public
router.post("/register", userControllers.registerUser);

// ROUTE - POST /login
// DESC - login a user
// AUTH - Public
router.post("/login", userControllers.loginUser);

// ROUTE - DELETE /logout
// DESC -  logout a user
// AUTH - Private
router.delete("/logout", authenticate, userControllers.logoutUser);

module.exports = router;
