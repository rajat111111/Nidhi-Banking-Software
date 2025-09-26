import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShareHoldingDetailsPromoters = ({ onBack }) => {
    // Static example data for display
    const data = {
        promoterName: "Mr. Meera Singh",
        shareRange: "1 - 20,000",
        totalShares: "20,000",
        nominalVal: "20",
        totalShareVal: "40,000",
        allotmentDate: "26 Nov 2024",
        transferDate: "16 August 2025",
        folioNumber: "235641",
        certNumber: "235641",
        surrendered: "No",
    };

    const labelColor = "text.secondary";
    const valueColor = "text.primary";

    // Helper component for label + value in one line
    const DetailItem = ({ label, value }) => (
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography color={labelColor} fontSize={14} fontWeight="medium">
                {label}
            </Typography>
            <Typography color={valueColor} fontSize={14} fontWeight="regular" sx={{ ml: 2 }}>
                {value}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ p: 2, bgcolor: "#f7f8fa", borderRadius: 1, mx: "auto", maxWidth: 900 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Share Holding Details
                </Typography>
                <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={onBack}>
                    Back
                </Button>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Promoter Name" value={data.promoterName} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Share Range" value={data.shareRange} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Total Shares Held" value={data.totalShares} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Nominal Val" value={data.nominalVal} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Total Share Val" value={data.totalShareVal} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Allotment Date" value={data.allotmentDate} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Transfer Date" value={data.transferDate} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Folio Number" value={data.folioNumber} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Cert Number" value={data.certNumber} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DetailItem label="Surrendered" value={data.surrendered} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShareHoldingDetailsPromoters;
