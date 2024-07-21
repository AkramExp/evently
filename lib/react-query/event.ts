import { useMutation } from "@tanstack/react-query";
import { createEvent as createEventApi } from "../services/event";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
