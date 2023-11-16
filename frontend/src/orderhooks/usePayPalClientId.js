import { useQuery } from "@tanstack/react-query";
import { getPayPalClientId } from "../orderhooks/orderHooksApi";

export function usePayPalClientId() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["paypalClientId"],
    queryFn: getPayPalClientId,
  });

  return { data, isLoading, error };
}
