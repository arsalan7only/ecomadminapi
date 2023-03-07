const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  id: { type: Number },
});

const ImageModel = mongoose.model("imageModel", imageSchema);

module.exports = ImageModel;
