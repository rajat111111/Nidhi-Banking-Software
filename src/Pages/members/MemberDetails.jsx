


import React from "react";
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
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/PageHeader";
import DynamicDataTable from "../../components/DynamicTable";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../components/DynamicButton";
import { useGetApprovedMembersQuery } from "../../features/api/membersApi";

// Styled status button
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

  // ✅ Fetch members from backend
  const { data, isLoading, isError, refetch } = useGetApprovedMembersQuery();


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

  // ✅ Transform API data to table rows
  const rows =
    data?.data?.map((member) => ({
      id: member.id,
      branch: member.branch?.name || "-",
      memberNo: member.memberNo || "-", // if available later
      applicationNo: member.applicationNumber || "-",
      annualIncomeRange: member.annualIncomeRange || "-",
      memberName: `${member.title || ""} ${member.firstName || ""} ${member.lastName || ""}`.trim(),
      fatherName: member.fatherName || "-",
      email:
        member.emails?.find((e) => e.active)?.email ||
        member.emails?.[0]?.email ||
        "-",
      contactNo:
        member.mobileNumbers?.find((m) => m.active)?.number ||
        member.mobileNumbers?.[0]?.number ||
        "-",
      address:
        member.correspondenceAddress?.address ||
        member.permanentAddress?.address ||
        "-",
      city:
        member.correspondenceAddress?.city ||
        member.permanentAddress?.city ||
        "-",
      state:
        member.correspondenceAddress?.state ||
        member.permanentAddress?.state ||
        "-",
      pinNumber:
        member.correspondenceAddress?.pinCode ||
        member.permanentAddress?.pinCode ||
        "-",
      status: (
        <StatusButton status={member.status || "Active"}>
          {member.status || "Active"}
        </StatusButton>
      ),
      actions: (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <DynamicButton
            text="View"
            borderColor="#0D6A84"
            variant="outlined"
            textColor="#0D6A84"
          />
          <DynamicButton
            text="Edit"
            borderColor="#7858C6"
            variant="outlined"
            textColor="#7858C6"
          />
          <DynamicButton
            text="Collect Membership Fees"
            borderColor="#7858C6"
            variant="outlined"
            textColor="#7858C6"
            onClick={() => navigate(`/members/${member.id}/collect-membership`)}
          />
          <DynamicButton
            text="Delete"
            borderColor="#C90303"
            variant="outlined"
            textColor="#C90303"
          />
        </Stack>
      )
    })) || [];

  // Loading & error handling
  if (isLoading) return <p>Loading members...</p>;
  if (isError) return <p>Failed to fetch members.</p>;

  return (
    <Box sx={{ width: "100%" }}>
      <PageHeader
        title="Member Details"
        onFilter={() => alert("Filter clicked")}
        onDownload={() => alert("Download clicked")}
        primaryButton={{
          label: "+ Add Member",
          to: "/members/add", // ✅ use "to" for NavLink
        }}
      />
      <DynamicDataTable columns={columns} rows={rows} />
    </Box>
  );
};

export default MemberDetails;

