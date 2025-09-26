import * as React from "react";
import { Box, Stack, Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import DynamicDataTable from "../../components/DynamicTable";


const StatusLabel = styled("span")(({ status }) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "12px",
    color: status === "Active" ? "#0D6A84" : "#C90303",
    backgroundColor: status === "Active" ? "#DBE9ED" : "#FFD8D8",
    userSelect: "none",
}));

const columns = [
    { id: "id", label: "#", minWidth: 30 },
    { id: "certificateNo", label: "Certificate No.", minWidth: 120 },
    { id: "folioNo", label: "Folio No.", minWidth: 100 },
    { id: "shareholderName", label: "Shareholder Name", minWidth: 160 },
    { id: "noOfShares", label: "No. of Shares", minWidth: 100, align: "right" },
    { id: "shareValue", label: "Share Value (₹)", minWidth: 130, align: "right" },
    { id: "issueDate", label: "Issue Date", minWidth: 110 },
    { id: "status", label: "Status", minWidth: 90, align: "center" },
    { id: "actions", label: "Actions", minWidth: 160, align: "right" },
];

// Sample data
const rows = [
    {
        id: 1,
        certificateNo: "#2365478",
        folioNo: "3657895",
        shareholderName: "Renuka Sharma",
        noOfShares: 189,
        shareValue: "₹1,25,256",
        issueDate: "25-03-2025",
        status: <StatusLabel status="Active">Active</StatusLabel>,
        actions: (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="outlined" size="small">View</Button>
                <Button variant="outlined" size="small" color="secondary">Download</Button>
            </Stack>
        ),
    },
    {
        id: 7,
        certificateNo: "#2365478",
        folioNo: "3657895",
        shareholderName: "Mahi Gupta",
        noOfShares: 189,
        shareValue: "₹1,25,256",
        issueDate: "12-03-2010",
        status: <StatusLabel status="Cancelled">Cancelled</StatusLabel>,
        actions: (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="outlined" size="small">View</Button>
                <Button variant="outlined" size="small" color="secondary">Download</Button>
            </Stack>
        ),
    },
    // Add more rows as needed...
];

const ShareCertificates = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <DynamicDataTable columns={columns} rows={rows} />
        </Box>
    );
};

export default ShareCertificates;
