import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./userHooksApi";

export function useAllUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  return { data, isLoading, error };
}
