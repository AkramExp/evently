import { IEvent } from "@/types";
import axios from "axios";

export async function createEvent(event: IEvent) {
  try {
    const response = await axios.post("/api/event/create", event, {
      withCredentials: true,
    });

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  } catch (error: any) {
    throw error.props;
  }
}
