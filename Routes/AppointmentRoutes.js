const express = require("express");
const router = express.Router();

const {
  BookAppointment
} = require("../Controllers/AppointmentController");

router.post("/book", BookAppointment);

module.exports = router;