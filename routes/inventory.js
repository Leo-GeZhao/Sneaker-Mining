const express = require("express");
const router = express.Router();

const inventoryCtrl = require("../controllers/inventory");

router.post("/add", inventoryCtrl.create);
router.get("/inventory", inventoryCtrl.index);
router.post("/update", inventoryCtrl.update);

module.exports = router;
