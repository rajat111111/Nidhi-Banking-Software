// import React from "react";
// import {
//     Box,
//     Grid,
//     Typography,
//     TextField,
//     Button,
//     MenuItem,
//     Alert,
// } from "@mui/material";

// const ManualShareAllocation = () => {
//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//                 Manual Share Allocation
//             </Typography>

//             <Alert severity="warning" sx={{ mb: 2 }}>
//                 ALERT! It is a direct allocation scenario. It will not go to admin approval.
//             </Alert>

//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth select label="Member">
//                         <MenuItem value="member1">Member 1</MenuItem>
//                         <MenuItem value="member2">Member 2</MenuItem>
//                     </TextField>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth select label="Business Type">
//                         <MenuItem value="saving">Saving</MenuItem>
//                         <MenuItem value="current">Current</MenuItem>
//                     </TextField>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth type="date" label="Transfer Date" InputLabelProps={{ shrink: true }} />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Shares" placeholder="Enter Shares to Transfer" />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Start Range" />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="End Range" />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Face Value" value="20" />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Total Consideration" />
//                 </Grid>
//             </Grid>

//             <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//                 <Button variant="contained" color="secondary">
//                     Allocate Share
//                 </Button>
//                 <Button variant="outlined">Cancel</Button>
//             </Box>
//         </Box>
//     );
// };

// export default ManualShareAllocation;
// src/Pages/members/shareTabs/ManualShareAllocation.jsx
import React, { useMemo } from "react";
import * as Yup from "yup";
import DynamicForm from "../../components/DynamicForm";
import { useGetApprovedMembersQuery, useManualShareAllocationMutation } from "../../features/api/membersApi";

const validationSchema = Yup.object().shape({
    memberId: Yup.number().required("Member is required"),
    businessType: Yup.string().required("Business type is required"),
    transferDate: Yup.date().required("Transfer date is required"),
    startRange: Yup.number().required("Start range is required").min(0),
    endRange: Yup.number()
        .required("End range is required")
        .min(Yup.ref("startRange"), "End range must be >= Start range"),
    shares: Yup.number().required("Shares are required").min(1),
    faceValue: Yup.number().required("Face value is required").min(0),
    totalConsideration: Yup.number().required("Total consideration is required").min(0),
});

const ManualShareAllocation = () => {
    const { data: approvedResp } = useGetApprovedMembersQuery();
    const approvedMembers = approvedResp?.data || [];
    const [manualShareAllocation, { isLoading }] = useManualShareAllocationMutation();

    const memberOptions = useMemo(
        () =>
            approvedMembers.map((m) => ({
                label: `${(m.title ? m.title + " " : "") + (m.firstName || "")} ${(m.lastName || "")} (${m.applicationNumber || m.id})`.trim(),
                value: m.id,
            })),
        [approvedMembers]
    );

    const initialValues = {
        memberId: "",
        businessType: "Saving",
        transferDate: "",
        startRange: "",
        endRange: "",
        shares: "",
        faceValue: 20,
        totalConsideration: "",
        // optional: you could support shareAllotmentCharges array if needed later
    };

    // compute derived fields (shares and totalConsideration) when ranges/faceValue change
    const computeDerived = (e, handleChange, values, setFieldValue) => {
        const { name, value } = e.target;
        handleChange(e);

        const next = { ...values, [name]: value };
        const s = Number(next.startRange);
        const eR = Number(next.endRange);
        const face = Number(next.faceValue) || 0;

        if (!Number.isNaN(s) && !Number.isNaN(eR) && eR >= s) {
            const count = eR - s + 1;
            setFieldValue("shares", count);
            setFieldValue("totalConsideration", (count * face).toFixed(2));
        } else {
            setFieldValue("shares", "");
            setFieldValue("totalConsideration", "");
        }
    };

    const formList = [
        {
            label: "Member",
            name: "memberId",
            type: "select",
            options: memberOptions,
        },
        {
            label: "Business Type",
            name: "businessType",
            type: "select",
            options: [
                { label: "Saving", value: "Saving" },
                { label: "General", value: "general" },
                { label: "Other", value: "other" },
            ],
        },
        {
            label: "Transfer Date",
            name: "transferDate",
            type: "date",
        },
        {
            label: "Shares",
            name: "shares",
            type: "number",
            readOnly: true,
        },
        {
            label: "Start Range",
            name: "startRange",
            type: "number",
            onChange: computeDerived,
        },
        {
            label: "End Range",
            name: "endRange",
            type: "number",
            onChange: computeDerived,
        },
        {
            label: "Face Value",
            name: "faceValue",
            type: "number",
            onChange: computeDerived,
        },
        {
            label: "Total Consideration",
            name: "totalConsideration",
            type: "number",
            readOnly: true,
        },
    ];

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            memberId: Number(values.memberId),
            businessType: values.businessType,
            transferDate: new Date(values.transferDate).toISOString().split("T")[0],
            startRange: Number(values.startRange),
            endRange: Number(values.endRange),
            shares: Number(values.shares),
            faceValue: Number(values.faceValue),
        };

        try {
            await manualShareAllocation(payload).unwrap();
            resetForm();
            // show notification in app if available
        } catch (err) {
            // optional error handling (toast/snackbar) in your app
        }
    };

    return (
        <DynamicForm
            headerTitle="Manual Share Allocation"
            formList={formList}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
            actionButtonText="Allocate Share"
            isLoading={isLoading}
        />
    );
};

export default ManualShareAllocation;
