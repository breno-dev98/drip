import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PublicRoutes = () => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
