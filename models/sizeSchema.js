const Schema = require("mongoose").Schema;

const sizeSchema = new Schema(
  {
    size: {
      type: String,
    },
    highestBid: {
      type: Number,
    },
    lowestAsk: {
      type: Number,
    },
    lastSale: {
      type: Number,
    },
    is_sold: {
      type: Boolean,
      default: false,
    },
    soldPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = sizeSchema;
