
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../userHooks/useUser";
import Spinner from "../ui/Spinner";

const AdminRoute = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin } = useUser();

  console.log("isAdmin = ", isAdmin);
  useEffect(
    function () {
      if (!isLoading && !isAdmin) navigate("/login");
    },
    [isAdmin, isLoading, navigate]
  );

  if (isLoading) return <Spinner />;

  if (user) console.log("Current user = ", user);
  console.log();

  if (!isLoading && isAdmin) return <Outlet />;
};

export default AdminRoute;
