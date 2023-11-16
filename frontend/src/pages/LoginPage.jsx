import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../ui/LoginForm";
import { useUser } from "../userHooks/useUser";

const LoginPage = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const { search } = useLocation(); // get search
  const searchParams = new URLSearchParams(search); // pass search to URLSearchParams
  const redirect = searchParams.get("redirect") || "/"; // pass 'redirect' to searchParams or '/'

  useEffect(() => {
    if (user) {
      // if there is user info in in state
      navigate(redirect);
    }
  }, [user, redirect, navigate]);

  return (
    <>
      <LoginForm />
    </>
  );
};
export default LoginPage;
