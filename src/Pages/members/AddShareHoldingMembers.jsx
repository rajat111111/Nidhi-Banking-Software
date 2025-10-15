import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const businessTypes = [
    { value: "saving", label: "Saving" },
    { value: "current", label: "Current" },
    { value: "fixed", label: "Fixed Deposit" },
];

const paymentModes = [
    { value: "cheque", label: "Cheque" },
    { value: "cash", label: "Cash" },
    { value: "online", label: "Online Transfer" },
];

const members = [
    { value: "member1", label: "Taxhint Advisor" },
    { value: "member2", label: "Mr. Kitzo Tech" },
    // Add your members here or fetch from API
];

const AddShareHoldingMembers = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = React.useState({
        member: "",
        businessType: "saving",
        transferDate: "",
        shares: "",
        totalConsideration: "",
        transactionDate: "",
        amount: "",
        remarks: "",
        paymentMode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here, api call etc.
        alert("Share allocated successfully!");
        navigate(-1); // go back on success or as desired
    };

    const handleCancel = () => {
        navigate(-1); // simple back navigation
    };

    return (
        <Box maxWidth={900} mx="auto" p={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Add New Share Holding
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Member"
                            name="member"
                            value={formValues.member}
                            onChange={handleChange}
                            placeholder="Select Member"
                            variant="outlined"
                            size="small"
                            required
                        >
                            {members.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Business Type"
                            name="businessType"
                            value={formValues.businessType}
                            onChange={handleChange}
                            placeholder="Select Business Type"
                            variant="outlined"
                            size="small"
                            required
                        >
                            {businessTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Transfer Date"
                            type="date"
                            name="transferDate"
                            value={formValues.transferDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            placeholder="Select Date"
                            variant="outlined"
                            size="small"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Shares"
                            name="shares"
                            type="number"
                            value={formValues.shares}
                            onChange={handleChange}
                            placeholder="Enter Shares to Transfer"
                            variant="outlined"
                            size="small"
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Face Value"
                            name="faceValue"
                            value="20"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Consideration"
                            name="totalConsideration"
                            value={formValues.totalConsideration}
                            onChange={handleChange}
                            placeholder="Enter Total Consideration"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ bgcolor: "#f3e8ff", pt: 1, px: 2, borderRadius: 1 }}>
                        <Typography fontWeight="bold">Share Allotment Charges</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} />

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Transaction Date"
                            type="date"
                            name="transactionDate"
                            value={formValues.transactionDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            placeholder="Select Date"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formValues.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Remarks (If Any)"
                            name="remarks"
                            multiline
                            minRows={1}
                            value={formValues.remarks}
                            onChange={handleChange}
                            placeholder="Enter Remarks (If Any)"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Payment Mode"
                            name="paymentMode"
                            value={formValues.paymentMode}
                            onChange={handleChange}
                            placeholder="Select Payment Mode"
                            variant="outlined"
                            size="small"
                        >
                            {paymentModes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
                            Allocate Share
                        </Button>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddShareHoldingMembers;
