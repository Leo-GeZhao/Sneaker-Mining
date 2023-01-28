const Inventory = require("../models/inventory");

//StockXAPI
const stockXAPI = require("stockx-api");
const stockX = new stockXAPI();

//Search a Sneaker with StockX API
function search(req, res, next) {
  stockX
    .fetchProductDetails(req.body.url)
    .then((products) => res.send(products))
    .catch((err) =>
      console.log(`Error scraping product details: ${err.message}`)
    );
}

//Create a Inventory
async function create(req, res, next) {
  try {
    const inventory = Inventory.createInventory(req);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Get All Inventories
async function index(req, res, next) {
  try {
    const inventories = await Inventory.getInventories(req);
    res.status(200).json(inventories);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Update a Inventory detail with StockXAPI
async function update(req, res, next) {
  try {
    const inventory = Inventory.updateInventory(req);
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Delete All Sizes of a Inventory
async function deleteAll(req, res, next) {
  try {
    await Inventory.deleteAllSize(req);
    res.status(200).json();
  } catch (err) {
    res.status(400).json(err);
  }
}

//Delete One Size of a Inventory
async function deleteSize(req, res, next) {
  try {
    await Inventory.deleteOneSize(req);
    res.status(200).json();
  } catch (err) {
    res.status(400).json(err);
  }
}

//Sold a Size of a Inventory
async function sold(req, res, next) {
  try {
    const soldInventory = await Inventory.soldSize(req);
    res.status(200).json(soldInventory);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  search,
  create,
  index,
  update,
  deleteAll,
  deleteSize,
  sold,
};
