import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Event } from "@/lib/database/models/event.model";

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      location,
      imageUrl,
      startDateTime,
      endDateTime,
      price,
      isFree,
      url,
      categoryId,
    } = await request.json();

    const token = request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized Request", status: 401 });

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const event = await Event.create({
      title,
      description,
      location,
      imageUrl,
      startDateTime,
      endDateTime,
      price,
      isFree,
      url,
      categoryId,
      organizerId: decodedToken._id,
    });

    return NextResponse.json({
      status: 200,
      event,
      message: "Event Created Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
