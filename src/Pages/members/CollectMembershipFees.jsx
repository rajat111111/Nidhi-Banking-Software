// import React from "react";
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     MenuItem,
//     Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const paymentModes = [
//     { value: "cheque", label: "Cheque" },
//     { value: "cash", label: "Cash" },
//     { value: "online", label: "Online" },
// ];

// export const CollectMembershipFees = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = React.useState({
//         membershipFees: "",
//         netFeeToCollect: 0,
//         remark: "",
//         paymentMode: "cheque",
//         bankName: "",
//         chequeNumber: "",
//         chequeDate: "",
//     });

//     // Handle form control changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === "membershipFees" ? Number(value) : value,
//         }));

//         // Update net fee to collect dynamically if needed
//         if (name === "membershipFees") {
//             setFormData((prev) => ({
//                 ...prev,
//                 netFeeToCollect: Number(value),
//             }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission here...

//         alert(`Membership fees of ${formData.membershipFees} collected!`);

//         // Navigate back or reset form
//         navigate(-1);
//     };

//     const handleCancel = () => {
//         navigate(-1);
//     };

//     return (
//         <Box mx="auto" p={3}>
//             {/* Breadcrumbs would be here if needed */}

//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 Collect Membership Fees
//             </Typography>

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Membership Fees"
//                             name="membershipFees"
//                             type="number"
//                             value={formData.membershipFees}
//                             onChange={handleChange}
//                             placeholder="Enter Membership Fees"
//                             variant="outlined"
//                             size="small"
//                             inputProps={{ min: 0 }}
//                             required
//                         />
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Net Fee to Collect"
//                             name="netFeeToCollect"
//                             value={formData.netFeeToCollect}
//                             InputProps={{ readOnly: true }}
//                             variant="outlined"
//                             size="small"
//                         />
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Remark"
//                             name="remark"
//                             value={formData.remark}
//                             onChange={handleChange}
//                             placeholder="Select One"
//                             variant="outlined"
//                             size="small"
//                         />
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             select
//                             label="Payment Mode"
//                             name="paymentMode"
//                             value={formData.paymentMode}
//                             onChange={handleChange}
//                             variant="outlined"
//                             size="small"
//                         >
//                             {paymentModes.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Bank Name"
//                             name="bankName"
//                             value={formData.bankName}
//                             onChange={handleChange}
//                             placeholder="Enter Bank Name"
//                             variant="outlined"
//                             size="small"
//                         />
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Cheque Number"
//                             name="chequeNumber"
//                             value={formData.chequeNumber}
//                             onChange={handleChange}
//                             placeholder="Enter Cheque Number"
//                             variant="outlined"
//                             size="small"
//                             inputMode="numeric"
//                         />
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             label="Cheque Date"
//                             name="chequeDate"
//                             type="date"
//                             value={formData.chequeDate}
//                             onChange={handleChange}
//                             InputLabelProps={{ shrink: true }}
//                             variant="outlined"
//                             size="small"
//                         />
//                     </Grid>

//                     {/* Buttons */}
//                     <Grid size={{ xs: 12 }} mt={2} display="flex" gap={2} sx={{ justifyContent: "center" }}>
//                         <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: "#7858C6" }}>
//                             Pay Membership Fees
//                         </Button>
//                         <Button variant="outlined" onClick={handleCancel}>
//                             Cancel
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Box>
//     );
// };


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

const paymentModes = [
    { value: "cheque", label: "Cheque" },
    { value: "cash", label: "Cash" },
    { value: "online", label: "Online Transfer" },
];

export const CollectMembershipFees = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        membershipFees: "",
        netFeeToCollect: 0,
        remark: "",
        paymentMode: "cheque",
        bankName: "",
        chequeNumber: "",
        chequeDate: "",
        transferDate: "",
        transactionNumber: "",
        transferMode: "",
    });

    // Handle form control changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "membershipFees" ? Number(value) : value,
            ...(name === "membershipFees" && { netFeeToCollect: Number(value) }),
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here...
        alert(`Membership fees of ${formData.membershipFees} collected!`);
        // Navigate back or reset form
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box mx="auto" p={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Collect Membership Fees
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Membership Fees"
                            name="membershipFees"
                            type="number"
                            value={formData.membershipFees}
                            onChange={handleChange}
                            placeholder="Enter Membership Fees"
                            variant="outlined"
                            size="small"
                            inputProps={{ min: 0 }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Net Fee to Collect"
                            name="netFeeToCollect"
                            value={formData.netFeeToCollect}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Remark"
                            name="remark"
                            value={formData.remark}
                            onChange={handleChange}
                            placeholder="Select One"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            select
                            label="Payment Mode"
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
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

                    {/* Conditional fields based on payment mode */}
                    {formData.paymentMode === "cheque" && (
                        <>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Bank Name"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    placeholder="Enter Bank Name"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Cheque Number"
                                    name="chequeNumber"
                                    value={formData.chequeNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Cheque Number"
                                    variant="outlined"
                                    size="small"
                                    inputMode="numeric"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Cheque Date"
                                    name="chequeDate"
                                    type="date"
                                    value={formData.chequeDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </>
                    )}

                    {formData.paymentMode === "online" && (
                        <>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Transfer Date"
                                    name="transferDate"
                                    type="date"
                                    value={formData.transferDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Transaction Number"
                                    name="transactionNumber"
                                    value={formData.transactionNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Transaction Number"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Mode"
                                    name="transferMode"
                                    value={formData.transferMode}
                                    onChange={handleChange}
                                    placeholder="Enter Transfer Mode"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </>
                    )}

                    <Grid size={{ xs: 12 }} mt={2} display="flex" gap={2} sx={{ justifyContent: "center" }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: "#7858C6" }}>
                            Pay Membership Fees
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
