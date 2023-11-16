import { useMutation } from "@tanstack/react-query";
import { deleteCurrentUser as deleteCurrentUserApi } from "./userHooksApi";
import toast from "react-hot-toast";

export function useDeleteCurrentUser() {
  const { isLoading: isDeleting, mutate: deleteCurrentUser } = useMutation({
    mutationFn: deleteCurrentUserApi,
    onSuccess: () => {
      toast.success("Account has been deleted");
    },
  });
  return { isDeleting, deleteCurrentUser };
}
