import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { loggedInUser } = useSelector((store) => store.user);

  return loggedInUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
