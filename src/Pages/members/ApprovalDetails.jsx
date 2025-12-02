
import React, { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DynamicDataTable from "../../components/DynamicTable";
import DynamicButton from "../../components/DynamicButton";
import { useApproveApprovalMutation, useGetMembersQuery } from "../../features/api/membersApi";

const statusColors = {
    pending: "#6c6c6c",
    Pending: "#6c6c6c",
    approved: "#0f9d58",
    Approved: "#0f9d58",
    rejected: "#d32f2f",
    Rejected: "#d32f2f",
};

const ApprovalDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // optional member id
    const { data: membersResponse, isLoading, isError, refetch } = useGetMembersQuery();
    const [approveApproval] = useApproveApprovalMutation();


    const membersList = membersResponse?.data || []; // list of members from API
    const [snackbar, setSnackbar] = useState(null);

    // If id provided, try to find that member
    const selectedMember = useMemo(
        () => (id ? membersList.find((m) => String(m.id) === String(id)) || null : null),
        [membersList, id]
    );

    // If selectedMember contains nested approvals, use them; otherwise fall back to mapping members or the single member.
    const approvalsOrMembersRows = useMemo(() => {
        // Helper to create row shape used by DynamicDataTable
        const makeRowFromApproval = (appr, idx, memberCtx) => {
            const statusRaw = (appr.status || appr.state || "Pending").toString();
            const statusText = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
            const statusLabel = (
                <Typography sx={{ color: statusColors[statusRaw] || "#6c6c6c", fontWeight: 600 }}>
                    {statusText}
                </Typography>
            );

            const reference = appr.reference || appr.ref || `Txn#${appr.id || idx + 1}`;
            const memberNo = appr.memberNo || memberCtx?.applicationNumber || "-";
            const memberName =
                appr.memberName ||
                `${memberCtx?.firstName || ""} ${memberCtx?.lastName || ""}`.trim() ||
                "-";
            const accountType = appr.accountType || appr.type || "Saving Account";
            const amount = appr.amount ? `₹ ${appr.amount}` : appr.transactionAmount || "-";
            const transactionDate = appr.transactionDate || appr.date || "-";
            const accountNumber = appr.accountNumber || memberCtx?.bankAccountDetails?.accountNumber || "-";
            const approvedTime = appr.approvedTime || "-";
            const reviewedBy = appr.reviewedBy || "-";
            const remark = appr.remark || appr.comments || "-";

            const actions = (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <DynamicButton
                        text="View"
                        variant="outlined"
                        textColor="#0D6A84"
                        borderColor="#0D6A84"
                        onClick={() => navigate(`/members/approval-details/${appr.id || memberCtx?.id || idx + 1}`)}
                    />
                    {statusText === "Pending" && (
                        <>
                            <DynamicButton
                                text="Approve"
                                variant="contained"
                                textColor="#fff"
                                color="#0f9d58"
                                onClick={() => handleApprove(appr)}
                            />
                            <DynamicButton
                                text="Reject"
                                variant="outlined"
                                textColor="#d32f2f"
                                borderColor="#d32f2f"
                                onClick={() => handleReject(appr)}
                            />
                        </>
                    )}
                </Stack>
            );

            return {
                id: appr.id || idx + 1,
                reference,
                memberNo,
                memberName,
                accountType,
                amount,
                transactionDate,
                accountNumber,
                approvedTime,
                reviewedBy,
                remark,
                status: statusLabel,
                actions,
            };
        };

        // If a selected member exists and it has approvals array -> map those
        if (selectedMember) {
            const possibleApprovals =
                selectedMember.approvals ||
                selectedMember.approvalDetails ||
                selectedMember.transactions ||
                selectedMember.paymentApprovals ||
                null;

            if (Array.isArray(possibleApprovals) && possibleApprovals.length > 0) {
                return possibleApprovals.map((appr, idx) => makeRowFromApproval(appr, idx, selectedMember));
            }

            // No nested approvals — show one row built from the selected member (so user sees data)
            const fakeApproval = {
                id: selectedMember.id,
                reference: `Member#${selectedMember.applicationNumber || selectedMember.id}`,
                amount: "-", // no txn
                transactionDate: "-",
                accountNumber: selectedMember.bankAccountDetails?.accountNumber || "-",
                status: selectedMember.status || "Pending",
                remark: "-",
            };
            return [makeRowFromApproval(fakeApproval, 0, selectedMember)];
        }

        // No selected member -> show full members list (each member becomes a row)
        if (membersList.length > 0) {
            return membersList.map((m, idx) =>
                makeRowFromApproval(
                    {
                        id: m.id,
                        reference: `Member#${m.applicationNumber || m.id}`,
                        amount: "-",
                        transactionDate: m.enrollmentDate || m.createdAt || "-",
                        status: m.status || "Pending",
                    },
                    idx,
                    m
                )
            );
        }

        // default empty
        return [];
    }, [selectedMember, membersList, navigate]);

    // Table columns (same as your design)
    const columns = [
        { id: "reference", label: "Reference", minWidth: 120 },
        { id: "memberNo", label: "Member No.", minWidth: 120 },
        { id: "memberName", label: "Member Name", minWidth: 160 },
        { id: "accountType", label: "Account Type", minWidth: 140 },
        { id: "amount", label: "Amount", minWidth: 120 },
        { id: "transactionDate", label: "Transaction Date", minWidth: 140 },
        { id: "accountNumber", label: "Account Number", minWidth: 140 },
        { id: "approvedTime", label: "Approved Time", minWidth: 120 },
        { id: "reviewedBy", label: "Reviewed By", minWidth: 140 },
        { id: "remark", label: "Remark", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 220, align: "right" },
    ];

    // Handlers (placeholders — swap with RTK mutations)

    const handleApprove = async (appr) => {
        try {
            await approveApproval({ approvalId: appr.id }).unwrap();
            setSnackbar({ open: true, message: "Approved successfully.", severity: "success" });
            await refetch();
        } catch (err) {
            setSnackbar({ open: true, message: "Approve failed", severity: "error" });
        }
    };

    const handleReject = (item) => {
        setSnackbar({ open: true, message: "Rejected (placeholder).", severity: "success" });
        // TODO: call reject mutation and refetch
    };

    // Render
    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader title="Approval Details" onFilter={() => { }} onDownload={() => { }} />

            <DynamicDataTable columns={columns} rows={approvalsOrMembersRows} isLoading={isLoading} />

            {snackbar && (
                <div style={{ position: "fixed", bottom: 16, right: 16 }}>
                    <Typography
                        sx={{
                            background: snackbar.severity === "success" ? "#0f9d58" : "#d32f2f",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: 4,
                        }}
                    >
                        {snackbar.message}
                    </Typography>
                </div>
            )}
        </Box>
    );
};

export default ApprovalDetails;
