import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder as createOrderApi } from "./orderHooksApi";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      console.log("createdOrder ===", data);
      toast.success("New order created successfully");
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      return data;
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createOrder };
}
