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

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { SaveContact, getAllContacts, deleteContact };