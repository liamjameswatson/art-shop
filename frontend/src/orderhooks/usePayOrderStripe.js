import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePayOrderWithCard as usePayOrderWithCardApi } from "./orderHooksApi";

export function usePayOrderStripe() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCardPayment } = useMutation({
    mutationFn: usePayOrderWithCardApi,
    onSuccess: (data) => {
      console.log("createdOrder ===", data);
      toast.success("New payment created successfully");
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      return data;
    },
    onError: (err) => toast.error(err.message),
  });
  usePayOrderStripe
  return { isCreating, createCardPayment };
}
