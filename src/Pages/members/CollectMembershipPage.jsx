
// import React, { useEffect, useState, useMemo } from "react";
// import { Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate, useParams } from "react-router-dom";

// import DynamicForm from "../../components/DynamicForm";
// import { useGetMembersQuery } from "../../features/api/membersApi";
// import PageTopContent from "../../components/PageTopContent";

// const PageWrapper = styled("div")({
//     width: "100%",
//     maxWidth: 1100,
//     margin: "0 auto",
//     padding: "20px 24px",
// });

// const CollectMembershipPage = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { data, isLoading, isError } = useGetMembersQuery();

//     const [member, setMember] = useState(null);
//     const [paymentMode, setPaymentMode] = useState("online"); // default to 'online' to match API values

//     useEffect(() => {
//         if (data?.data) {
//             const found = data.data.find((m) => String(m.id) === String(id));
//             if (found) setMember(found);
//         }
//     }, [data, id]);

//     const computeNetFee = (fee) => {
//         const n = Number(String(fee).replace(/[^0-9.-]+/g, ""));
//         return Number.isFinite(n) ? n : 0;
//     };

//     const initialValues = {
//         membershipFee: "", // note: API expects membershipFee (singular) in your example
//         netFeeToCollect: "0", // API key matches your example
//         remark: "",
//         paymentMode: paymentMode,
//         transferDate: "",
//         transactionNumber: "",
//         transactionMode: "",
//         bankName: "",
//         chequeNumber: "",
//         chequeDate: "",
//     };

//     // Submit handler - posts to your local API
//     const handleCollectSubmit = async (values, { setSubmitting, resetForm }) => {
//         try {
//             const payload = {
//                 membershipFee: Number(values.membershipFee) || 0,
//                 netFeeToCollect: Number(values.netFeeToCollect) || computeNetFee(values.membershipFee),
//                 remark: values.remark,
//                 paymentMode: values.paymentMode, // 'online' or 'cheque'
//                 transferDate: values.transferDate || "", // yyyy-mm-dd from input[type=date]
//                 transactionNumber: values.transactionNumber || "",
//                 transactionMode: values.transactionMode || "",
//                 bankName: values.bankName || "",
//                 chequeNumber: values.chequeNumber || "",
//                 chequeDate: values.chequeDate || "",
//                 userId: member?.userId || member?.id || 1, // adjust as needed
//             };

//             // POST to endpoint: /membership-fees/:memberId  (use member id from route)
//             const url = `http://localhost:9999/membership-fees/${member?.id || id}`;

//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             if (!res.ok) {
//                 const errText = await res.text();
//                 throw new Error(errText || `Request failed with status ${res.status}`);
//             }

//             // success
//             console.log("Membership collection successful:", await res.json());
//             resetForm();
//             setSubmitting(false);
//             navigate(-1); // go back after success
//         } catch (err) {
//             console.error("Failed to submit membership fee:", err);
//             setSubmitting(false);
//             // optionally show notification / snackbar here
//         }
//     };

//     const onMembershipFeesChange = (e, handleChange, values, setFieldValue) => {
//         // keep formik behavior then compute net fee
//         handleChange(e);
//         const net = computeNetFee(e.target.value);
//         setFieldValue("netFeeToCollect", String(net));
//     };

//     // IMPORTANT: set paymentMode state first, then sync Formik value
//     const onPaymentModeChange = (e, handleChange, values, setFieldValue) => {
//         const val = e.target.value;
//         setPaymentMode(val); // 'online' or 'cheque'
//         setFieldValue("paymentMode", val);
//         handleChange(e);
//     };

//     // build form fields (date fields use type: "date" so input[type=date] shows)
//     const baseFields = useMemo(
//         () => [
//             {
//                 label: "Membership Fees",
//                 placeholder: "Enter Membership Fees",
//                 type: "number",
//                 name: "membershipFee",
//             },
//             {
//                 label: "Net Fee to Collect",
//                 placeholder: "",
//                 type: "number",
//                 name: "netFeeToCollect",
//                 readOnly: true,
//             },
//             {
//                 label: "Remark",
//                 placeholder: "Select One",
//                 type: "select",
//                 name: "remark",
//                 options: [
//                     { value: "Second member payment (online)", label: "Second member payment (online)" },
//                     { value: "New", label: "New" },
//                     { value: "Renewal", label: "Renewal" },
//                     { value: "Adjustment", label: "Adjustment" },
//                 ],
//             },
//             {
//                 label: "Payment Mode",
//                 placeholder: "Select",
//                 type: "select",
//                 name: "paymentMode",
//                 options: [
//                     { value: "online", label: "Online Transfer" },
//                     { value: "cheque", label: "Cheque" },
//                 ],
//                 onChange: onPaymentModeChange,
//             },
//         ],
//         []
//     );

