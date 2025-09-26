
import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Stack,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUserMutation, useSendOtpMutation } from "../../features/api/authApi";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    const [useOtp, setUseOtp] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

    const onSubmit = async (data) => {
        console.log("hi")
        try {
            console.log("hiiii")
            if (useOtp) {
                // 🔹 Send OTP flow

                const response = await sendOtp({ email: data.email }).unwrap();
                if (response?.success === true) {
                    localStorage.setItem("otp_email", data.email); // save email for OTP verify step
                    setSnackbar({ open: true, message: response?.message || "OTP sent successfully!", severity: "success" });
                    setTimeout(() => navigate("/otp-verification"), 1000);
                } else {
                    setSnackbar({ open: true, message: response?.message || "Failed to send OTP", severity: "error" });
                }
            } else {
                // 🔹 Normal login flow
                const response = await loginUser(data).unwrap();
                if (response?.success === true) {
                    localStorage.setItem("token", response.token.access_token);
                    setSnackbar({ open: true, message: response?.message || "Login successful", severity: "success" });
                    setTimeout(() => navigate("/"), 800);
                } else {
                    setSnackbar({ open: true, message: response?.message || "Login failed", severity: "error" });
                }
            }
        } catch (err) {
            console.error("Login Error:", err);
            setSnackbar({ open: true, message: err?.data?.message || "Something went wrong", severity: "error" });
        }
    };

    return (
        <Box>
            <Grid
                container
                sx={{ height: "100vh", py: 2, px: 4 }}
                alignItems="center"
                justifyContent="center"
                spacing={2}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Left side: Login form */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: "#FCFBFF", px: 4, py: 6 }}>
                    <Box sx={{ maxWidth: 400, mx: "auto" }}>
                        <Typography variant="h5" fontWeight={500} gutterBottom>
                            Login
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#ADADBD" }} gutterBottom>
                            Enter your credentials to access your account.
                        </Typography>

                        {/* Email */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="email">Email *</InputLabel>
                            <OutlinedInput
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                fullWidth
                            />
                            {errors.email && (
                                <Typography color="error" variant="caption">
                                    {errors.email.message}
                                </Typography>
                            )}
                        </Stack>

                        {/* Password (only show if NOT OTP login) */}
                        {!useOtp && (
                            <Stack spacing={1} mt={2}>
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", { required: !useOtp && "Password is required" })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end" aria-label="toggle password visibility" sx={{ color: "#ADADBD" }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    fullWidth
                                />
                                {errors.password && (
                                    <Typography color="error" variant="caption">
                                        {errors.password.message}
                                    </Typography>
                                )}
                            </Stack>
                        )}

                        {/* Checkbox for OTP Login */}
                        <FormControlLabel
                            control={<Checkbox checked={useOtp} onChange={(e) => setUseOtp(e.target.checked)} />}
                            label="Login with OTP"
                            sx={{ mt: 2 }}
                        />

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading || otpLoading}
                            sx={{ mt: 3, backgroundColor: "#7858C6" }}
                        >
                            {isLoading || otpLoading ? "Processing..." : useOtp ? "Send OTP" : "Login"}
                        </Button>

                        {error && !useOtp && (
                            <Typography color="error" variant="caption">
                                {error.data?.message || "Login failed"}
                            </Typography>
                        )}

                        <Box mt={1} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2">
                                Don’t have an account? <Link to="/register">Register</Link>
                            </Typography>
                            <Link to="/forgot-password">
                                <Typography sx={{ color: "#0066FF" }}>forgot Password?</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Right side: Image */}
                <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
                    <Box component="img" src="./assets/images/authentication/login.svg" alt="Login Illustration" sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }} />
                </Grid>

                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: "100%", color: "#fff" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Grid>
        </Box>
    );
}

