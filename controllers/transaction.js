const Transaction = require("../models/transaction");

//Create a Sold Transaction
async function create(req, res, next) {
  try {
    const transaction = Transaction.createTransaction(req);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Get All Transactions
async function index(req, res) {
  try {
    const transactions = await Transaction.getTransactions(req);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  index,
};
