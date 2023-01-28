const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    brand: {
      type: String,
    },
    name: {
      type: String,
    },
    size: {
      type: String,
    },
    price: {
      type: String,
    },
    profit: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Create a Sold Transaction
transactionSchema.statics.createTransaction = async function (req) {
  const { user, name, brand, image, expense, size, price } = req.body;
  const transaction = this.create({
    user: user,
    name: name,
    brand: brand,
    image: image,
    expense: expense,
    size: size,
    price: price,
    profit: price - expense,
  });
  return transaction;
};

//Get All Transactions
transactionSchema.statics.getTransactions = async function (req) {
  const transactions = await this.find({ user: req.body.id }).sort(
    "-createdAt"
  );
  return transactions;
};

module.exports = mongoose.model("Transaction", transactionSchema);
