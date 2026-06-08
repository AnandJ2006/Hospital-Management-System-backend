const Admin = require("../Models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();
    
    res.status(201).json({ message: "Admin added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { adminLogin, addAdmin };
