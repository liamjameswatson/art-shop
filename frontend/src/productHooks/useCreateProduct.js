import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createProduct as createProductApi } from "./useProductsApi";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createProduct } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success("New product created successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}
