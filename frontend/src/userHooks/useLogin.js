import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "./userHooksApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

export function useLogin() {
  const queryClient = useQueryClient();

  // check to see if 'redirect' has been set in the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userInfo } = useSelector((state) => state.auth);
  // console.log("userinfo", userInfo);

  // check to see if 'redirect' has been set in the URL
  const { search } = useLocation(); // get search
  const searchParams = new URLSearchParams(search); // pass search to URLSearchParams
  const redirect = searchParams.get("redirect") || "/"; // pass 'redirect' to searchParams or '

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);

      // send the response from login to setCredentials
      dispatch(setCredentials({ ...data }));
      queryClient.setQueryData(["user"], data);

      navigate(redirect);
      toast.success("success");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoggingIn };
}
