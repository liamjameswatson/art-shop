import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "./orderHooksApi";

export function useMyOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["MyOrders"],
    queryFn: getMyOrders,
  });

  return { data, isLoading, error };
}
