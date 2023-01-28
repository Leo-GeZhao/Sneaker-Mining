const express = require("express");
const router = express.Router();

const transactionCtrl = require("../controllers/transaction");

//Get All Transactions
router.post("/", transactionCtrl.index);

//Create a Transaction
router.post("/create", transactionCtrl.create);

module.exports = router;
