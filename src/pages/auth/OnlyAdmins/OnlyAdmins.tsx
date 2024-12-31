import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdmins = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.RoleId != 1) {
    return <Navigate to="/auth/unauthorized" replace />;
  }
  return <Outlet />;
};

export default OnlyAdmins;
