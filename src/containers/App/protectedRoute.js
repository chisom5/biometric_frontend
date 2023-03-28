import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  return token !== null && token ? <Outlet /> : <Navigate to="/" />;
};
