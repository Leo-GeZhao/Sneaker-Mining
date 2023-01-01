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
    console.log(inventory);
    res.json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  index,
};
