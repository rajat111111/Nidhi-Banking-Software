import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit, Visibility } from "@mui/icons-material";
import DynamicDataTable from "../../components/DynamicTable";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useGetPromotersQuery } from "../../features/api/promotersApi";
import CircularLoader from "../../components/skeleton/CircularLoader";

// Styled Buttons
const StatusButton = styled(Button)(({ status }) => ({
    borderRadius: "50px",
    backgroundColor: status === "enable" ? "#DBE9ED" : "#FFD8D8",
    color: status === "enable" ? "#0D6A84" : "#C90303",
    padding: "2px 20px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: status === "enable" ? "#0D6A84" : "#C90303",
        color: "#fff",
    },
}));

const ActionButton = styled(Button)(() => ({
    borderRadius: "50px",
    borderColor: "#0D6A84",
    color: "#0D6A84",
    padding: "2px 14px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#0D6A84",
        color: "#fff",
    },
}));

const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "firstName", label: "First Name", minWidth: 120 },
    { id: "lastName", label: "Last Name", minWidth: 120 },
    { id: "promoterNumber", label: "Promoter Number", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 120, align: "center" },
    { id: "action", label: "Action", minWidth: 180, align: "right" },
];

const Promoters = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetPromotersQuery();
    console.log(data);

    if (isLoading) return <CircularLoader />;
    if (isError) return <p>Error loading promoters</p>;

    // Transform API data → rows for table
    const rows = data?.data?.map((item, index) => ({
        id: index + 1,
        firstName: item.promoterInformation?.firstName || "-",
        lastName: item.promoterInformation?.lastName || "-",
        promoterNumber: item.promoterKyc?.aadhaarNumber || "-",
        status: (
            <StatusButton status="enable">
                Active
            </StatusButton>
        ),
        action: (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <ActionButton
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/promoters/promoterDetails/${item.id}`)}
                >
                    View
                </ActionButton>
                <ActionButton
                    startIcon={<Edit />}
                    onClick={() => navigate(`/promoters/${item.id}`)}
                >Edit</ActionButton>
            </Stack>
        ),
    }));

    return (
        <Box>
            <PageHeader
                title="Promoters Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
                primaryButton={{
                    label: "+ Add Promoter",
                    to: "/promoters/add", // ✅ use "to" for NavLink
                }}
            />
            <DynamicDataTable columns={columns} rows={rows} />
        </Box>
    );
};

export default Promoters;
