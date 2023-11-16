import { useQuery } from "@tanstack/react-query";
import { getPaymentIntent } from "./orderHooksApi";

export function useGetPaymentIntent() {
  const { isLoading, data, error } = useQuery({
    queryFn: getPaymentIntent,
  });

  return { data, isLoading, error };
}
