import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import DynamicButton from "../../../components/DynamicButton";

const sampleRows = [
    { id: 1, receiptId: "ENQ00123", memberName: "Rahul Sharma", ddAccountNo: "1234567890", amount: "₹20,000", receiptDate: "20 Sep 2025", paymentMode: "UPI" },
    { id: 2, receiptId: "ENQ00124", memberName: "Aamna Khan", ddAccountNo: "1234567891", amount: "₹15,000", receiptDate: "19 Sep 2025", paymentMode: "Cheque" },
];

const columns = [
    { id: "receiptId", label: "Receipt ID", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 160 },
    { id: "ddAccountNo", label: "DD Account No.", minWidth: 140 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "receiptDate", label: "Receipt Date", minWidth: 140 },
    { id: "paymentMode", label: "Payment Mode", minWidth: 120 },
];

const ReceiptDD = () => {
    const [rows, setRows] = useState(sampleRows);
    const [filters, setFilters] = useState({ enquiryId: "", memberName: "", ddAccountNo: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        // For demo: filter locally
        const filtered = sampleRows.filter((r) =>
            (!filters.enquiryId || r.receiptId.includes(filters.enquiryId)) &&
            (!filters.memberName || r.memberName.toLowerCase().includes(filters.memberName.toLowerCase())) &&
            (!filters.ddAccountNo || r.ddAccountNo.includes(filters.ddAccountNo))
        );
        setRows(filtered);
    };

    const handleReset = () => {
        setFilters({ enquiryId: "", memberName: "", ddAccountNo: "" });
        setRows(sampleRows);
    };

    const actions = {
        view: (row) => alert(`View receipt ${row.receiptId}`),
        delete: (row) => setRows((p) => p.filter((r) => r.id !== row.id)),
    };

    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader title="Receipt" onFilter={() => { }} onDownload={() => { }} />
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Enquiry ID" value={filters.enquiryId} onChange={(e) => setFilters(s => ({ ...s, enquiryId: e.target.value }))} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Member Name" value={filters.memberName} onChange={(e) => setFilters(s => ({ ...s, memberName: e.target.value }))} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="DD Account Number" value={filters.ddAccountNo} onChange={(e) => setFilters(s => ({ ...s, ddAccountNo: e.target.value }))} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <DynamicButton type="submit" text="Show Details" color="#7858C6" textColor="#fff" />
                        <DynamicButton variant="outlined" text="Cancel" onClick={handleReset} style={{ marginLeft: 12 }} />
                        <DynamicButton text="Create Receipt" color="#7858C6" textColor="#fff" style={{ float: "right" }} />
                    </Grid>
                </Grid>
            </Box>

            <Typography sx={{ mb: 1 }}>Receipt Details</Typography>
            <DynamicDataTable columns={columns} rows={rows} actions={actions} />
        </Box>
    );
};

export default ReceiptDD;
