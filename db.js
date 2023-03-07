const mongoose = require("mongoose");

const connectDB = (dbname) => {
  mongoose
    .connect(`mongodb://localhost/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(() => {
      console.log(`mongodb connected to ${dbname}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
