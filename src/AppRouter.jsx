import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import ErrorRoutes from "./routes/ErrorRoutes";

export default function AppRouter() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const router = createBrowserRouter(
    token ? [MainRoutes, ErrorRoutes] : [LoginRoutes],
    { basename: "/" }
  );

  return <RouterProvider router={router} />;
}
