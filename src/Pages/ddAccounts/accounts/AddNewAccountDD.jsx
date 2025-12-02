import React, { useMemo } from "react";
import * as Yup from "yup";
import PageTopContent from "../../../components/PageTopContent";
import DynamicForm from "../../../components/DynamicForm";
import { useGetMembersQuery } from "../../../features/api/membersApi";

const validationSchema = Yup.object().shape({
    memberId: Yup.number().required("Member is required"),
    branch: Yup.string().required("Branch is required"),
    agentId: Yup.number().nullable(),
    planName: Yup.string().nullable(),
    amount: Yup.number().required("Amount is required").min(1),
    openDate: Yup.date().nullable(),
    openWithLessThanMinimum: Yup.boolean(),
    deductTDS: Yup.boolean(),
    autoRenew: Yup.boolean(),
    accountOnHold: Yup.boolean(),
    seniorCitizen: Yup.boolean(),
    jointAccount: Yup.boolean(),
    hasNominee: Yup.string().oneOf(["yes", "no"]).required(),
    paymentMode: Yup.string().oneOf(["cash", "cheque", "transaction"]).required("Select payment mode"),
    chequeNumber: Yup.string().when("paymentMode", {
        is: "cheque",
        then: Yup.string().required("Cheque number required"),
        otherwise: Yup.string().nullable(),
    }),
    transactionRef: Yup.string().when("paymentMode", {
        is: "transaction",
        then: Yup.string().required("Transaction reference required"),
        otherwise: Yup.string().nullable(),
    }),
    // nominee validations only when hasNominee === 'yes'
    nomineeName: Yup.string().when("hasNominee", {
        is: "yes",
        then: Yup.string().required("Nominee name required"),
        otherwise: Yup.string().nullable(),
    }),
    nomineeRelation: Yup.string().when("hasNominee", {
        is: "yes",
        then: Yup.string().required("Nominee relation required"),
        otherwise: Yup.string().nullable(),
    }),
    nomineeMobile: Yup.string().when("hasNominee", {
        is: "yes",
        then: Yup.string().required("Nominee mobile required"),
        otherwise: Yup.string().nullable(),
    }),
    // other nominee fields optional
});

