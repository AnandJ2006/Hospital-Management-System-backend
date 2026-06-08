const User = require("../Models/UserModels");

const SignUpUser = async (req, res) => {
    try {
        const { fullname, email, username, password } = req.body;
        const NewUser = new User({
            fullname,
            email,
            username,
            password,
        });
        const SavedUser = await NewUser.save();
        res.status(200).json({
            message: "User registered successfully",
            data: SavedUser,
        });
    }
    catch (error) {
        res.status(404).json({
             message: "Invalid user data",
             error: error.message,
        });
    }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Exclude the password field for security
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    SignUpUser,
    LoginUser,
    getAllUsers
};