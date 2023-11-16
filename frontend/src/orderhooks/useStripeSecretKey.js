import { useQuery } from "@tanstack/react-query";
import { getSecretStripeKey } from "./orderHooksApi";

export function useStripeSecretKey() {
  const { isLoading, data, error } = useQuery({
    queryFn: getSecretStripeKey,
  });
  const clientSecret = data?.clientSecret || null;
  console.log("client secret from hook", typeof clientSecret);
  return { clientSecret, data, isLoading, error };
}
