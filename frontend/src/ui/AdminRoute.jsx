import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// if logged in, use outlet,  if not logged in use navigate and replace user history with replace
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo", userInfo);
  console.log("Role", userInfo.role);
  return userInfo && userInfo.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;


