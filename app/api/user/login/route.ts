import { User } from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const findUser = await User.findOne({ email });

    if (!findUser)
      return NextResponse.json({ status: 400, error: "Invalid Credentials" });

    const isPasswordValid = await bcryptjs.compare(
      password,
      findUser.password!
    );

    if (!isPasswordValid)
      return NextResponse.json({ status: 400, error: "Invalid Credentials" });

    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET_KEY!);

    const response = NextResponse.json({
      status: 200,
      message: "Logged In Successfully",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
