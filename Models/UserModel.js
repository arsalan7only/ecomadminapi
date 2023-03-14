const mongoose = require("mongoose");

const userModel = mongoose.model("users", {
  name: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  active: { type: Boolean },
  id: { type: Number },
});

module.exports = userModel;
