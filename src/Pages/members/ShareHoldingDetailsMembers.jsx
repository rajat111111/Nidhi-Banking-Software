import * as React from "react";
import {
    Box,
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
} from "@mui/material";
import { Visibility, Edit, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/PageHeader";
import DynamicDataTable from "../../components/DynamicTable";
import { useNavigate } from "react-router-dom";

// Styled status button for Active/Inactive
const StatusButton = styled(Button)(({ status }) => ({
    borderRadius: "50px",
    backgroundColor: status === "Active" ? "#DBE9ED" : "#FFD8D8",
    color: status === "Active" ? "#0D6A84" : "#C90303",
    padding: "2px 20px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: status === "Active" ? "#0D6A84" : "#C90303",
        color: "#fff",
    },
}));

const ShareHoldingDetailsMembers = () => {
    const navigate = useNavigate();

    const columns = [
        { id: "member", label: "Member", minWidth: 120 },
        { id: "shareRange", label: "Share Range", minWidth: 140 },
        { id: "totalShareHeld", label: "Total Share Held", minWidth: 130 },
        { id: "nominalVal", label: "Nominal Val", minWidth: 100 },
        { id: "totalShareVal", label: "Total Share Val", minWidth: 130 },
        { id: "allotmentDate", label: "Allotment Date", minWidth: 140 },
        { id: "transferDate", label: "Transfer Date", minWidth: 130 },
        { id: "folioNumber", label: "Folio Number", minWidth: 140 },
        { id: "certNumber", label: "Cert Number", minWidth: 140 },
        { id: "surrendered", label: "Surrendered", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 80, align: "center" },
        { id: "actions", label: "Actions", minWidth: 220, align: "right" },
    ];

    const initialRows = [
        {
            id: 1,
            member: "Taxhint Advisor",
            shareRange: "40011 - 40020",
            totalShareHeld: 1,
            nominalVal: 10,
            totalShareVal: 10,
            allotmentDate: "31 March 2024",
            transferDate: "09 April 2025",
            folioNumber: "2563256",
            certNumber: "0012562",
            surrendered: "No",
            statusText: "Pending",
        },
        {
            id: 2,
            member: "Mr. Kitzo Tech",
            shareRange: "40001 - 40010",
            totalShareHeld: 10,
            nominalVal: 10,
            totalShareVal: 100,
            allotmentDate: "09 April 2024",
            transferDate: "13 April 2025",
            folioNumber: "2563256",
            certNumber: "0012256",
            surrendered: "No",
            statusText: "Pending",
        },
        // ...add more rows accordingly
    ];

    const [rows, setRows] = React.useState(
        initialRows.map((row) => ({
            ...row,
            status: <StatusButton status={row.statusText}>{row.statusText}</StatusButton>,
            actions: (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button variant="outlined" size="small" onClick={() => alert(`SH-1 for ${row.member}`)}>
                        SH-1
                    </Button>
                    <Button variant="outlined" size="small" onClick={() => alert(`SH-4 for ${row.member}`)}>
                        SH-4
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => alert(`View details for ${row.member}`)}
                    >
                        View
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => alert(`Delete ${row.member}`)}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        }))
    );

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <PageHeader
                title="Share Holding Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
                primaryButton={{
                    label: "Add New",
                    variant: "contained",
                    color: "secondary",
                    onClick: () => navigate("/members/add-share-holding"),
                }}
                extraButtons={[
                    {
                        label: "Manual Share Allocation",
                        onClick: () => navigate("/members/manual-share-allocation"),
                        variant: "contained",     // make these look like buttons
                        color: "secondary",
                    },
                    {
                        label: "Unallotted Shares",
                        onClick: () => navigate("/members/unallotted-shares"),
                        variant: "contained",
                        color: "secondary",
                    },
                    {
                        label: "Manual Share Transfer",
                        onClick: () => navigate("/members/manual-share-transfer"),
                        variant: "contained",
                        color: "secondary",
                    },
                ]}
            />


            <DynamicDataTable columns={columns} rows={rows} pagination />
        </Box>
    );
};

export default ShareHoldingDetailsMembers;
