const mongoose = require("mongoose");

const ParentCategories = mongoose.model("parentcategories", {
  id: { type: Number },
  parentcategoryname: { type: String },
  status: { type: Boolean },
});

module.exports = ParentCategories;
