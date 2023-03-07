const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  title: { type: String },
  img: {
    data: Buffer,
    contentType: String,
  },
  category_image: { type: String },
  id: { type: Number },
});

const imageModel = mongoose.model("images", imageSchema);

module.exports = imageModel;
