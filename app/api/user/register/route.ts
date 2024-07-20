import { User } from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/database";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { name, username, email, password } = reqBody;

    const findUser = await User.findOne({ $or: [{ email }, { username }] });

    if (findUser)
      return NextResponse.json({
        error: "User with this email or username already exists",
        status: 400,
      });

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: 200,
      message: "Registered Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
