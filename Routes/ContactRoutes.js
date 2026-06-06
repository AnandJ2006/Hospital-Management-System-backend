const express = require("express");
const router = express.Router();

const {
  SaveContact
} = require("../Controllers/ContactController");

router.post("/add", SaveContact);

module.exports = router;