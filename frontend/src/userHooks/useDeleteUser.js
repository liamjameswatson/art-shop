import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "./userHooksApi";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKeys: ["allUsers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteUser };
}
