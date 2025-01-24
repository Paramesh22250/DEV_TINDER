const mongoose = require("mongoose");

const connectDB = async () => {
  // await mongoose.connect(
  //   "mongodb+srv://209x1a04e7:9bmalo6rT8HQIDl4@bobby.rxjtu.mongodb.net/DevTinder"
  // );
  await mongoose.connect("mongodb://localhost:27017/DevTinder");
};

module.exports = {connectDB}