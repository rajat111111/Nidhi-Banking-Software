

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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularLoader from "../../components/skeleton/CircularLoader";
import { useRegisterUserMutation } from "../../features/api/authApi";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [registerUser, { isLoading, error }] = useRegisterUserMutation(); // ✅ API hook
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };


    const onSubmit = async (data) => {

        console.log('start')
        try {
            console.log('try')
            const response = await registerUser(data).unwrap();
            console.log(response)
            if (response?.success === true) {
                setSnackbar({ open: true, message: response?.message, severity: 'success' });
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            }
            else {
                setSnackbar({ open: true, message: response?.message || 'Error occurred', severity: 'error' });
            }
        }
        catch (error) {
            console.log("catch")
            setSnackbar({ open: true, message: error.message || 'Error occurred', severity: 'error' });
            console.error(error);
        }
        finally {
            console.log('finally')
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
                {/* Left side: Register form */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{ backgroundColor: "#FCFBFF", px: 4, py: 6 }}
                >
                    <Box sx={{ maxWidth: 400, mx: "auto" }}>
                        <Typography variant="h5" fontWeight={500} gutterBottom>
                            Register
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#ADADBD" }} gutterBottom>
                            Enter your details below to create your account and get started.
                        </Typography>

                        {/* Full Name */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="name">Name *</InputLabel>
                            <OutlinedInput
                                id="name" // this is just for accessibility
                                placeholder="Enter your name"
                                startAdornment={<InputAdornment position="start">👤</InputAdornment>}
                                {...register("name", { required: "Name is required" })} // ✅ only "name"
                                fullWidth
                            />
                            {errors.name && (
                                <Typography color="error" variant="caption">
                                    {errors.name.message}
                                </Typography>
                            )}
                        </Stack>


                        {/* Phone */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="phone">Phone *</InputLabel>
                            <OutlinedInput
                                id="phone"
                                placeholder="Enter Phone Number"
                                startAdornment={<InputAdornment position="start">📞</InputAdornment>}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit phone number",
                                    },
                                })}
                                fullWidth
                            />
                            {errors.phone && (
                                <Typography color="error" variant="caption">
                                    {errors.phone.message}
                                </Typography>
                            )}
                        </Stack>

                        {/* Password */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="password">Password *</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="6+ Strong Characters"
                                startAdornment={<InputAdornment position="start">🔒</InputAdornment>}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters required" },
                                })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                            sx={{ color: "#ADADBD" }}
                                        >
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

                        {/* Email */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="email">Email *</InputLabel>
                            <OutlinedInput
                                id="email"
                                placeholder="Enter Email"
                                type="email"
                                startAdornment={<InputAdornment position="start">📧</InputAdornment>}
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

                        {/* Role */}
                        <Stack spacing={1} mt={2}>
                            <InputLabel htmlFor="role">Role *</InputLabel>
                            <OutlinedInput
                                id="role"
                                placeholder="Enter Role"
                                {...register("role",
                                    { required: "Role is required" }
                                )}

                                fullWidth
                            />
                            {errors.role && (
                                <Typography color="error" variant="caption">
                                    {errors.role.message}
                                </Typography>
                            )}
                        </Stack>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading} // ✅ disable when loading
                            sx={{ mt: 3, backgroundColor: "#7858C6" }}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>

                        {error && (
                            <Typography color="error" variant="caption">
                                {error.data?.message || "Registration failed"}
                            </Typography>
                        )}

                        <Box mt={1} textAlign="center">
                            <Typography variant="body2">
                                Already have an account? <Link to="/login">Login</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Right side: Image */}
                <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
                    <Box
                        component="img"
                        src="./assets/images/authentication/register.svg"
                        alt="Register Illustration"
                        sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }}
                    />
                </Grid>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Grid>



        </Box>
    );
}
