import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserProfile as editUserProfileApi } from "./userHooksApi";
import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

export function useEditUser() {
  const queryClient = useQueryClient();
  const { mutate: updateMe, isLoading: isUpdating } = useMutation({
    mutationFn: editUserProfileApi,
    onSuccess: () => {
      toast.success("User Information updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => toast.error(err.message),
  });
  return { updateMe, isUpdating };
}
