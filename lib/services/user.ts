import { INewUser } from "@/types";
import axios from "axios";
import Error from "next/error";

export async function registerUser(user: INewUser) {
  try {
    const response = await axios.post("/api/user/register", user);

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    throw error.props;
  }
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    const response = await axios.post("/api/user/login", user, {
      withCredentials: true,
    });

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    throw error.props;
  }
}