//     const onlineFields = useMemo(
//         () => [
//             { label: "Transfer Date", placeholder: "Select Date", type: "date", name: "transferDate" },
//             { label: "Transaction Number", placeholder: "Enter Transaction Number", type: "text", name: "transactionNumber" },
//             { label: "Transaction Mode", placeholder: "Enter Transaction Mode", type: "text", name: "transactionMode" },
//         ],
//         []
//     );

//     const chequeFields = useMemo(
//         () => [
//             { label: "Bank Name", placeholder: "Enter Bank Name", type: "text", name: "bankName" },
//             { label: "Cheque Number", placeholder: "Enter Cheque Number", type: "text", name: "chequeNumber" },
//             { label: "Cheque Date", placeholder: "Select Date", type: "date", name: "chequeDate" },
//         ],
//         []
//     );

//     const formList = useMemo(() => {
//         return paymentMode === "cheque" ? [...baseFields, ...chequeFields] : [...baseFields, ...onlineFields];
//     }, [paymentMode, baseFields, onlineFields, chequeFields]);

//     // attach onChange override for membershipFee so net updates
//     const finalFormList = useMemo(
//         () => formList.map((f) => (f.name === "membershipFee" ? { ...f, onChange: onMembershipFeesChange } : f)),
//         [formList]
//     );

//     if (isLoading) return <p>Loading member data...</p>;
//     if (isError) return <p>Failed to fetch member details.</p>;

//     return (
//         <Box sx={{ width: "100%", pb: 6 }}>
//             <PageWrapper>
//                 <PageTopContent title="Collect Membership Fees" />

//                 <Box sx={{ mt: 2 }}>
//                     <DynamicForm
//                         headerTitle={null}
//                         initialValues={initialValues}
//                         formList={finalFormList}
//                         actionButtonText="Pay Membership Fees"
//                         handleSubmit={handleCollectSubmit}
//                         validationSchema={{}} // add Yup schema if desired
//                     />
//                 </Box>
//             </PageWrapper>
//         </Box>
//     );
// };

// export default CollectMembershipPage;

// src/pages/members/CollectMembershipPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import DynamicForm from "../../components/DynamicForm";
import PageTopContent from "../../components/PageTopContent";
import { useGetMembersQuery, useCreateMembershipFeeMutation } from "../../features/api/membersApi";

const PageWrapper = styled("div")({
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
});

const CollectMembershipPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // member id from route
    const { data: membersData, isLoading: isMembersLoading, isError: isMembersError } = useGetMembersQuery();

    // RTK mutation from same membersApi
    const [createMembershipFee, { isLoading: isSubmitting }] = useCreateMembershipFeeMutation();

    const [member, setMember] = useState(null);
    const [paymentMode, setPaymentMode] = useState("online"); // default to online
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (membersData?.data) {
            const found = membersData.data.find((m) => String(m.id) === String(id));
            if (found) setMember(found);
        }
    }, [membersData, id]);

    // ---------- Validation Schema ----------
    const validationSchema = Yup.object({
        membershipFee: Yup.number().typeError("Enter a valid number").positive("Must be > 0").required("Membership fee is required"),
        netFeeToCollect: Yup.number().typeError("Enter a valid number").required("Net fee to collect is required"),
        remark: Yup.string().nullable(),
        paymentMode: Yup.string().required("Select payment mode"),
        // online fields conditional
        transferDate: Yup.string().when("paymentMode", {
            is: "online",
            then: (s) => s.required("Transfer date is required"),
            otherwise: (s) => s.nullable(),
        }),
        transactionNumber: Yup.string().when("paymentMode", {
            is: "online",
            then: (s) => s.required("Transaction number is required"),
            otherwise: (s) => s.nullable(),
        }),
        transactionMode: Yup.string().when("paymentMode", {
            is: "online",
            then: (s) => s.required("Transaction mode is required"),
            otherwise: (s) => s.nullable(),
        }),
        // cheque fields conditional
        bankName: Yup.string().when("paymentMode", {
            is: "cheque",
            then: (s) => s.required("Bank name is required"),
            otherwise: (s) => s.nullable(),
        }),
        chequeNumber: Yup.string().when("paymentMode", {
            is: "cheque",
            then: (s) => s.required("Cheque number is required"),
            otherwise: (s) => s.nullable(),
        }),
        chequeDate: Yup.string().when("paymentMode", {
            is: "cheque",
            then: (s) => s.required("Cheque date is required"),
            otherwise: (s) => s.nullable(),
        }),
    });

    // ---------- Initial values (match API shape expected) ----------
    const initialValues = {
        membershipFee: "",
        netFeeToCollect: "0",
        remark: "",
        paymentMode: paymentMode,
        transferDate: "",
        transactionNumber: "",
        transactionMode: "",
        bankName: "",
        chequeNumber: "",
        chequeDate: "",
    };

    // ---------- Helpers ----------
    const computeNetFee = (fee) => {
        const n = Number(String(fee).replace(/[^0-9.-]+/g, ""));
        return Number.isFinite(n) ? n : 0;
    };

    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    // ---------- Form field handlers ----------
    const onMembershipFeesChange = (e, formikHandleChange, formikValues, setFieldValue) => {
        formikHandleChange(e);
        const net = computeNetFee(e.target.value);
        setFieldValue("netFeeToCollect", String(net));
    };

    // set paymentMode state first (so useMemo recomputes), then sync Formik value
    const onPaymentModeChange = (e, formikHandleChange, formikValues, setFieldValue) => {
        const val = e.target.value;
        setPaymentMode(val);
        setFieldValue("paymentMode", val);
        formikHandleChange(e);
    };

    // ---------- Build formList with useMemo (same pattern as AddNewAccount) ----------
    const formList = useMemo(() => {
        const baseFields = [
            {
                label: "Membership Fees",
                name: "membershipFee",
                placeholder: "Enter Membership Fees",
                type: "number",
            },
            {
                label: "Net Fee to Collect",
                name: "netFeeToCollect",
                type: "number",
                readOnly: true,
            },
            {
                label: "Remark",
                name: "remark",
                type: "select",
                placeholder: "Select Remark",
                options: [
                    { value: "Second member payment (online)", label: "Second member payment (online)" },
                    { value: "New", label: "New" },
                    { value: "Renewal", label: "Renewal" },
                    { value: "Adjustment", label: "Adjustment" },
                ],
            },
            {
                label: "Payment Mode",
                name: "paymentMode",
                type: "select",
                options: [
                    { label: "Online Transfer", value: "online" },
                    { label: "Cheque", value: "cheque" },
                ],
                onChange: onPaymentModeChange,
            },
        ];

        if (paymentMode === "online") {
            baseFields.push(
                {
                    label: "Transfer Date",
                    name: "transferDate",
                    type: "date",
                },
                {
                    label: "Transaction Number",
                    name: "transactionNumber",
                    type: "text",
                    placeholder: "Enter Transaction Number",
                },
                {
                    label: "Transaction Mode",
                    name: "transactionMode",
                    type: "text",
                    placeholder: "Enter Transaction Mode",
                }
            );
        }

        if (paymentMode === "cheque") {
            baseFields.push(
                {
                    label: "Bank Name",
                    name: "bankName",
                    type: "text",
                    placeholder: "Enter Bank Name",
                },
                {
                    label: "Cheque Number",
                    name: "chequeNumber",
                    type: "text",
                    placeholder: "Enter Cheque Number",
                },
                {
                    label: "Cheque Date",
                    name: "chequeDate",
                    type: "date",
                }
            );
        }

        // attach membership fees change handler
        return baseFields.map((f) => (f.name === "membershipFee" ? { ...f, onChange: onMembershipFeesChange } : f));
    }, [paymentMode]);

    // ---------- Submit handler using RTK mutation from membersApi ----------
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        try {
            const payloadBody = {
                membershipFee: Number(values.membershipFee) || 0,
                netFeeToCollect: Number(values.netFeeToCollect) || computeNetFee(values.membershipFee),
                remark: values.remark,
                paymentMode: values.paymentMode,
                transferDate: values.transferDate || "",
                transactionNumber: values.transactionNumber || "",
                transactionMode: values.transactionMode || "",
                bankName: values.bankName || "",
                chequeNumber: values.chequeNumber || "",
                chequeDate: values.chequeDate || "",
                userId: member?.userId || member?.id || 1,
            };

            // createMembershipFee expects { memberId, ...body } per membersApi
            await createMembershipFee({ memberId: member?.id || id, ...payloadBody }).unwrap();

            // success
            resetForm();
            setPaymentMode(""); // reset local paymentMode as your other page does
            setSnackbar({ open: true, message: "Membership fee recorded successfully.", severity: "success" });
            navigate(-1);
        } catch (err) {
            console.error("createMembershipFee error:", err);
            setSnackbar({
                open: true,
                message: err?.data?.message || err?.message || "Failed to submit membership fee",
                severity: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (isMembersLoading) return <p>Loading member data...</p>;
    if (isMembersError) return <p>Failed to fetch member details.</p>;

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            <PageWrapper>
                <PageTopContent title="Collect Membership Fees" />

                <Box sx={{ mt: 2 }}>
                    <DynamicForm
                        headerTitle={null}
                        formList={formList}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        handleSubmit={handleSubmit}
                        actionButtonText="Pay Membership Fees"
                        isLoading={isSubmitting}
                    />
                </Box>

                <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </PageWrapper>
        </Box>
    );
};

export default CollectMembershipPage;
