import React, { useState } from "react";
import { Box } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";


const sample = [
    { id: 1, closeId: "CLOSE001", memberId: "M0001", branchId: "SBI00032", ddAccountNo: "2314562563", interestRate: "7.5%", tenure: 240, startDate: "01-Oct-2025", maturityDate: "01-Oct-2026", releaseAmount: "₹1,20,000", approvedDate: "31 Mar 2024", approvedBy: "Deepankar", status: "Approved" },
    { id: 2, closeId: "CLOSE002", memberId: "M0002", branchId: "SBI00033", ddAccountNo: "2314562564", interestRate: "7.0%", tenure: 365, startDate: "01-Oct-2024", maturityDate: "01-Oct-2025", releaseAmount: "₹80,000", approvedDate: "-", approvedBy: "-", status: "Pending" },
];

const ClosureApprovalDD = () => {

    const [rows, setRows] = useState(sample);

    const columns = [
        { id: "closeId", label: "Close ID", minWidth: 120 },
        { id: "memberId", label: "Member Id", minWidth: 120 },
        { id: "branchId", label: "Branch Id", minWidth: 120 },
        { id: "ddAccountNo", label: "DD Account No.", minWidth: 140 },
        { id: "interestRate", label: "Interest Rate", minWidth: 100 },
        { id: "tenure", label: "Tenure (Day)", minWidth: 110 },
        { id: "startDate", label: "Start Date", minWidth: 120 },
        { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
        { id: "releaseAmount", label: "Release Amount", minWidth: 120 },
        { id: "approvedDate", label: "Approved Date", minWidth: 120 },
        { id: "approvedBy", label: "Approved By", minWidth: 120 },
        { id: "status", label: "Status", minWidth: 100 },
        { id: "actions", label: "Actions", minWidth: 160, align: "right" },
    ];

    const handleApprove = (row) => {
        setRows((p) => p.map((r) => (r.id === row.id ? { ...r, status: "Approved", approvedDate: new Date().toLocaleDateString(), approvedBy: "You" } : r)));
    };

    const rowsWithActions = rows.map((r) => ({
        ...r,
        actions: (
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <DynamicButton variant="outlined" text="View" onClick={() => alert(`view ${r.closeId}`)} />
                {r.status && r.status.toLowerCase() === "pending" && <DynamicButton text="Approve" onClick={() => handleApprove(r)} />}
            </div>
        ),
    }));

    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader title="Closure Approval" onFilter={() => { }} onDownload={() => { }} />
            <DynamicDataTable columns={columns} rows={rowsWithActions} />
        </Box>
    );

};

export default ClosureApprovalDD;

