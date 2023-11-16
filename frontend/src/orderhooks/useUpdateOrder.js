import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOrder } from "./orderHooksApi";
import toast from "react-hot-toast";

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateOrder } = useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      toast.success("Order has been updated");
      queryClient.invalidateQueries(["order"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updateOrder };
}
