import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// if logged in, use outlet,  if not logged in use navigate and replace user history with replace
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
