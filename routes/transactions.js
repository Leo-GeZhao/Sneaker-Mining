const express = require("express");
const router = express.Router();
const transactionCtrl = require("../controllers/transaction");

router.post("/", transactionCtrl.index);
router.post("/create", transactionCtrl.create);

module.exports = router;
