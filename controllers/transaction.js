const Transaction = require("../models/transaction");

async function create(req, res) {
  try {
    const transaction = new Transaction();
    transaction.user = req.body.user;
    transaction.name = req.body.name;
    transaction.brand = req.body.brand;
    transaction.image = req.body.image;
    transaction.expense = req.body.expense;
    transaction.size = req.body.size;
    transaction.price = req.body.price;
    transaction.profit = req.body.price - req.body.expense;
    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const transactions = await Transaction.find({ user: req.body.id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  index,
};
