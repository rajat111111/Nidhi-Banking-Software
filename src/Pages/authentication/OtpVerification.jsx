import React, { useRef, useState } from "react";
import { Box, Grid, Typography, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/api/authSlice";


export default function OtpVerification() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
    const inputRefs = useRef([]);

    const email = localStorage.getItem("otp_email"); // stored from login step

    // const handleChange = (element, index) => {
    //     if (isNaN(element.value)) return false;
    //     let newOtp = [...otp];
    //     newOtp[index] = element.value;
    //     setOtp(newOtp);
    //     if (element.nextSibling && element.value) {
    //         element.nextSibling.focus();
    //     }
    // };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return; // allow only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move focus to next input if value entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };



    const handleSubmit = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) {
            setSnackbar({ open: true, message: "Please enter a valid 6-digit OTP", severity: "error" });
            return;
        }

        try {
            const response = await verifyOtp({ email, otp: enteredOtp }).unwrap();
            console.log(response)
            // ✅ backend should return { success, token, message }
            if (response?.token) {
                localStorage.setItem("token", response.token.access_token); // or response.token.access_token
                dispatch(setCredentials({ token: response.token.access_token }));
                setSnackbar({ open: true, message: "OTP Verified! Redirecting...", severity: "success" });
                setTimeout(() => navigate("/"), 1000); // redirect to dashboard
            } else {
                setSnackbar({ open: true, message: response?.message || "Invalid OTP", severity: "error" });
            }
        } catch (err) {
            setSnackbar({ open: true, message: err?.data?.message || "Verification failed", severity: "error" });
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await resendOtp({ email }).unwrap();
            if (response?.success === true) {
                setSnackbar({ open: true, message: "OTP resent successfully!", severity: "success" });
            } else {
                setSnackbar({ open: true, message: response?.message || "Failed to resend OTP", severity: "error" });
            }
        } catch (err) {
            setSnackbar({ open: true, message: err?.data?.message || "Something went wrong", severity: "error" });
        }
    };


    return (
        <Grid container sx={{ height: "100vh", p: 2 }} alignItems="center" justifyContent="center" spacing={2}>
            {/* Left side - OTP form */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "#f8f8ff", p: 4, height: "80vh" }} display="flex" justifyContent="center" alignItems="center">
                <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        OTP Verification
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Enter the 6-digit code sent to {email}.
                    </Typography>

                    {/* OTP Inputs */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                inputRef={(el) => (inputRefs.current[index] = el)} // assign ref
                                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "20px" } }}
                                sx={{ width: "45px" }}
                            />
                        ))}

                        {/* {otp.map((data, index) => (
                            <TextField
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "20px" } }}
                                sx={{ width: "45px" }}
                            />
                        ))} */}
                    </Box>


                    {/* Verify Button */}
                    <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#6a42f5" }} onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>

                    {/* Resend OTP */}

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

                </Box>
            </Grid>

            {/* Right side - Illustration */}
            <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                <Box component="img" src="./assets/images/authentication/otpverification.svg" alt="OTP Illustration" sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }} />
            </Grid>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}