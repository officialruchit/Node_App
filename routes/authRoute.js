const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/update", auth, authController.updatePassword);

router.get("/user", auth, authController.getUser);

router.put("/user/:id", auth, authController.updateUser);

router.delete("/user/:id", auth, authController.deleteUser);

module.exports = router;
