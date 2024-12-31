import SignIn from "@/pages/auth/SignIn/SignIn";
import SignUp from "@/pages/auth/Signup/SignUp";
import Unauthorized from "@/pages/auth/Unauthorized/Unauthorized";
import { RouteObject } from "react-router-dom";

const authRouter: RouteObject = {
  path: "auth",
  children: [
    {
      path: "signIn",
      element: <SignIn />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "unauthorized",
      element: <Unauthorized />,
    },
  ],
};

export default authRouter;
