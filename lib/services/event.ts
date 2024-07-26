"use server";
import { GetAllEventsParams, IEvent, IUpdateEvent } from "@/types";
import mongoose from "mongoose";
import { Event } from "../database/models/event.model";
import { connectDB } from "../database";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function createEvent(event: IEvent) {
  try {
    await connectDB();

    const token = cookies().get("token")?.value || "";

    if (!token) throw Error("Unauthorized Request");

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const data = { ...event, organizerId: decodedToken._id };

    const newEvent = await Event.create(data);

    revalidatePath("/");

    return JSON.parse(
      JSON.stringify({
        message: "Event Created Successfully",
        data: newEvent,
      })
    );
  } catch (error: any) {
    throw Error(error.message);
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

    revalidatePath(`/events/${event._id}/update`);

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

export async function getRelatedEventsByCategory(
  categoryId: string,
  eventId: string,
  limit: number = 3,
  page: number
) {
  try {
    await connectDB();

    const events = await Event.aggregate([
      {
        $match: {
          categoryId: new mongoose.Types.ObjectId(categoryId),
          _id: {
            $ne: new mongoose.Types.ObjectId(eventId),
          },
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
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: 0,
      },
    ]);

    return JSON.parse(JSON.stringify({ data: events }));
  } catch (error: any) {
    throw Error(error.message);
  }
}
