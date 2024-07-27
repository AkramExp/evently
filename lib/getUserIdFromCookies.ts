import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserIdFromCookies = async () => {
  try {
    const token = cookies().get("token")?.value || "";

    if (!token) throw Error("Unauthorized Request");

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return decodedToken._id;
  } catch (error: any) {
    // toast(error.message);
    return null;
  }
};
