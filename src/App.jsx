import {

  RouterProvider,
} from "react-router-dom";

import router from "./routes"
import './App'


export default function App() {

  return <RouterProvider router={router} />;
}


