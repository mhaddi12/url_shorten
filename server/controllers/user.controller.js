const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    if (!name) {
      return res.status(400).json({
        msg: "Name is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    return res.status(200).json({
      msg: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User does not exist",
      });
    }
    const isPasswordMatch = bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      msg: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = { register, login };
