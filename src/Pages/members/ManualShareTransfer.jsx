import React from "react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    MenuItem,
    Box,
    Paper,
} from "@mui/material";

export default function ManualShareTransfer() {
    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
            >
                Manual Share Transfer
            </Typography>

            {/* Alert */}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "#fff3cd",
                    color: "#856404",
                    mb: 3,
                    fontSize: "0.9rem",
                }}
            >
                ALERT! You are directly transferring the share range. It will not go to
                admin approval.
            </Box>

            <Grid container spacing={2}>
                {/* Transferor */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField select label="Transferor" fullWidth>
                        <MenuItem value="1">User 1</MenuItem>
                        <MenuItem value="2">User 2</MenuItem>
                    </TextField>
                </Grid>

                {/* Transfer To */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField select label="Transfer To" fullWidth>
                        <MenuItem value="1">User A</MenuItem>
                        <MenuItem value="2">User B</MenuItem>
                    </TextField>
                </Grid>

                {/* Transfer Date */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Transfer Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* First Distinctive Number */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="First Distinctive Number"
                        placeholder="Enter First Distinctive Number"
                        fullWidth
                    />
                </Grid>

                {/* Last Distinctive Number */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Last Distinctive Number"
                        placeholder="Enter Last Distinctive Number"
                        fullWidth
                    />
                </Grid>

                {/* Number of Shares */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Number of Shares"
                        placeholder="Enter Number of Shares"
                        fullWidth
                    />
                </Grid>

                {/* Face Value */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Face Value"
                        value="20"
                        disabled
                        fullWidth
                    />
                </Grid>

                {/* Total Value */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Total Value"
                        placeholder="Enter Total Value"
                        fullWidth
                    />
                </Grid>
            </Grid>

            {/* Buttons */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary">
                    Transfer
                </Button>
                <Button variant="outlined" color="secondary">
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
}
