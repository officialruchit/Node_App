const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth=require('../middleware/auth')
// Register
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/update",auth,authController.updatePassword)
module.exports = router;
