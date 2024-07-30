import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserIdFromCookies = () => {
  try {
    const token = cookies().get("token")?.value || "";

    if (!token) throw new Error("Unauthorized Request");

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return decodedToken?._id || null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
