// import React from "react";
// import {
//     Grid,
//     TextField,
//     Button,
//     Typography,
//     MenuItem,
//     Box,
//     Paper,
// } from "@mui/material";

// export default function ManualShareTransfer() {
//     return (
//         <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
//             <Typography
//                 variant="h6"
//                 sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
//             >
//                 Manual Share Transfer
//             </Typography>

//             {/* Alert */}
//             <Box
//                 sx={{
//                     p: 2,
//                     borderRadius: 1,
//                     backgroundColor: "#fff3cd",
//                     color: "#856404",
//                     mb: 3,
//                     fontSize: "0.9rem",
//                 }}
//             >
//                 ALERT! You are directly transferring the share range. It will not go to
//                 admin approval.
//             </Box>

//             <Grid container spacing={2}>
//                 {/* Transferor */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField select label="Transferor" fullWidth>
//                         <MenuItem value="1">User 1</MenuItem>
//                         <MenuItem value="2">User 2</MenuItem>
//                     </TextField>
//                 </Grid>

//                 {/* Transfer To */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField select label="Transfer To" fullWidth>
//                         <MenuItem value="1">User A</MenuItem>
//                         <MenuItem value="2">User B</MenuItem>
//                     </TextField>
//                 </Grid>

//                 {/* Transfer Date */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="Transfer Date"
//                         type="date"
//                         fullWidth
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>

//                 {/* First Distinctive Number */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="First Distinctive Number"
//                         placeholder="Enter First Distinctive Number"
//                         fullWidth
//                     />
//                 </Grid>

//                 {/* Last Distinctive Number */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="Last Distinctive Number"
//                         placeholder="Enter Last Distinctive Number"
//                         fullWidth
//                     />
//                 </Grid>

//                 {/* Number of Shares */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="Number of Shares"
//                         placeholder="Enter Number of Shares"
//                         fullWidth
//                     />
//                 </Grid>

//                 {/* Face Value */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="Face Value"
//                         value="20"
//                         disabled
//                         fullWidth
//                     />
//                 </Grid>

//                 {/* Total Value */}
//                 <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                         label="Total Value"
//                         placeholder="Enter Total Value"
//                         fullWidth
//                     />
//                 </Grid>
//             </Grid>

//             {/* Buttons */}
//             <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//                 <Button variant="contained" color="primary">
//                     Transfer
//                 </Button>
//                 <Button variant="outlined" color="secondary">
//                     Cancel
//                 </Button>
//             </Box>
//         </Paper>
//     );
// }


// src/Pages/members/shareTabs/ManualShareTransfer.jsx
import React, { useMemo } from "react";
import { Typography } from "@mui/material";

import * as Yup from "yup";

import DynamicForm from "../../components/DynamicForm";
import { useGetApprovedMembersQuery, useManualShareTransferMutation } from "../../features/api/membersApi";

const validationSchema = Yup.object().shape({
    transferFromId: Yup.number().required("Transferor is required"),
    transferToId: Yup.number().required("Transfer To is required"),
    transferDate: Yup.date().required("Transfer date is required"),
    firstDistinctiveNumber: Yup.number().required("First distinctive number is required"),
    lastDistinctiveNumber: Yup.number()
        .required("Last distinctive number is required")
        .min(Yup.ref("firstDistinctiveNumber"), "Last must be >= first"),
    numberOfShares: Yup.number().required("Number of shares is required").min(1),
    faceValue: Yup.number().required("Face value is required").min(0),
    totalValue: Yup.number().required("Total value is required").min(0),
});

const ManualShareTransfer = () => {
    const { data: approvedResp } = useGetApprovedMembersQuery();
    const approvedMembers = approvedResp?.data || [];
    const [manualShareTransfer, { isLoading }] = useManualShareTransferMutation();

    const memberOptions = useMemo(
        () => approvedMembers.map((m) => ({ label: `${m.firstName || ""} ${m.lastName || ""} (${m.applicationNumber || m.id})`, value: m.id })),
        [approvedMembers]
    );

    const initialValues = {
        transferFromId: "",
        transferToId: "",
        transferDate: "",
        firstDistinctiveNumber: "",
        lastDistinctiveNumber: "",
        numberOfShares: "",
        faceValue: 20, // default face value from screenshot
        totalValue: "",
    };

    // onChange helper passed into DynamicForm fields
    const computeCounts = (e, handleChange, values, setFieldValue) => {
        const { name, value } = e.target;
        handleChange(e);

        // after setting field, compute derived fields
        const next = { ...values, [name]: value };
        const f = Number(next.firstDistinctiveNumber);
        const l = Number(next.lastDistinctiveNumber);
        const face = Number(next.faceValue) || 0;
        if (f && l && !Number.isNaN(f) && !Number.isNaN(l) && l >= f) {
            const count = l - f + 1;
            setFieldValue("numberOfShares", count);
            setFieldValue("totalValue", (count * face).toFixed(2));
        } else {
            setFieldValue("numberOfShares", "");
            setFieldValue("totalValue", "");
        }
    };

    const formList = [
        {
            label: "Transferor",
            name: "transferFromId",
            type: "select",
            options: memberOptions,
            onChange: computeCounts,
        },
        {
            label: "Transfer To",
            name: "transferToId",
            type: "select",
            options: memberOptions,
            onChange: computeCounts,
        },
        {
            label: "Transfer Date",
            name: "transferDate",
            type: "date",
        },
        {
            label: "First distinctive number",
            name: "firstDistinctiveNumber",
            type: "number",
            onChange: computeCounts,
        },
        {
            label: "Last distinctive number",
            name: "lastDistinctiveNumber",
            type: "number",
            onChange: computeCounts,
        },
        {
            label: "Number of Shares",
            name: "numberOfShares",
            type: "number",
            readOnly: true,
        },
        {
            label: "Face Value",
            name: "faceValue",
            type: "number",
            onChange: computeCounts,
        },
        {
            label: "Total Value",
            name: "totalValue",
            type: "number",
            readOnly: true,
        },
    ];

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            transferFromId: Number(values.transferFromId),
            transferToId: Number(values.transferToId),
            transferDate: new Date(values.transferDate).toISOString(),
            firstDistinctiveNumber: Number(values.firstDistinctiveNumber),
            lastDistinctiveNumber: Number(values.lastDistinctiveNumber),
            numberOfShares: Number(values.numberOfShares),
            faceValue: Number(values.faceValue),
            totalValue: Number(values.totalValue),
        };

        try {
            await manualShareTransfer(payload).unwrap();
            // keep concise per instruction: no extra UI code — reset form on success
            resetForm();
            // you can show toast/snackbar in your app where needed
        } catch (err) {
            // intentionally minimal: you can handle error display in your app
            // console.error(err);
        }
    };

    return (
        <DynamicForm
            headerTitle="Manual Share Transfer"
            formList={formList}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
            actionButtonText="Transfer"
            isLoading={isLoading}
        />
    );
};

export default ManualShareTransfer;

