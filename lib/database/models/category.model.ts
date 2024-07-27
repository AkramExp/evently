import mongoose, { models, Schema } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Category =
  models.Category || mongoose.model("Category", categorySchema);