const AddNewAccountDD = () => {
    // fetch members to populate selects (you can swap to dedicated endpoints for branches/plans)
    const { data: membersResp = {}, isLoading: membersLoading } = useGetMembersQuery();
    const membersList = membersResp?.data || [];

    const memberOptions = useMemo(
        () =>
            membersList.map((m) => ({
                label: `${m.firstName || ""} ${m.lastName || ""}`.trim() + (m.applicationNumber ? ` (${m.applicationNumber})` : ""),
                value: m.id,
            })),
        [membersList]
    );

    // dummy branch & plan options (replace with real API if available)
    const branchOptions = [
        { label: "Bank of India Main Branch", value: "Bank of India Main Branch" },
        { label: "Noida Branch", value: "Noida Branch" },
    ];

    const planOptions = [
        { label: "Plan A", value: "Plan A" },
        { label: "Plan B", value: "Plan B" },
    ];

    const initialValues = {
        memberId: "",
        branch: "",
        agentId: "",
        planName: "",
        amount: "",
        openWithLessThanMinimum: false,
        openDate: "",
        deductTDS: false,
        autoRenew: false,
        accountOnHold: false,
        seniorCitizen: false,
        jointAccount: false,
        hasNominee: "no", // "yes" or "no"
        nomineeName: "",
        nomineeRelation: "",
        nomineeMobile: "",
        nomineeAadhar: "",
        nomineePan: "",
        nomineeVoterId: "",
        nomineeAddress: "",
        transactionDate: "",
        paymentMode: "cash", // cash | cheque | transaction
        chequeNumber: "",
        chequeBankName: "",
        transactionRef: "",
        transactionBankName: "",
        // note denominations fields:
        note_1: 0,
        note_2: 0,
        note_5: 0,
        note_10: 0,
        note_20: 0,
        note_50: 0,
        note_100: 0,
        note_500: 0,
    };

    // onChange helper: enable/disable dependent fields via setFieldValue handled by DynamicForm
    const onFieldChange = (e, handleChange, values, setFieldValue) => {
        const { name, value, type } = e.target;
        handleChange(e);

        // when paymentMode changes, clear unrelated payment fields
        if (name === "paymentMode") {
            if (value === "cash") {
                setFieldValue("chequeNumber", "");
                setFieldValue("chequeBankName", "");
                setFieldValue("transactionRef", "");
                setFieldValue("transactionBankName", "");
            } else if (value === "cheque") {
                setFieldValue("transactionRef", "");
                setFieldValue("transactionBankName", "");
            } else if (value === "transaction") {
                setFieldValue("chequeNumber", "");
                setFieldValue("chequeBankName", "");
            }
        }

        // when hasNominee toggles to no, clear nominee fields
        if (name === "hasNominee" && value === "no") {
            setFieldValue("nomineeName", "");
            setFieldValue("nomineeRelation", "");
            setFieldValue("nomineeMobile", "");
            setFieldValue("nomineeAadhar", "");
            setFieldValue("nomineePan", "");
            setFieldValue("nomineeVoterId", "");
            setFieldValue("nomineeAddress", "");
        }
    };

    const formList = [
        { label: "Member", name: "memberId", type: "select", options: memberOptions, grid: { xs: 12, sm: 6 } },
        { label: "Branch", name: "branch", type: "select", options: branchOptions, grid: { xs: 12, sm: 6 } },

        { label: "Agent", name: "agentId", type: "select", options: memberOptions, grid: { xs: 12, sm: 6 } },
        { label: "Plan Name", name: "planName", type: "select", options: planOptions, grid: { xs: 12, sm: 6 } },

        { label: "Amount", name: "amount", type: "number", grid: { xs: 12, sm: 6 } },
        { label: "Open Date", name: "openDate", type: "date", grid: { xs: 12, sm: 6 } },

        // toggles represented as select yes/no for DynamicForm compatibility
        {
            label: "Open RD with Less than Minimum Amount",
            name: "openWithLessThanMinimum",
            type: "select",
            options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
            ],
            grid: { xs: 12, sm: 6 },
        },
        {
            label: "Transaction Date",
            name: "transactionDate",
            type: "date",
            grid: { xs: 12, sm: 6 },
        },

        // small toggle-like selects for flags
        {
            label: "Deduct TDS",
            name: "deductTDS",
            type: "select",
            options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
            ],
            grid: { xs: 12, sm: 4 },
        },
        {
            label: "Auto Renew",
            name: "autoRenew",
            type: "select",
            options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
            ],
            grid: { xs: 12, sm: 4 },
        },
        {
            label: "Account on Hold",
            name: "accountOnHold",
            type: "select",
            options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
            ],
            grid: { xs: 12, sm: 4 },
        },

        // payment mode and conditional dependent fields
        {
            label: "Payment Mode",
            name: "paymentMode",
            type: "select",
            options: [
                { label: "Cash", value: "cash" },
                { label: "Cheque", value: "cheque" },
                { label: "Transaction", value: "transaction" },
            ],
            onChange: onFieldChange,
            grid: { xs: 12, sm: 6 },
        },

        {
            label: "Cheque Number",
            name: "chequeNumber",
            type: "text",
            // will be enabled only when values.paymentMode === 'cheque'
            // DynamicForm supports 'disabled' prop, but we control validation; UI will show field anyway.
            grid: { xs: 12, sm: 6 },
        },

        {
            label: "Cheque Bank Name",
            name: "chequeBankName",
            type: "text",
            grid: { xs: 12, sm: 6 },
        },

        {
            label: "Transaction Reference",
            name: "transactionRef",
            type: "text",
            grid: { xs: 12, sm: 6 },
        },

        {
            label: "Transaction Bank Name",
            name: "transactionBankName",
            type: "text",
            grid: { xs: 12, sm: 6 },
        },

        // currency denominations (numbers)
        { label: "One Rupee Notes", name: "note_1", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Two Rupee Notes", name: "note_2", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Five Rupee Notes", name: "note_5", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Ten Rupee Notes", name: "note_10", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Twenty Rupee Notes", name: "note_20", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Fifty Rupee Notes", name: "note_50", type: "number", grid: { xs: 12, sm: 4 } },
        { label: "Hundred Rupee Notes", name: "note_100", type: "number", grid: { xs: 12, sm: 6 } },
        { label: "Five Hundred Rupee Notes", name: "note_500", type: "number", grid: { xs: 12, sm: 6 } },

        // nominee toggle
        {
            label: "Add Nominee",
            name: "hasNominee",
            type: "select",
            options: [
                { label: "No", value: "no" },
                { label: "Yes", value: "yes" },
            ],
            onChange: onFieldChange,
            grid: { xs: 12, sm: 6 },
        },

        // nominee fields (will be validated only when hasNominee === 'yes')
        { label: "Nominee Name", name: "nomineeName", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Nominee Relation", name: "nomineeRelation", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Mobile Number", name: "nomineeMobile", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Nominee Aadhar Number", name: "nomineeAadhar", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Nominee PAN Number", name: "nomineePan", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Nominee Voter ID Number", name: "nomineeVoterId", type: "text", grid: { xs: 12, sm: 6 } },
        { label: "Nominee Address", name: "nomineeAddress", type: "textarea", grid: { xs: 12, sm: 12 } },
    ];

    // handleSubmit: send to API or just log. Minimal implementation per your request.
    const handleSubmit = async (values, { resetForm }) => {
        // prepare payload — adapt fields for your backend shape
        const payload = {
            memberId: Number(values.memberId),
            branch: values.branch,
            agentId: values.agentId ? Number(values.agentId) : null,
            planName: values.planName,
            amount: Number(values.amount),
            openDate: values.openDate || null,
            flags: {
                openWithLessThanMinimum: values.openWithLessThanMinimum === "true" || values.openWithLessThanMinimum === true,
                deductTDS: values.deductTDS === "true" || values.deductTDS === true,
                autoRenew: values.autoRenew === "true" || values.autoRenew === true,
                accountOnHold: values.accountOnHold === "true" || values.accountOnHold === true,
            },
            payment: {
                mode: values.paymentMode,
                chequeNumber: values.chequeNumber || undefined,
                chequeBankName: values.chequeBankName || undefined,
                transactionRef: values.transactionRef || undefined,
                transactionBankName: values.transactionBankName || undefined,
                transactionDate: values.transactionDate || undefined,
            },
            denominations: {
                1: Number(values.note_1 || 0),
                2: Number(values.note_2 || 0),
                5: Number(values.note_5 || 0),
                10: Number(values.note_10 || 0),
                20: Number(values.note_20 || 0),
                50: Number(values.note_50 || 0),
                100: Number(values.note_100 || 0),
                500: Number(values.note_500 || 0),
            },
            nominee:
                values.hasNominee === "yes"
                    ? {
                        name: values.nomineeName,
                        relation: values.nomineeRelation,
                        mobile: values.nomineeMobile,
                        aadhar: values.nomineeAadhar,
                        pan: values.nomineePan,
                        voterId: values.nomineeVoterId,
                        address: values.nomineeAddress,
                    }
                    : null,
        };

        try {
            // Replace with your POST endpoint; keeping it minimal — you can use RTK mutation instead.
            // await fetch(`${import.meta.env.VITE_API_BASE_URL}/dd-deposits`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   credentials: "include",
            //   body: JSON.stringify(payload),
            // });
            console.log("submit payload", payload);
            resetForm();
        } catch (err) {
            // minimal error handling
            // console.error(err);
        }
    };

    return (
        <>
            <PageTopContent title="New DD Deposit" />
            <DynamicForm
                headerTitle={null}
                formList={formList}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                actionButtonText="Create Account"
                isLoading={membersLoading}
            />
        </>
    );
};

export default AddNewAccountDD;
