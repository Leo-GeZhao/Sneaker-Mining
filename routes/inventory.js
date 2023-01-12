const express = require("express");
const router = express.Router();

const inventoryCtrl = require("../controllers/inventory");

router.post('"/search-sneaker', inventoryCtrl.search);
router.post("/add", inventoryCtrl.create);
router.post("/inventory", inventoryCtrl.index);
router.post("/update", inventoryCtrl.update);
router.delete("/inventory/:id/delete", inventoryCtrl.delete);
router.delete("/inventory/:id/delete-size", inventoryCtrl.deleteSize);
router.post("/inventory/:id/sold-size", inventoryCtrl.sold);
router.get("/inventory/transactions", inventoryCtrl.getTransaction);

module.exports = router;
