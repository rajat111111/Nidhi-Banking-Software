
import React from "react";
import {
    Box,
    Paper,
    Grid,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const mockData = {
    reference: "Member#1",
    memberNo: "#2365478",
    memberName: "Ramesh Adhakrao",
    accountType: "Saving Account",
    amount: "₹1,25,256",
    transactionDate: "22 June 2024",
    accountNumber: "32658965458",
    approvedTime: "-",
    status: "Pending",
    reviewedBy: "-",
    remark: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    gender: "Male",
    dob: "26 June 1981",
    fatherName: "Keshav Sharma",
    spouseName: "Renu Sharma",
    address: "Flat No. 12B, Shanti Apartments, Andheri East Mumbai, MH – India",
};

const RowItem = ({ label, value }) => (
    <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={4} sm={3} md={2}>
            <Typography variant="body2" fontWeight={600}>
                {label}
            </Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography variant="body2">:</Typography>
        </Grid>
        <Grid item xs={7} sm={8} md={9}>
            <Typography variant="body2">{value}</Typography>
        </Grid>
    </Grid>
);

const ApprovalViewDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const data = mockData; // later replace with fetch by id

    return (
        <Box>
            {/* Breadcrumb-like header */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Home &gt; Members &gt; Approval
            </Typography>

            {/* Page Title */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Approval View Details
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} md={6}>
                        <RowItem label="Reference" value={data.reference} />
                        <RowItem label="Member No." value={data.memberNo} />
                        <RowItem label="Member Name" value={data.memberName} />
                        <RowItem label="Account Type" value={data.accountType} />
                        <RowItem label="Amount" value={data.amount} />
                        <RowItem label="Transaction Date" value={data.transactionDate} />
                        <RowItem label="Account Number" value={data.accountNumber} />
                        <RowItem label="Approved Time" value={data.approvedTime} />
                        <RowItem label="Status" value={data.status} />
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={6}>
                        <RowItem label="Reviewed by" value={data.reviewedBy} />
                        <RowItem label="Remark" value={data.remark} />
                        <RowItem label="Gender" value={data.gender} />
                        <RowItem label="Date of Birth" value={data.dob} />
                        <RowItem label="Father’s Name" value={data.fatherName} />
                        <RowItem label="Spouse/Husband Name" value={data.spouseName} />
                        <RowItem label="Address" value={data.address} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button variant="outlined" color="primary">
                        View
                    </Button>
                    <Button variant="contained" color="success">
                        Approve
                    </Button>
                    <Button variant="contained" color="error">
                        Reject
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ApprovalViewDetails;
