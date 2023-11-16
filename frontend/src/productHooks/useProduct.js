import { useQuery } from "@tanstack/react-query";
import { getProduct } from "./useProductsApi";

export function useProduct(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(id),
  });

  return { data, isLoading, error };
}
