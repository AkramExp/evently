import { INewUser } from "@/types";
import axios from "axios";
import Error from "next/error";
import { NextRequest } from "next/server";

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

export async function getCurrentUser() {
  try {
    const response = await axios.get("/api/user/current-user", {
      withCredentials: true,
    });

    if (response.data.error) throw new Error(response.data.error);

    return response.data.data;
  } catch (error: any) {
    throw error.props;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(
      "/api/user/logout",
      {},
      { withCredentials: true }
    );

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    console.log(error.props);
  }
}
