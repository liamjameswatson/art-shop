import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "./orderHooksApi";

export function useAllOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  return { data, isLoading, error };
}
