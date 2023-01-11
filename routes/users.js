const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");

router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.post("/googleSignIn", usersCtrl.googleSignIn);

module.exports = router;
