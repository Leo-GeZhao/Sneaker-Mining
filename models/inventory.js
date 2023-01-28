const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sizeSchema = require("./sizeSchema");

//StockX API
const stockXAPI = require("stockx-api");
const stockX = new stockXAPI();

const inventorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
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
    brand: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

//Create a Inventory
inventorySchema.statics.createInventory = async function (req) {
  const inventory = new this();
  const sneaker = await stockX.fetchProductDetails(req.body.url);
  inventory.name = sneaker.urlKey;
  inventory.image = sneaker.image;
  inventory.user = req.body.user;
  inventory.url = req.body.url;
  inventory.expense = req.body.expense;
  inventory.brand = req.body.brand;
  req.body.size.map((s, idx) => {
    const detail = sneaker.variants.filter((size) => size.size == s);
    const singleSize = {
      size: detail[0].size,
      highestBid: detail[0].market.highestBid,
      lowestAsk: detail[0].market.lowestAsk,
      lastSale: detail[0].market.lastSale,
    };
    inventory.size.push(singleSize);
  });
  inventory.save();
  return inventory;
};

//Get All Inventory
inventorySchema.statics.getInventories = async function (req) {
  const inventories = await this.find({ user: req.body.id });
  return inventories;
};

//Update a Inventory Detail from StockXAPI
inventorySchema.statics.updateInventory = async function (req) {
  const sneaker = await stockX.fetchProductDetails(req.body.url);
  const inventory = await this.findById(req.body.id);
  req.body.size.map((s) => {
    const updateDetail = sneaker.variants.filter((size) => size.size == s);
    var detail = inventory.size.filter((size) => size.size == s);
    detail[0].highestBid = updateDetail[0].market.highestBid;
    detail[0].lowestAsk = updateDetail[0].market.lowestAsk;
    detail[0].lastSale = updateDetail[0].market.lastSale;
  });
  inventory.save();
};

//Delete All Size for a Inventory
inventorySchema.statics.deleteAllSize = async function (req) {
  await this.findByIdAndDelete(req.params.id);
  return "All Sizes Deleted";
};

//Delete One Size from a Inventory
inventorySchema.statics.deleteOneSize = async function (req) {
  const inventory = await this.findById(req.params.id);
  if (inventory.size.length === 1) {
    inventory.delete();
  } else {
    await this.findByIdAndUpdate(req.params.id, {
      $pull: {
        size: { size: req.body.size },
      },
    });
  }
  return "Size Deleted";
};

//Sold a Size from a Inventory
inventorySchema.statics.soldSize = async function (req) {
  await this.updateOne(
    {
      _id: req.params.id,
      "size.size": req.body.soldSize,
    },
    {
      $set: { "size.$.isSold": true, "size.$.soldPrice": req.body.soldPrice },
    }
  );
  const soldInventory = await this.findById(req.params.id);
  console.log(soldInventory);
  return soldInventory;
};

module.exports = mongoose.model("Inventory", inventorySchema);
