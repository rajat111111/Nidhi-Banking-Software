import React from "react";
import { Box, Button, Stack, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import DynamicDataTable from "../../components/DynamicTable";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useGetAllShareHoldingsQuery } from "../../features/api/promotersApi";


// Styled buttons
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

// Table columns
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
    const { data, isLoading, isError } = useGetAllShareHoldingsQuery();
    console.log(data)
    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );

    if (isError) return <Box>Error fetching data</Box>;

    // Map API data to table rows
    const rows = rowsData?.map((item, index) => ({
        id: index + 1,
        promoterName: item.promoterName,
        shareRange: item.shareRange,
        totalShares: item.totalShares,
        nominalVal: item.nominalVal,
        totalShareVal: item.totalShareVal,
        allotmentDate: item.allotmentDate,
        transferDate: item.transferDate,
        folioNo: item.folioNo,
        certNo: item.certNo,
        surrendered: item.surrendered,
        actions: (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <ActionButton
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/promoters/share-holder/${item.id}`)}
                >
                    View
                </ActionButton>
                <ActionButton
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => navigate(`/promoters/edit/${item.id}`)}
                >
                    Edit
                </ActionButton>
                <ActionButton
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => alert(`Delete clicked for ID: ${item.id}`)}
                >
                    Delete
                </ActionButton>
            </Stack>
        ),
    }));

    return (
        <Box sx={{ padding: 2 }}>
            <PageHeader
                title="Share Holdings"
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
