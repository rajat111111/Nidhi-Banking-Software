import * as React from "react";
import { Box, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
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

// Define columns with action button rendering
const MinorDetailsPromoters = () => {
    const navigate = useNavigate();

    const columns = [
        { id: "id", label: "#", minWidth: 30 },
        { id: "firstName", label: "First Name", minWidth: 100 },
        { id: "lastName", label: "Last Name", minWidth: 100 },
        { id: "guardianName", label: "Guardian Name", minWidth: 150 },
        { id: "dob", label: "Date of Birth", minWidth: 110 },
        { id: "age", label: "Age", minWidth: 40, align: "center" },
        { id: "status", label: "Status", minWidth: 80, align: "center" },
        { id: "actions", label: "Actions", minWidth: 120, align: "right" },
    ];

    const initialRows = [
        {
            id: 1,
            firstName: "Aarav",
            lastName: "Sharma",
            guardianName: "Renuka Sharma",
            dob: "12-03-2010",
            age: 14,
            status: <StatusButton status="Active">Active</StatusButton>,
        },
        {
            id: 2,
            firstName: "Siya",
            lastName: "Gupta",
            guardianName: "Mahi Gupta",
            dob: "25-07-2012",
            age: 14,
            status: <StatusButton status="Active">Active</StatusButton>,
        },
        {
            id: 7,
            firstName: "Siya",
            lastName: "Gupta",
            guardianName: "Mahi Gupta",
            dob: "12-03-2010",
            age: 12,
            status: <StatusButton status="Inactive">Inactive</StatusButton>,
        },
    ];

    // Add actions on the fly so rows remain data objects clean
    const [rows, setRows] = React.useState(
        initialRows.map(row => ({
            ...row,
            actions: (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                        startIcon={<Visibility />}
                        size="small"
                        onClick={() => handleViewClick(row)}
                    >
                        View
                    </Button>
                    <Button
                        startIcon={<Edit />}
                        size="small"
                        onClick={() => navigate(`/promoters/${row.id}/edit`)}
                    >
                        Edit
                    </Button>
                </Stack>
            )
        }))
    );

    const [open, setOpen] = React.useState(false);
    const [selectedMinor, setSelectedMinor] = React.useState(null);

    const handleViewClick = (minor) => {
        setSelectedMinor(minor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMinor(null);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader
                title="Minor Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
                primaryButton={{
                    label: "+ Add Promoter",
                    onClick: () => navigate("/promoters/add"),
                }}
            />
            <DynamicDataTable columns={columns} rows={rows} />

            {/* Dialog for minor detail view */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Minor Details
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedMinor && (
                        <Stack spacing={2}>
                            <TextField label="First Name" value={selectedMinor.firstName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Last Name" value={selectedMinor.lastName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Guardian Name" value={selectedMinor.guardianName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Date of Birth" value={selectedMinor.dob} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Age" value={selectedMinor.age} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Status" value={selectedMinor.status.props.children} fullWidth InputProps={{ readOnly: true }} />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary">Update</Button>
                    <Button onClick={handleClose} color="primary">Close</Button>
                    {/* Additional Update button logic can be added here if needed */}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MinorDetailsPromoters;
