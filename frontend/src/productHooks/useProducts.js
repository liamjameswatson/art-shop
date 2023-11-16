import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./useProductsApi";

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading, error };
}
