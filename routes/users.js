const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/user");

//User SignUp
router.post("/", usersCtrl.create);

//User Login
router.post("/login", usersCtrl.login);

//User Google Oauth SignUp&Login
router.post("/googleSignIn", usersCtrl.googleSignIn);

module.exports = router;
