const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
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
  soldPrice: {
    type: String,
  },
  soldData: {
    type: Date,
  },
  profit: {
    type: Number,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
