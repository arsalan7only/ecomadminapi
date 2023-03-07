const mongoose = require("mongoose");

const customerModel = mongoose.model("customers", {
  fname: { type: String, require: true },
  lname: { type: String },
  email: { type: String },
  mobile: { type: Number },
  id: { type: Number },
  totalsale: { type: Number },
  totalorder: { type: Number },
  user_id: { type: Number },
  username: { type: String },
  password: { type: String },
  user_type: { type: String },
  registered_date: { type: String },
  status: { type: Boolean },
  gender: { type: String },
});

module.exports = customerModel;
