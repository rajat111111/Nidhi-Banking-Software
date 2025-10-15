// src/components/CustomSnackbar.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, message, severity, onClose, autoHideDuration = 4000 }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={onClose}
                variant="filled"
                severity={severity}
                sx={{ width: "100%", color: "#fff" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
