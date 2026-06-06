const Appointment = require("../Models/AppointmentModel");

const BookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    const savedAppointment =
      await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      data: savedAppointment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { BookAppointment };