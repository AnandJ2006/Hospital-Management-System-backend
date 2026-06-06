const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  patientPhone: String,
  appointmentDate: String,
  appointmentTime: String,
  departmentSelect: String,
  appointmentReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Appointment",
  AppointmentSchema
);