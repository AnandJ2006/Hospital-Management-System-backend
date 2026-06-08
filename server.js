const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const UserRoutes = require("./Routes/UserRoutes");
const ContactRoutes = require("./Routes/ContactRoutes");
const AppointmentRoutes = require("./Routes/AppointmentRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");

app.use("/api/user", UserRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/appointment", AppointmentRoutes);
app.use("/api/admin", AdminRoutes);

const Admin = require("./Models/AdminModel");
const bcrypt = require("bcryptjs");

mongoose
.connect(process.env.MONGO_URL)
.then(async () => {
  console.log("MongoDB connected successfully");
  
  try {
    const adminEmail = "admin@hospital.com";
    const adminPassword = "admin123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const admin = new Admin({
        email: adminEmail,
        password: hashedPassword
      });

      await admin.save();
      console.log("Initial Admin created successfully!");
    }
  } catch (err) {
    console.error("Error seeding admin during startup:", err);
  }
})
.catch((err) => {
    console.log("MongoDB connection failed",err);
}); 