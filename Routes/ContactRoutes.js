const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

const {
  SaveContact,
  getAllContacts,
  deleteContact
} = require("../Controllers/ContactController");

router.post("/add", SaveContact);
router.get("/all", authMiddleware, getAllContacts);
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;