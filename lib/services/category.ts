import axios from "axios";
import Error from "next/error";

export async function addCategory(name: string) {
  try {
    const response = await axios.post(
      "/api/category/add",
      { name },
      { withCredentials: true }
    );

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    throw error.props;
  }
}

export async function getCategories() {
  try {
    const response = await axios.get("/api/category/all", {
      withCredentials: true,
    });

    if (response.data.error) throw new Error(response.data.error);

    return response.data.data;
  } catch (error: any) {
    throw error.props;
  }
}
