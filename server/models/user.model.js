const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
