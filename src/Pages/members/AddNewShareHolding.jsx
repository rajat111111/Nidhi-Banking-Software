import React, { useMemo } from "react";
import * as Yup from "yup";
import { useAddShareHoldingMutation, useGetMembersQuery } from "../../features/api/membersApi";
import PageTopContent from "../../components/PageTopContent";
import DynamicForm from "../../components/DynamicForm";


const validationSchema = Yup.object().shape({
    memberId: Yup.number().required("Member is required"),
    businessType: Yup.string().required("Business type is required"),
    transferDate: Yup.date().required("Transfer date is required"),
    shares: Yup.number().required("Shares is required").min(1),
    faceValue: Yup.number().required("Face value is required").min(0),
    totalConsideration: Yup.number().required("Total consideration required").min(0),
    transactionDate: Yup.date().nullable(),
    amount: Yup.number().nullable(),
    paymentMode: Yup.string().nullable(),
});

const AddNewShareHolding = () => {
    const { data: membersResp } = useGetMembersQuery();
    const members = membersResp?.data || [];
    const [addShareHolding, { isLoading }] = useAddShareHoldingMutation?.() || [];

    const memberOptions = useMemo(
        () =>
            members.map((m) => ({
                label: `${m.firstName || ""} ${m.lastName || ""}`.trim() + (m.applicationNumber ? ` (${m.applicationNumber})` : ""),
                value: m.id,
            })),
        [members]
    );

    const initialValues = {
        memberId: "",
        businessType: "Saving",
        transferDate: "",
        shares: "",
        faceValue: 20,
        totalConsideration: "",
        transactionDate: "",
        amount: "",
        remarks: "",
        paymentMode: "",
    };

    const computeTotals = (e, handleChange, values, setFieldValue) => {
        handleChange(e);
        const next = { ...values, [e.target.name]: e.target.value };
        const shares = Number(next.shares);
        const face = Number(next.faceValue);
        if (!Number.isNaN(shares) && !Number.isNaN(face) && shares > 0) {
            setFieldValue("totalConsideration", (shares * face).toFixed(2));
        } else {
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
                { label: "Current", value: "Current" },
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
            onChange: computeTotals,
        },
        {
            label: "Face Value",
            name: "faceValue",
            type: "number",
            onChange: computeTotals,
        },
        {
            label: "Total Consideration",
            name: "totalConsideration",
            type: "number",
            readOnly: true,
        },

        // Section header can be represented by a disabled textarea or just a label in UI.
        {
            label: "Share Allotment Charges",
            name: "sectionHeader",
            type: "textarea",
            readOnly: true,
            grid: { xs: 12, sm: 12, md: 12 },
            // show no content (it's used as separator). You can style differently if desired.
        },

        {
            label: "Transaction Date",
            name: "transactionDate",
            type: "date",
        },
        {
            label: "Amount",
            name: "amount",
            type: "number",
        },
        {
            label: "Remarks (If Any)",
            name: "remarks",
            type: "text",
            grid: { xs: 12, sm: 12, md: 6 },
        },
        {
            label: "Payment Mode",
            name: "paymentMode",
            type: "select",
            options: [
                { label: "Cash", value: "Cash" },
                { label: "Cheque", value: "Cheque" },
                { label: "NEFT/RTGS", value: "NEFT/RTGS" },
            ],
        },
    ];

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            memberId: Number(values.memberId),
            businessType: values.businessType,
            transferDate: values.transferDate ? new Date(values.transferDate).toISOString() : null,
            shares: Number(values.shares),
            faceValue: Number(values.faceValue),
            totalConsideration: Number(values.totalConsideration || 0),
            transactionDate: values.transactionDate ? new Date(values.transactionDate).toISOString() : null,
            amount: values.amount ? Number(values.amount) : null,
            remarks: values.remarks || null,
            paymentMode: values.paymentMode || null,
        };

        if (addShareHolding) {
            try {
                await addShareHolding(payload).unwrap();
                resetForm();
            } catch (err) {
                // handle error as needed in your app
            }
        } else {
            // fallback: if mutation hook not provided, just reset
            resetForm();
        }
    };

    return (
        <>
            <PageTopContent title="Add New Share Holding" />
            <DynamicForm
                headerTitle={null}
                formList={formList}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                actionButtonText="Add Share Holding"
                isLoading={isLoading}
            />
        </>
    );
};

export default AddNewShareHolding;
