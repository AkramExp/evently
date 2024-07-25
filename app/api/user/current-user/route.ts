import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models/user.model";

export async function GET(request: NextRequest) {
  connectDB();
  try {
    const token = request.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized Request", status: 401 });

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const findUser = await User.findById(decodedToken._id).select("-password");

    return NextResponse.json({ data: findUser, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
