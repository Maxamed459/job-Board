import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
