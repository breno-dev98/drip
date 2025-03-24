import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/entrar" />;
};

export default PrivateRoutes;
