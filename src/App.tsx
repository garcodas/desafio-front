import { Provider } from "react-redux";
import "./App.css";
import store from "@/store/store";
import { createHashRouter, RouterProvider } from "react-router-dom";
import appRoutes from "./routes";

const router = createHashRouter(appRoutes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
