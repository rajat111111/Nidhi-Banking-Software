import React, { useState } from "react";
import { Box, Grid, Typography, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyForgotOtpMutation } from "../../features/api/authApi";

export default function ForgotPasswordOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("forgotEmail") || ""); 
    const [verifyOtp, { isLoading }] = useVerifyForgotOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async () => {
        if (otp.length < 6) {
            setSnackbar({ open: true, message: "Please enter a valid 6-digit OTP", severity: "warning" });
            return;
        }

        try {
            const response = await verifyOtp({ email, otp }).unwrap();

            if (response.success === true) {

                setSnackbar({ open: true, message: response.message || "OTP verified successfully!", severity: "success" });
                setTimeout(() => navigate("/reset-password"), 1500);
            }
            else {
                setSnackbar({ open: true, message: response.message || "OTP verified successfully!", severity: "error" });

            }

        } catch (err) {
            setSnackbar({ open: true, message: err?.data?.message || "Invalid OTP. Please try again.", severity: "error" });
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await resendOtp({ email }).unwrap();
            setSnackbar({ open: true, message: response.message || "OTP resent successfully!", severity: "success" });
        } catch (err) {
            setSnackbar({ open: true, message: err?.data?.message || "Failed to resend OTP", severity: "error" });
        }
    };

    return (
        <Grid container sx={{ height: "100vh", p: 2 }} alignItems="center" justifyContent="center" spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "#f8f8ff", p: 4, height: "80vh" }}
                display="flex" justifyContent="center" alignItems="center">
                <Box sx={{ minWidth: 400, }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>Forgot Password?</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        We have sent a verification code to your email
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="******"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{ mt: 3 }}
                        inputProps={{ maxLength: 6, style: { textAlign: "center", fontSize: "20px", letterSpacing: "5px" } }}
                    />

                    <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            Didn’t receive the code?{" "}
                            <Button
                                onClick={handleResendOtp}
                                disabled={isResending}
                                sx={{ color: "#6a42f5", textTransform: "none" }}
                            >
                                {isResending ? "Resending..." : "Resend OTP"}
                            </Button>
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#6a42f5" }}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Next"}
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

            <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                <Box component="img" src="./assets/images/authentication/forgotpassword-otp.svg"
                    alt="OTP Verification Illustration" sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }} />
            </Grid>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}