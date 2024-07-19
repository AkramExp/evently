import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  username: { type: String },
  name: { type: String },
  photo: { type: String },
  password: { type: String },
});

export const User = mongoose.model("User", userSchema);
