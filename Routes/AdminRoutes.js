const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

const { adminLogin, addAdmin } = require("../Controllers/AdminController");

router.post("/login", adminLogin);
router.post("/add", authMiddleware, addAdmin);

module.exports = router;
