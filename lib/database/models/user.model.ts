import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
});

export const User = mongoose.model("User", userSchema);
