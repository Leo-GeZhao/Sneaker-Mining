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
  },
  {
    timestamps: true,
  }
);

module.exports = sizeSchema;
