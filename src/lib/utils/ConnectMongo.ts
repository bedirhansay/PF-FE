import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(
      URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
    console.log("MongoDB Connected");
  } catch (error) {
    process.exit(1);
  }
};
