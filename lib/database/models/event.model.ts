import mongoose, { Document, models, Schema } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  categoryId: string;
  organizerId: string;
}

const eventSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    location: { type: String },
    imageUrl: { type: String },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    organizerId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Event = models.Event || mongoose.model("Event", eventSchema);
