"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectDB } from "../database";
import { User } from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectDB();

    const newUser = await User.create(user);

    return newUser;
  } catch (error) {
    handleError(error);
  }
};
