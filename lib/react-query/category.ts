import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory as addCategoryApi,
  getCategories,
} from "../services/category";
import toast from "react-hot-toast";

export function useAddCategory() {
  const queryClient = useQueryClient();

  const { mutate: addCategory, isPending: isAdding } = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { addCategory, isAdding };
}

export function useCategories() {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories, isLoadingCategories };
}
