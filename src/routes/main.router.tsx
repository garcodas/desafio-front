import Layout from "@/components/app/Layout/Layout";
import OnlyAdmins from "@/pages/auth/OnlyAdmins/OnlyAdmins";
import ProtectedRoute from "@/pages/auth/ProtectedRoute/ProtectedRoute";
import ProductCategory from "@/pages/ProductCategory/ProductCategory";
import Store from "@/pages/Store/Store";
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
          ],
        },
        {
          path: "",
          element: <Store />,
        },
      ],
    },
  ],
};

export default mainRouter;
