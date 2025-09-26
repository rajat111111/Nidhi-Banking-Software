import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import DynamicDataTable from "../../components/DynamicTable"; // Your data table component
import PageHeader from "../../components/PageHeader"; // Your header with buttons
import { useNavigate } from "react-router-dom";

const StatusButton = styled(Button)(({ status }) => ({
    borderRadius: 50,
    backgroundColor: status === "enable" ? "#DBE9ED" : "#FFD8D8",
    color: status === "enable" ? "#0D6A84" : "#C90303",
    padding: "2px 20px",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: status === "enable" ? "#0D6A84" : "#C90303",
        color: "#fff",
    },
}));

const ActionButton = styled(Button)(() => ({
    borderRadius: 50,
    borderColor: "#0D6A84",
    color: "#0D6A84",
    padding: "2px 14px",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#0D6A84",
        color: "#fff",
    },
}));

const columns = [
    { id: "id", label: "#", minWidth: 40 },
    { id: "promoterName", label: "Promoters", minWidth: 150 },
    { id: "shareRange", label: "Share Range", minWidth: 150 },
    { id: "totalShares", label: "Total Shares Held", minWidth: 150 },
    { id: "nominalVal", label: "Nominal Val", minWidth: 100 },
    { id: "totalShareVal", label: "Total Share Val", minWidth: 150 },
    { id: "allotmentDate", label: "Allotment Date", minWidth: 130 },
    { id: "transferDate", label: "Transfer Date", minWidth: 130 },
    { id: "folioNo", label: "Folio No", minWidth: 100 },
    { id: "certNo", label: "Cert No", minWidth: 100 },
    { id: "surrendered", label: "Surrendered", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 220, align: "right" },
];

// Main component
const ShareHoldings = () => {
    const navigate = useNavigate();

    // Example rows data matching screenshot
    const rows = [
        {
            id: 1,
            promoterName: "Mr. Meera Singh",
            shareRange: "1 - 20,000",
            totalShares: "20,000",
            nominalVal: "20",
            totalShareVal: "40,000",
            allotmentDate: "26 Nov 2024",
            transferDate: "16 Aug 2025",
            folioNo: "235641",
            certNo: "235641",
            surrendered: "No",
            actions: (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <ActionButton variant="outlined" startIcon={<Visibility />} onClick={() => navigate(`/promoters/share-holder/${1}`)}>View</ActionButton>
                    <ActionButton variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/promoters/edit/${1}`)}>Edit</ActionButton>
                    <ActionButton variant="outlined" color="error" startIcon={<Delete />} onClick={() => alert("Delete clicked")} >Delete</ActionButton>
                </Stack>
            ),
        },
        // Repeat or generate additional row data similarly
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <PageHeader
                title="Promoters Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
                primaryButton={{
                    label: "+ Add Share Holding",
                    onClick: () => navigate("/promoters/add-share-holder"),
                }}
            />
            <DynamicDataTable columns={columns} rows={rows} />
        </Box>
    );
};

export default ShareHoldings;
