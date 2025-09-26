import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import router from "./routes"
import { useSelector } from "react-redux";

export default function App() {

  return <RouterProvider router={router} />;
}


