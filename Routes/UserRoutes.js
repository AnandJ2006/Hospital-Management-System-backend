
const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

const {SignUpUser, LoginUser, getAllUsers} = require('../Controllers/UserController');

router.post("/signup", SignUpUser);
router.post("/login", LoginUser);
router.get("/all", authMiddleware, getAllUsers);

module.exports = router;