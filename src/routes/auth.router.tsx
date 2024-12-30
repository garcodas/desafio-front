import SignIn from "@/pages/auth/SignIn/SignIn";
import SignUp from "@/pages/auth/Signup/SignUp";
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
  ],
};

export default authRouter;
