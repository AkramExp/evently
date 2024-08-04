import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  username: { type: String },
  name: { type: String },
  photo: { type: String },
  password: { type: String },
  isGoogle: { type: Boolean, default: false },
  isGithub: { type: Boolean, default: false },
});

export const User = models.User || mongoose.model("User", userSchema);
