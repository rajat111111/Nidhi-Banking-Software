import * as React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DynamicDataTable from "../../components/DynamicTable";

const statusColors = {
    Pending: "#000000", // black default
    Approved: "green",
    Rejected: "red",
};

const ApprovalDetails = () => {
    const navigate = useNavigate();

    const columns = [
        { id: "id", label: "#", minWidth: 30 },
        { id: "reference", label: "Reference", minWidth: 100 },
        { id: "memberNo", label: "Member No.", minWidth: 100 },
        { id: "memberName", label: "Member Name", minWidth: 150 },
        { id: "accountType", label: "Account Type", minWidth: 130 },
        { id: "amount", label: "Amount", minWidth: 100 },
        { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
        { id: "accountNumber", label: "Account Number", minWidth: 130 },
        { id: "approvedTime", label: "Approved Time", minWidth: 110 },
        { id: "reviewedBy", label: "Reviewed By", minWidth: 130 },
        { id: "remark", label: "Remark", minWidth: 80 },
        { id: "status", label: "Status", minWidth: 90 },
        { id: "actions", label: "Actions", minWidth: 220, align: "right" },
    ];

    // Example data - extend or load dynamically
    const initialRows = [
        {
            id: 1,
            reference: "Member#1",
            memberNo: "#2365478",
            memberName: "Ramesh Adhakrao",
            accountType: "Saving Account",
            amount: "₹1,25,256",
            transactionDate: "22 June 2024",
            accountNumber: "123654589654",
            approvedTime: "-",
            reviewedBy: "-",
            remark: "-",
            status: "Pending",
        },
        {
            id: 2,
            reference: "Member#1",
            memberNo: "#2365478",
            memberName: "Ramesh Adhakrao",
            accountType: "Saving Account",
            amount: "₹1,25,256",
            transactionDate: "22 June 2024",
            accountNumber: "123654589654",
            approvedTime: "12:10 PM",
            reviewedBy: "Rohit Sharma",
            remark: "-",
            status: "Approved",
        },
        {
            id: 3,
            reference: "Member#1",
            memberNo: "#2365478",
            memberName: "Ramesh Adhakrao",
            accountType: "Saving Account",
            amount: "₹1,25,256",
            transactionDate: "22 June 2024",
            accountNumber: "123654589654",
            approvedTime: "12:10 PM",
            reviewedBy: "Rohit Sharma",
            remark: "-",
            status: "Rejected",
        },
        // additional rows as needed
    ];

    const handleView = (row) => {
        navigate(`/members/approval-details/${row.id}`)

    };


    const handleApprove = (row) => {


    };

    const handleReject = (row) => {
        alert(`Rejected ${row.memberName}'s transaction.`);
        // Handle reject logic
    };

    const [rows, setRows] = React.useState(
        initialRows.map((row) => ({
            ...row,
            statusLabel: (
                <Typography
                    sx={{ color: statusColors[row.status] || "black", fontWeight: 600 }}
                >
                    {row.status}
                </Typography>
            ),
            actions: (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" onClick={() => handleView(row)}>
                        View
                    </Button>
                    {(row.status === "Pending") && (
                        <>
                            <Button size="small" color="primary" onClick={() => handleApprove(row)}>
                                Approve
                            </Button>
                            <Button size="small" color="error" onClick={() => handleReject(row)}>
                                Reject
                            </Button>
                        </>
                    )}
                </Stack>
            ),
        }))
    );


    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader
                title="Approval Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
            />
            <DynamicDataTable columns={columns} rows={rows} />
        </Box>
    );
};

export default ApprovalDetails;
