import mongoose from "mongoose";

export const connectDB = () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB URI is not present");

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};
