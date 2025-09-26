// import React, { useState } from "react";
// import {
//     Box,
//     Grid,
//     TextField,
//     Typography,
//     Button,
//     InputAdornment,
//     IconButton,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function ResetPassword() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword(!showPassword);
//     const handleClickShowConfirmPassword = () =>
//         setShowConfirmPassword(!showConfirmPassword);

//     return (
//         <Box>
//             <Grid container sx={{ height: "100vh", p: 4 }}>
//                 {/* Left Side - Reset Password Form */}
//                 <Grid
//                     size={{ xs: 12, md: 6 }}
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     sx={{ backgroundColor: "#f8f8ff", p: 4 }}
//                 >
//                     <Box width="100%" maxWidth={400}>
//                         <Typography variant="h5" fontWeight={700} gutterBottom>
//                             Create New Password
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                             Enter New Password
//                         </Typography>

//                         {/* New Password */}
//                         <TextField
//                             fullWidth
//                             label="New Password"
//                             placeholder="Enter new password"
//                             type={showPassword ? "text" : "password"}
//                             margin="normal"
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={handleClickShowPassword}
//                                             edge="end"
//                                             aria-label="toggle password visibility"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         {/* Confirm Password */}
//                         <TextField
//                             fullWidth
//                             label="Confirm New Password"
//                             placeholder="Re-enter new password"
//                             type={showConfirmPassword ? "text" : "password"}
//                             margin="normal"
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={handleClickShowConfirmPassword}
//                                             edge="end"
//                                             aria-label="toggle confirm password visibility"
//                                         >
//                                             {showConfirmPassword ? (
//                                                 <VisibilityOff />
//                                             ) : (
//                                                 <Visibility />
//                                             )}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         {/* Submit Button */}
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{ mt: 3, backgroundColor: "#6a42f5" }}
//                         >
//                             Create New Password
//                         </Button>

//                         {/* Back to Login */}
//                         <Box mt={2} textAlign="center">
//                             <Link to="/login" style={{ textDecoration: "none" }}>
//                                 ← Return to the Login Page
//                             </Link>
//                         </Box>
//                     </Box>
//                 </Grid>

//                 {/* Right Side - Illustration */}
//                 <Grid
//                     size={{ xs: 12, md: 6 }}
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     sx={{ backgroundColor: "white", p: 4 }}
//                 >
//                     <Box
//                         component="img"
//                         src="./assets/images/authentication/resetpassword.svg"
//                         alt="Reset Password Illustration"
//                         sx={{
//                             maxWidth: "100%",
//                             height: "auto",
//                             userSelect: "none",
//                         }}
//                     />
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useResetPasswordMutation } from "../../features/api/authApi";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            setSnackbar({ open: true, message: "Please fill in all fields", severity: "warning" });
            return;
        }

        if (password !== confirmPassword) {
            setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
            return;
        }

        try {
            const response = await resetPassword({ password, confirmPassword }).unwrap();
            setSnackbar({ open: true, message: response.message || "Password reset successfully!", severity: "success" });

            // Navigate to login after success
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setSnackbar({ open: true, message: err?.data?.message || "Something went wrong", severity: "error" });
        }
    };

    return (
        <Box>
            <Grid container sx={{ height: "100vh", p: 4 }}>
                {/* Left Side - Reset Password Form */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ backgroundColor: "#f8f8ff", p: 4 }}
                >
                    <Box width="100%" maxWidth={400}>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Create New Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Enter New Password
                        </Typography>

                        {/* New Password */}
                        <TextField
                            fullWidth
                            label="New Password"
                            placeholder="Enter new password"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Confirm Password */}
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            placeholder="Re-enter new password"
                            type={showConfirmPassword ? "text" : "password"}
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Submit Button */}
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, backgroundColor: "#6a42f5" }}
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Create New Password"}
                        </Button>

                        {/* Back to Login */}
                        <Box mt={2} textAlign="center">
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                ← Return to the Login Page
                            </Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Side - Illustration */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ backgroundColor: "white", p: 4 }}
                >
                    <Box
                        component="img"
                        src="./assets/images/authentication/resetpassword.svg"
                        alt="Reset Password Illustration"
                        sx={{ maxWidth: "100%", height: "auto", userSelect: "none" }}
                    />
                </Grid>
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
        </Box>
    );
}
