import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser as createUserApi } from "./userHooksApi";
// import { setCredentials } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

export function useCreateUser() {
  const queryClient = useQueryClient();

  // check to see if 'redirect' has been set in the URL
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userInfo } = useSelector((state) => state.auth);
  // // console.log("userinfo", userInfo);

  // check to see if 'redirect' has been set in the URL
  const { search } = useLocation(); // get search
  const searchParams = new URLSearchParams(search); // pass search to URLSearchParams
  const redirect = searchParams.get("redirect") || "/"; // pass 'redirect' to searchParams or '

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: (data) => {
      console.log(data);

      // send the response from login to setCredentials
      // dispatch(setCredentials({ ...data }));
      queryClient.setQueryData(["user"], data);

      navigate(redirect);
      toast.success("success");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isCreating, createUser };
}
