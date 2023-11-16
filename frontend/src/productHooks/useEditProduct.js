import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct as editProductApi } from "./useProductsApi";
import toast from "react-hot-toast";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editProduct } = useMutation({
    mutationFn: editProductApi,
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      console.log("success");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editProduct };
}
