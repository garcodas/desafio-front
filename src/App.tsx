import { Provider } from "react-redux";
import "./App.css";
import store from "@/store/store";
import { createHashRouter, RouterProvider } from "react-router-dom";
import appRoutes from "./routes";
import { Toaster } from "@/components/ui/toaster";

const router = createHashRouter(appRoutes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}

export default App;
