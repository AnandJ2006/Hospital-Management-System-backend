const Contact = require("../Models/ContactModel");

const SaveContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const savedContact = await contact.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { SaveContact };