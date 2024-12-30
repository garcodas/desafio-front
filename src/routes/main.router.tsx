import Layout from "@/components/app/Layout/Layout";
import ProtectedRoute from "@/pages/auth/ProtectedRoute/ProtectedRoute";
import ProductCategory from "@/pages/ProductCategory/ProductCategory";
import { RouteObject } from "react-router-dom";

const mainRouter: RouteObject = {
  element: <Layout />,
  children: [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "product-category",
          element: <ProductCategory />,
        },
      ],
    },
  ],
};

export default mainRouter;
