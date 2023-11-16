import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../userHooks/useUser";
import Spinner from "../ui/Spinner";

// if logged in, use outlet,  if not logged in use navigate and replace user history with replace
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(
    function () {
      if (!isLoading && !user) navigate("/login");
    },
    [user, isLoading, navigate]
  );

  if (isLoading) return <Spinner />;

  // if (user) console.log("Current user = ", user);
  // console.log();

  if (!isLoading && user) return <Outlet />;
};
export default ProtectedRoute;
