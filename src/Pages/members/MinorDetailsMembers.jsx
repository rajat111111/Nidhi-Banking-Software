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
const MinorDetailsMembers = () => { // Renamed from MinorDetailsPromoters to MinorDetails
    const navigate = useNavigate();

    const columns = [
        { id: "memberNo", label: "Member No.", minWidth: 100 },
        { id: "memberName", label: "Member Name", minWidth: 120 },
        { id: "guardianName", label: "Guardian Name", minWidth: 150 },
        { id: "dateOfBirth", label: "Date of Birth", minWidth: 110 },
        { id: "age", label: "Age", minWidth: 40, align: "center" },
        { id: "email", label: "Email", minWidth: 180 },
        { id: "contactNo", label: "Contact No.", minWidth: 120 },
        { id: "address", label: "Address", minWidth: 250 },
        { id: "city", label: "City", minWidth: 100 },
        { id: "state", label: "State", minWidth: 100 },
        { id: "pinNumber", label: "Pin Number", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 80, align: "center" },
        { id: "actions", label: "Actions", minWidth: 120, align: "right" },
    ];

    const initialRows = [
        {
            memberNo: "#2365478",
            memberName: "Himani Adlakha",
            guardianName: "Ramesh Adlakha",
            dateOfBirth: "12-03-2010",
            age: 14,
            email: "himani@gmail.com",
            contactNo: "9999998254",
            address: "Flat No. 12B, Shanti Apartments Andheri East Mumbai, MH - India",
            city: "Mumbai",
            state: "Maharashtra",
            pinNumber: "400003",
            status: <StatusButton status="Active">Active</StatusButton>,
        },
        {
            memberNo: "#2365478",
            memberName: "Himani Adlakha",
            guardianName: "Ramesh Adlakha",
            dateOfBirth: "12-03-2010",
            age: 14,
            email: "himani@gmail.com",
            contactNo: "9999998254",
            address: "Flat No. 12B, Shanti Apartments Andheri East Mumbai, MH - India",
            city: "Mumbai",
            state: "Maharashtra",
            pinNumber: "400003",
            status: <StatusButton status="Active">Active</StatusButton>,
        },

    ];

    // Add actions on the fly so rows remain data objects clean
    const [rows, setRows] = React.useState(
        initialRows.map((row, index) => ({
            ...row,
            // Assign a unique id to each row for consistent key handling
            id: index + 1, // Use index + 1 for simple unique IDs
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
                        // You'll need a unique ID from your actual data for navigation
                        // For now, we'll use a placeholder or the index if no other ID exists
                        onClick={() => navigate(`/minor-details/${index + 1}/edit`)} // Placeholder route
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
                    label: "+ Add Minor", // Changed button label
                    onClick: () => navigate("/minor-details/add"), // Placeholder route
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
                            <TextField label="Member No." value={selectedMinor.memberNo} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Member Name" value={selectedMinor.memberName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Guardian Name" value={selectedMinor.guardianName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Date of Birth" value={selectedMinor.dateOfBirth} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Age" value={selectedMinor.age} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Email" value={selectedMinor.email} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Contact No." value={selectedMinor.contactNo} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Address" value={selectedMinor.address} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="City" value={selectedMinor.city} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="State" value={selectedMinor.state} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Pin Number" value={selectedMinor.pinNumber} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Status" value={selectedMinor.status.props.children} fullWidth InputProps={{ readOnly: true }} />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary">Update</Button>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MinorDetailsMembers;