"use server";
import { GetAllEventsParams, IEvent } from "@/types";
import axios from "axios";
import mongoose from "mongoose";
import { Event } from "../database/models/event.model";
import { connectDB } from "../database";

export async function createEvent(event: IEvent) {
  try {
    const response = await axios.post("/api/event/create", event, {
      withCredentials: true,
    });

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    throw error.props;
  }
}

export async function getEventById(eventId: string) {
  try {
    await connectDB();

    const event = await Event.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(eventId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "organizerId",
          foreignField: "_id",
          as: "organizer",
        },
      },
      {
        $addFields: {
          organizer: {
            $first: "$organizer",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(event[0]));
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).limit(6).skip(0);

    return { data: events, pages: events.length / limit };
  } catch (error: any) {
    throw Error(error.message);
  }
}
