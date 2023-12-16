import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Database connected!");
    });
  } catch (err) {
    console.error("Something went wrong connecting to database");
    console.error(err);
  }
};
