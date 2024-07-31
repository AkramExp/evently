import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEvent as createEventApi,
  getAllEvents,
  getEventById,
} from "../services/event";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

export function useCreateEvent() {
  const router = useRouter();

  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: createEventApi,
    onSuccess: (response) => {
      toast(response.message);
      router.push("/");
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { createEvent, isCreating };
}

export function useEventById(id: string) {
  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  return { event, isLoadingEvent };
}
