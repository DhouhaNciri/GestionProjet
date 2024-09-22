let mongoose = require("mongoose");

let URI = process.env.DB_URL;
mongoose.set("strictQuery", true);
exports.ConnectToDataBase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error("MongoDB connection error", error.message);
  }
};


