import { useQuery } from "@tanstack/react-query";
import { getCurrentUserInfo } from "./userHooksApi";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserInfo,
  });

  return { isLoading, user, error, isAdmin: user?.role === "admin" };
}
