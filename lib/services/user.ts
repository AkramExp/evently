"use server";

import { INewUser } from "@/types";
import { connectDB } from "../database";
import { User } from "../database/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserIdFromCookies } from "../getUserIdFromCookies";

export async function registerUser(user: INewUser) {
  try {
    await connectDB();

    const findUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (findUser)
      throw new Error("User with this email or username already exists");

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(user.password, salt);

    const newUser = await User.create({
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    return JSON.parse(
      JSON.stringify({ message: "Registered Successfully", data: newUser })
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    await connectDB();

    const findUser = await User.findOne({ email: user.email });

    if (!findUser) throw new Error("Invalid Credentials");

    const isPasswordValid = await bcryptjs.compare(
      user.password,
      findUser.password!
    );

    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET_KEY!);

    cookies().set("token", token);

    return { message: "Login Successfull" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    await connectDB();
    const userId = await getUserIdFromCookies();

    if (!userId) return null;

    const findUser = await User.findById(userId);

    return JSON.parse(JSON.stringify(findUser));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function logoutUser() {
  try {
    cookies().delete("token");

    return JSON.parse(JSON.stringify({ message: "Logout Successfull" }));
  } catch (error: any) {
    throw error.props;
  }
}
