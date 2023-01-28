const express = require("express");
const router = express.Router();

const inventoryCtrl = require("../controllers/inventory");

//Get All Inventory
router.post("/", inventoryCtrl.index);

//Search Sneaker Detail Using StockXAPI
router.post("/search-sneaker", inventoryCtrl.search);

//Add a Inventory
router.post("/add", inventoryCtrl.create);

//Update Inventory Detail Using StockXAPI
router.post("/update", inventoryCtrl.update);

// Delete All Sizes from Inventory
router.delete("/:id/delete", inventoryCtrl.deleteAll);

//Delete a Single Size from Inventory
router.post("/:id/delete-size", inventoryCtrl.deleteSize);

//Sold a Inventory
router.post("/:id/sold-size", inventoryCtrl.sold);

module.exports = router;
