const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sizeSchema = require("./sizeSchema");

const inventorySchema = new Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    image: {
      type: String,
    },
    size: [sizeSchema],
    expense: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
