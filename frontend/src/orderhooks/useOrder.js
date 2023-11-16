import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "./orderHooksApi";

export function useOrder(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderById(id),
  });

  return { data, isLoading, error };
}
