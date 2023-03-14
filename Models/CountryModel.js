const mongoose = require("mongoose");

const countryModel = mongoose.model("contries", {
  name: { type: String },
  languages: { type: Object },
  currencies: { type: Object },
  countrycode: { type: Object },
});

module.exports = countryModel;
