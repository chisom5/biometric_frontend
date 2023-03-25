import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const authUser = JSON.parse(
    sessionStorage.getItem("IWSSR_3_Token") || "{}"
  );

  return authUser !== null && authUser?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
