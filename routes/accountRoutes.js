const express = require("express");
const router = express.Router();
const {
  createAccount,
  addTodaysDetails
} = require("../controllers/accountControllers");
const authenticate = require("../midddlewares/authenticate");

// ROUTE - POST /accounts
// DESC - Add a new account
// AUTH - Private
router.post("/", authenticate, createAccount);

// ROUTE - PATCH /accounts/today
// DESC - Add a new financial record for today
// AUTH - Private
router.patch("/today", authenticate, addTodaysDetails);

module.exports = router;
