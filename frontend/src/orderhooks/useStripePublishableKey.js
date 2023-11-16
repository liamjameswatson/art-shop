import { useQuery } from "@tanstack/react-query";
import { getPublishableStripeKey } from "./orderHooksApi";

export function usePublishableStripeKey() {
  const { isLoading, data, error } = useQuery({
    queryFn: getPublishableStripeKey,
  });

  return { data, isLoading, error };
}
