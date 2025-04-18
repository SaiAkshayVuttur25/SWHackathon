const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { authenticateLogin } = require("../middlewares/authenticateLogin.js");

router.get("/getUserInfo", userController.getUserInfo);

router.get("/myblogs", authenticateLogin, userController.myblogs);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/resetPassword", userController.resetPassword);

module.exports = router;
