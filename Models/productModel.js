const mongoose = require("mongoose");

const productModel = mongoose.model("products", {
  title: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  status: { type: Boolean },
  category: { parentCategory: Number, childCategory: Number },
  uploadimage: [Number],
  productinformation: {
    sku: String,
    modelnumber: String,
    productquantity: String,
  },
  price: {
    bestprice: String,
    originalprice: String,
    sellingprice: String,
  },
  shoppinginformation: {
    shippingcharges: String,
    productweight: String,
  },
  taxinformation: {
    taxamount: String,
  },
  seo: {
    metatag: String,
    discription: String,
    keword: String,
  },
  comment: [
    {
      question: String,
      answer: String,
    },
  ],
  id: { type: Number },
  createdproduct: { type: String },
  uploadedproduct: { type: String },
});

module.exports = productModel;
