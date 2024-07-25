"use server";
import { GetAllEventsParams, IEvent, IUpdateEvent } from "@/types";
import axios from "axios";
import mongoose from "mongoose";
import { Event } from "../database/models/event.model";
import { connectDB } from "../database";
import { revalidatePath } from "next/cache";

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
    const events = await Event.aggregate([
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
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 6,
      },
      {
        $skip: 0,
      },
    ]);
    return JSON.parse(
      JSON.stringify({ data: events, pages: events.length / limit })
    );
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function deleteEvent(eventId: string, path: string) {
  try {
    await connectDB();
    const deleteEvent = await Event.findByIdAndDelete(eventId);

    if (!deleteEvent) throw Error("Event does not exists");

    revalidatePath(path);

    return JSON.parse(
      JSON.stringify({
        data: deleteEvent,
        message: "Event Deleted Successfully",
      })
    );
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function updateEvent(event: IUpdateEvent) {
  try {
    await connectDB();
    const updateEvent = await Event.findByIdAndUpdate(event._id, {
      title: event.title,
      description: event.description,
      location: event.location,
      imageUrl: event.imageUrl,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      price: event.price,
      isFree: event.isFree,
      url: event.url,
      categoryId: event.categoryId,
    });

    return JSON.parse(
      JSON.stringify({
        message: "Event Updated Successfully",
        data: updateEvent,
      })
    );
  } catch (error: any) {
    throw Error(error.message);
  }
}
