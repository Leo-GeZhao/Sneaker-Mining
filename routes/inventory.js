const express = require("express");
const router = express.Router();

const inventoryCtrl = require("../controllers/inventory");

router.post("/", inventoryCtrl.index);
router.post("/search-sneaker", inventoryCtrl.search);
router.post("/add", inventoryCtrl.create);
router.post("/update", inventoryCtrl.update);
router.delete("/:id/delete", inventoryCtrl.delete);
router.post("/:id/delete-size", inventoryCtrl.deleteSize);
router.post("/:id/sold-size", inventoryCtrl.sold);

module.exports = router;
