import { Event } from "@/lib/database/models/event.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  route: { params: { eventId: string } }
) {
  try {
    const eventId = route.params.eventId;

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

    return NextResponse.json({ status: 200, data: event[0] });
  } catch (error: any) {
    return NextResponse.json({ status: 400, error: error.message });
  }
}
