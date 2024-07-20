import { useMutation } from "@tanstack/react-query";
import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
} from "../services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useRegisterUser() {
  const router = useRouter();

  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      toast(response.message);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { registerUser, isRegistering };
}

export function useLoginUser() {
  const router = useRouter();

  const { mutate: loginUser, isPending: isLoggingUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      toast(response.message);
      router.push("/");
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { loginUser, isLoggingUser };
}
