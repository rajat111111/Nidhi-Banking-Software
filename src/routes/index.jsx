


// import { createBrowserRouter } from "react-router-dom";
// import MainRoutes from "./MainRoutes";
// import LoginRoutes from "./LoginRoutes";
// import ErrorRoutes from "./ErrorRoutes";
// import { useSelector } from "react-redux";

// const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

// const router = createBrowserRouter(
//     token ? [MainRoutes, ErrorRoutes] : [LoginRoutes],
//     // [LoginRoutes],
//     { basename: "/" }
// );

// export default router;


import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import ErrorRoutes from "./ErrorRoutes";

const router = createBrowserRouter(
    [
        MainRoutes,
        LoginRoutes,
        ErrorRoutes,
    ],
    { basename: "/" }
);

export default router;
