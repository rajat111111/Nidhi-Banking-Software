import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    Alert,
} from "@mui/material";

const ManualShareAllocation = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Manual Share Allocation
            </Typography>

            <Alert severity="warning" sx={{ mb: 2 }}>
                ALERT! It is a direct allocation scenario. It will not go to admin approval.
            </Alert>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth select label="Member">
                        <MenuItem value="member1">Member 1</MenuItem>
                        <MenuItem value="member2">Member 2</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth select label="Business Type">
                        <MenuItem value="saving">Saving</MenuItem>
                        <MenuItem value="current">Current</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth type="date" label="Transfer Date" InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Shares" placeholder="Enter Shares to Transfer" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Start Range" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="End Range" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Face Value" value="20" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Total Consideration" />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button variant="contained" color="secondary">
                    Allocate Share
                </Button>
                <Button variant="outlined">Cancel</Button>
            </Box>
        </Box>
    );
};

export default ManualShareAllocation;
