import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
