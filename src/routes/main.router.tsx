import Layout from "@/components/app/Layout/Layout";
import OnlyAdmins from "@/pages/auth/OnlyAdmins/OnlyAdmins";
import ProtectedRoute from "@/pages/auth/ProtectedRoute/ProtectedRoute";
import Client from "@/pages/Client/Client";
import ProfileClient from "@/pages/Client/ProfileClient";
import Order from "@/pages/Order/Order";
import Product from "@/pages/Product/Product";
import ProductCategory from "@/pages/ProductCategory/ProductCategory";
import Store from "@/pages/Store/Store";
import User from "@/pages/User/User";
import { RouteObject } from "react-router-dom";

const mainRouter: RouteObject = {
  element: <Layout />,
  children: [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "admin",
          element: <OnlyAdmins />,
          children: [
            {
              path: "product-category",
              element: <ProductCategory />,
            },
            {
              path: "product",
              element: <Product />,
            },
            {
              path: "users",
              element: <User />,
            },
            {
              path: "clients",
              element: <Client />,
            },
          ],
        },
        {
          path: "",
          element: <Store />,
        },
        {
          path: "client",
          element: <ProfileClient />,
        },
        {
          path: "orders",
          element: <Order />,
        },
      ],
    },
  ],
};

export default mainRouter;
