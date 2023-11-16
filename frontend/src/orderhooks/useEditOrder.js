import { useMutation } from "@tanstack/react-query";
import { usePayOrderWithPayPal as usePayOrderPayPalApi } from "./orderHooksApi";
import toast from "react-hot-toast";

export function usePayOrderWithPayPal() {
  const { isLoading, mutate: payOrder } = useMutation({
    mutationFn: usePayOrderPayPalApi,
    onSuccess: () => {
      toast.success("Order has been placed, Thank you");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, payOrder };
}
