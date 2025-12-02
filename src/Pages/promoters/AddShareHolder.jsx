import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Grid,
    MenuItem,
    Typography,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const promoters = [
    { label: "Select Promoter", value: "" },
    { label: "Promoter 1", value: "promoter1" },
    { label: "Promoter 2", value: "promoter2" },
    { label: "Promoter 3", value: "promoter3" },
];

const AddShareHolder = ({ onBack }) => {
    const [formValues, setFormValues] = useState({
        promoter: "",
        transferDate: "",
        shares: 0,
        startRange: "",
        endRange: "",
        faceValue: 0,
        totalConsideration: 0,
    });

    const handleChange = (field) => (event) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form values:", formValues);
        // Add your submit logic here
    };

    return (
        <Box sx={{ p: 2 }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                    Add Share Holder
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                >
                    Back
                </Button>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Promoter Details"
                            select
                            fullWidth
                            value={formValues.promoter}
                            onChange={handleChange("promoter")}
                            required
                        >
                            {promoters.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Shares"
                            type="number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={formValues.shares}
                            onChange={handleChange("shares")}
                            inputProps={{ min: 0 }}
                        />

                        <TextField
                            label="End Range"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            placeholder="End Start Range"
                            value={formValues.endRange}
                            onChange={handleChange("endRange")}
                        />

                        <TextField
                            label="Total Consideration"
                            type="number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={formValues.totalConsideration}
                            onChange={handleChange("totalConsideration")}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {/* Right Column */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Transfer Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formValues.transferDate}
                            onChange={handleChange("transferDate")}
                        />

                        <TextField
                            label="Start Range"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            placeholder="Enter Start Range"
                            value={formValues.startRange}
                            onChange={handleChange("startRange")}
                        />

                        <TextField
                            label="Face Value"
                            type="number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={formValues.faceValue}
                            onChange={handleChange("faceValue")}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                    >
                        Allocate Shares
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={onBack}>
                        Cancel
                    </Button>
                </Box>
            </form>

        </Box >
    );
};

export default AddShareHolder;
