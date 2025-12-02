// src/Pages/enquiry/EnquiryDetails.jsx
import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import PageTopContent from "../../components/PageTopContent";
import DynamicForm from "../../components/DynamicForm";
import DynamicDataTable from "../../components/DynamicTable";

const sampleEnquiries = [
    {
        id: 1,
        enquiryId: "ENQ00123",
        customerName: "Rahul Sharma",
        ddAccountNo: "1234567890",
        enquiryType: "Update KYC",
        priority: "High",
        dateCreated: "05-Feb-2025",
        assign: "-",
        status: "Open",
        actions: (
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button style={btnStyle}>Assign</button>
                <button style={btnStyle}>View</button>
                <button style={btnStyle}>Update</button>
                <button style={{ ...btnStyle, background: "transparent", color: "#d32f2f" }}>Close</button>
            </div>
        ),
    },
    {
        id: 2,
        enquiryId: "ENQ00124",
        customerName: "Rahul Sharma",
        ddAccountNo: "1234567890",
        enquiryType: "Update KYC",
        priority: "Medium",
        dateCreated: "04-Feb-2025",
        assign: "-",
        status: "In Progress",
        actions: (
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button style={btnStyle}>Assign</button>
                <button style={btnStyle}>View</button>
                <button style={btnStyle}>Update</button>
                <button style={{ ...btnStyle, background: "transparent", color: "#d32f2f" }}>Close</button>
            </div>
        ),
    },
    // add more sample rows as needed
];

// small inline style for action buttons (replace with your DynamicButton if you want)
const btnStyle = {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #E6E6EF",
    background: "transparent",
    cursor: "pointer",
    fontSize: 13,
    color: "#6B2FA6",
};

const columns = [
    { id: "enquiryId", label: "Enquiry ID", minWidth: 140 },
    { id: "customerName", label: "Customer Name", minWidth: 180 },
    { id: "ddAccountNo", label: "DD Account No.", minWidth: 160 },
    { id: "enquiryType", label: "Enquiry Type", minWidth: 160 },
    { id: "priority", label: "Priority", minWidth: 100 },
    { id: "dateCreated", label: "Date Created", minWidth: 120 },
    { id: "assign", label: "Assign", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 220, align: "right" },
];

const EnquiryDetails = () => {
    const [rows, setRows] = useState(sampleEnquiries);

    // form used for filtering the table
    const formList = [
        {
            label: "Enquiry ID",
            name: "enquiryId",
            placeholder: "Enter Enquiry ID",
            type: "text",
            grid: { xs: 12, sm: 4 },
        },
        {
            label: "Member Name",
            name: "customerName",
            placeholder: "Enter Member Name",
            type: "text",
            grid: { xs: 12, sm: 4 },
        },
        {
            label: "DD Account Number",
            name: "ddAccountNo",
            placeholder: "Enter DD Account Number",
            type: "text",
            grid: { xs: 12, sm: 4 },
        },
    ];

    const initialValues = { enquiryId: "", customerName: "", ddAccountNo: "" };

    const handleSearch = (values) => {
        const qEnq = (values.enquiryId || "").trim().toLowerCase();
        const qName = (values.customerName || "").trim().toLowerCase();
        const qDd = (values.ddAccountNo || "").trim().toLowerCase();

        const filtered = sampleEnquiries.filter((r) => {
            if (qEnq && !String(r.enquiryId).toLowerCase().includes(qEnq)) return false;
            if (qName && !String(r.customerName).toLowerCase().includes(qName)) return false;
            if (qDd && !String(r.ddAccountNo).toLowerCase().includes(qDd)) return false;
            return true;
        });

        setRows(filtered);
    };

    const handleReset = () => setRows(sampleEnquiries);

    // memoize table rows mapping so dynamic table receives plain objects (it already accepts JSX in cells)
    const tableRows = useMemo(() => rows.map((r) => ({ ...r })), [rows]);

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            <PageTopContent title="Enquiry Details" />

            <Box sx={{ mt: 2 }}>
                <DynamicForm
                    headerTitle={null}
                    formList={formList}
                    initialValues={initialValues}
                    handleSubmit={(values) => handleSearch(values)}
                    actionButtonText="Show Details"
                    isLoading={false}
                />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
                    {/* Cancel button resets table and form (you can wire resetForm if you want) */}
                    <button onClick={handleReset} style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #ECEBF3" }}>
                        Cancel
                    </button>
                </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography sx={{ mb: 1 }}>Enquiry Details</Typography>

                <DynamicDataTable columns={columns} rows={tableRows} isLoading={false} />
            </Box>
        </Box>
    );
};

export default EnquiryDetails;
