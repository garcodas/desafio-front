import { getCookie } from "@/services/cookieService";
import { AUTH_COOKIE_NAME } from "@/utils/constants/auth.constant";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const cookie = getCookie(AUTH_COOKIE_NAME);
  if (cookie === undefined) {
    return <Navigate to="/auth/signin" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
