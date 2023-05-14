const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (dbUri) => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;