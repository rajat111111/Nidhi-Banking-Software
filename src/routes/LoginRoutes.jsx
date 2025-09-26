import ForgotPassword from "../Pages/authentication/ForgotPassword";
import ForgotPasswordOtp from "../Pages/authentication/ForgotPasswordOtp";
import Login from "../Pages/authentication/Login";
import OtpVerification from "../Pages/authentication/OtpVerification";
import Register from "../Pages/authentication/Register";
import ResetPassword from "../Pages/authentication/ResetPassword";
// import ForgotPassword from "../Pages/authentication/ForgotPassword";
// import ResetPassword from "../Pages/authentication/ResetPassword";

const LoginRoutes = {
    path: "/",
    children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "otp-verification", element: <OtpVerification /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "forgot-password-otp", element: <ForgotPasswordOtp /> },
        { path: "reset-password", element: <ResetPassword /> },
    ],
};

export default LoginRoutes;
