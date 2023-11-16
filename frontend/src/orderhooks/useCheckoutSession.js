import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCheckoutSession } from "./orderHooksApi";

export function useCheckoutSession() {
  const {
    isLoading: isCreatingSession,
    mutate: createSession,
    error,
  } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      console.log("createdOrder ===", data);
      toast.success("New payment successful");

      if (data.url) {
        window.location.href = data.url;
      }
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
      throw error;
    },
  });
  return { isCreatingSession, createSession, error };
}
