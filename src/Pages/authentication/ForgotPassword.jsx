

// import React, { useState } from "react";
// import { Box, Grid, Typography, Button, TextField } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useForgotPasswordMutation } from "../../features/auth/authApi"; // adjust path

// export default function ForgotPassword() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

//     const handleSubmit = async () => {
//         if (!email) {
//             alert("Please enter your email address");
//             return;
//         }

//         try {
//             const response = await forgotPassword(email).unwrap();
//             // ✅ If API is successful, navigate to OTP page or show a success message
//             alert(response.message || `Password reset link sent to: ${email}`);
//             navigate("/forgot-password-otp");
//         } catch (err) {
//             // Handle error from API
//             alert(err?.data?.message || "Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <Grid
//             container
//             sx={{ height: "100vh", p: 2 }}
//             alignItems="center"
//             justifyContent="center"
//             spacing={2}
//         >
//             <Grid
//                 size={{ xs: 12, md: 6 }}
//                 sx={{
//                     backgroundColor: "#FCFBFF",
//                     py: 20,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//             >
//                 <Box sx={{ minWidth: "400px" }}>
//                     <Typography variant="h5" fontWeight={700} gutterBottom>
//                         Forgot Password?
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                         Enter your email to reset it.
//                     </Typography>

//                     <TextField
//                         fullWidth
//                         placeholder="Please enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         sx={{ mt: 3 }}
//                     />

//                     <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, backgroundColor: "#6a42f5" }}
//                         onClick={handleSubmit}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Sending..." : "Next"}
//                     </Button>

//                     <Box mt={2}>
//                         <Typography variant="body2" color="text.secondary">
//                             <Link to="/login" style={{ color: "#6a42f5", textDecoration: "none" }}>
//                                 ← Return to the Login Page
//                             </Link>
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Grid>

//             <Grid
//                 size={{ xs: 12, md: 6 }}
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <Box
//                     component="img"
//                     src="./assets/images/authentication/forgotpassword.svg"
//                     alt="Forgot Password Illustration"
//                     sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }}
//                 />
//             </Grid>
//         </Grid>
//     );
// }


import React, { useState } from "react";
import { Box, Grid, Typography, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/api/authApi";


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    // Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async () => {
        if (!email) {
            setSnackbar({ open: true, message: "Please enter your email address", severity: "warning" });
            return;
        }

        try {
            const response = await forgotPassword(email).unwrap();
            if (response.success === true) {
                setSnackbar({
                    open: true,
                    message: response.message || `Password reset link sent to: ${email}`,
                    severity: "success",
                });
                localStorage.setItem("forgotEmail", email);
                setTimeout(() => navigate("/forgot-password-otp"), 1500);
            }
            else {
                setSnackbar({
                    open: true,
                    message: response.message || `Password reset link sent to: ${email}`,
                    severity: "error",
                });
            }


            // navigate after short delay
        } catch (err) {
            setSnackbar({
                open: true,
                message: err?.data?.message || "Something went wrong. Please try again.",
                severity: "error",
            });
        }
    };

    return (
        <Grid
            container
            sx={{ height: "100vh", p: 2 }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
        >
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    backgroundColor: "#FCFBFF",
                    py: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ minWidth: "400px" }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Forgot Password?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Enter your email to reset it.
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Please enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 3 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#6a42f5" }}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Next"}
                    </Button>

                    <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            <Link to="/login" style={{ color: "#6a42f5", textDecoration: "none" }}>
                                ← Return to the Login Page
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            <Grid
                size={{ xs: 12, md: 6 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    component="img"
                    src="./assets/images/authentication/forgotpassword.svg"
                    alt="Forgot Password Illustration"
                    sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }}
                />
            </Grid>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
