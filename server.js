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
app.use("/api/user", UserRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/appointment", AppointmentRoutes);

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection failed",err);
}); 