import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  getCurrentUser,
  logoutUser as logoutUserApi,
} from "../services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useRegisterUser() {
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
  const queryClient = useQueryClient();

  const { mutate: loginUser, isPending: isLoggingUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      toast(response.message);
      router.push("/");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }, 100);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { loginUser, isLoggingUser };
}

export function useCurrentUser() {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoadingUser };
}

export function useLogoutUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isPending: isLogingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: (response) => {
      toast(response.message);
      router.push("/sign-in");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }, 100);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { logoutUser, isLogingOut };
}
