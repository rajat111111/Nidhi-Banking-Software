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

const MemberDetails = () => {
    const navigate = useNavigate();

    const columns = [
        { id: "branch", label: "Branch", minWidth: 120 },
        { id: "memberNo", label: "Member No.", minWidth: 100 },
        { id: "applicationNo", label: "Application No.", minWidth: 100 },
        { id: "annualIncomeRange", label: "Annual Income Range", minWidth: 140 },
        { id: "memberName", label: "Member Name", minWidth: 140 },
        { id: "fatherName", label: "Father's Name", minWidth: 140 },
        { id: "email", label: "Email", minWidth: 180 },
        { id: "contactNo", label: "Contact No.", minWidth: 120 },
        { id: "address", label: "Address", minWidth: 220 },
        { id: "city", label: "City", minWidth: 100 },
        { id: "state", label: "State", minWidth: 100 },
        { id: "pinNumber", label: "Pin Number", minWidth: 80 },
        { id: "status", label: "Status", minWidth: 80, align: "center" },
        { id: "actions", label: "Actions", minWidth: 220, align: "right" },
    ];

    const initialRows = [
        {
            id: 1,
            branch: "Taxhint Advisor",
            memberNo: "#2365478",
            applicationNo: "2365478",
            annualIncomeRange: "₹5,25,256",
            memberName: "Himani Adlakha",
            fatherName: "Ramesh Adlakha",
            email: "himani@gmail.com",
            contactNo: "9999998254",
            address: "Flat No. 12B, Shanti Apartments Andheri East Mumbai, MH – India",
            city: "Mumbai",
            state: "Maharashtra",
            pinNumber: "400003",
            statusText: "Active",
        },
        // Additional member entries can be added here
    ];

    const [rows, setRows] = React.useState(
        initialRows.map((row) => ({
            ...row,
            status: <StatusButton status={row.statusText}>{row.statusText}</StatusButton>,
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
                        onClick={() => navigate(`/members/${row.id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => navigate(`/members/collect-membership-fees/${row.id}`)}
                        variant="outlined"
                    >
                        Collect Membership Fees
                    </Button>
                    <Button
                        size="small"
                        onClick={() => handleDelete(row)}
                        color="error"
                        variant="outlined"
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        }))
    );

    const [open, setOpen] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState(null);

    const handleViewClick = (member) => {
        setSelectedMember(member);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMember(null);
    };

    const handleCollectFees = (member) => {
        alert(`Collect membership fees for ${member.memberName}`);
    };

    const handleDelete = (member) => {
        if (window.confirm(`Are you sure you want to delete ${member.memberName}?`)) {
            setRows((prev) => prev.filter((r) => r.id !== member.id));
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader
                title="Member Details"
                onFilter={() => alert("Filter clicked")}
                onDownload={() => alert("Download clicked")}
                primaryButton={{
                    label: "+ Add Member",
                    onClick: () => navigate("/members/add"),
                }}
            />
            <DynamicDataTable columns={columns} rows={rows} />

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    Member Details
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedMember && (
                        <Stack spacing={2}>
                            <TextField label="Branch" value={selectedMember.branch} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Member No." value={selectedMember.memberNo} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Application No." value={selectedMember.applicationNo} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Annual Income Range" value={selectedMember.annualIncomeRange} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Member Name" value={selectedMember.memberName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Father's Name" value={selectedMember.fatherName} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Email" value={selectedMember.email} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Contact No." value={selectedMember.contactNo} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Address" value={selectedMember.address} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="City" value={selectedMember.city} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="State" value={selectedMember.state} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Pin Number" value={selectedMember.pinNumber} fullWidth InputProps={{ readOnly: true }} />
                            <TextField label="Status" value={selectedMember.statusText} fullWidth InputProps={{ readOnly: true }} />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary">Update</Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MemberDetails;
