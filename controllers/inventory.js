const Inventory = require("../models/inventory");
const StockXAPI = require("stockx-api");
const stockX = new StockXAPI();

async function create(req, res, next) {
  try {
    const inventory = new Inventory();
    const sneaker = await stockX.fetchProductDetails(req.body.url);
    inventory.name = sneaker.urlKey;
    inventory.image = sneaker.image;
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
    res.json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res, next) {
  try {
    const inventory = await Inventory.find({});
    res.json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res, next) {
  try {
    const sneaker = await stockX.fetchProductDetails(req.body.url);
    const inventory = await Inventory.findById(req.body.id);
    req.body.size.map((s) => {
      const updateDetail = sneaker.variants.filter((size) => size.size == s);
      var detail = inventory.size.filter((size) => size.size == s);
      console.log(updateDetail[0].lowestAsk);
      detail[0].highestBid = updateDetail[0].market.highestBid;
      detail[0].lowestAsk = updateDetail[0].market.lowestAsk;
      detail[0].lastSale = updateDetail[0].market.lastSale;
    });
    inventory.save();
    res.json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  index,
  update,
};
