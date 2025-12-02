// import React, { useState } from "react";
// import { Box, Grid, TextField, Typography } from "@mui/material";
// import PageHeader from "../../../components/PageHeader";
// import DynamicDataTable from "../../../components/DynamicTable";
// import DynamicButton from "../../../components/DynamicButton";

// const sample = [
//     { id: 1, accountNo: "2314562563", branchId: "SBI00032", agentId: "SR12365", depositAmount: "₹25,350", interestRate: "7.5%", tenure: 365, startDate: "01-Oct-2025", maturityDate: "01-Oct-2026", approvedDate: "31 Mar 2024", approvedBy: "Deepankar", status: "Approved" },
//     { id: 2, accountNo: "2314562564", branchId: "SBI00032", agentId: "SR12366", depositAmount: "₹30,000", interestRate: "7.5%", tenure: 240, startDate: "01-Oct-2025", maturityDate: "01-Oct-2026", approvedDate: "-", approvedBy: "-", status: "Pending" },
// ];

// const ApprovalDD = () => {
//     const [rows, setRows] = useState(sample);
//     const columns = [
//         { id: "accountNo", label: "DD Account No.", minWidth: 130 },
//         { id: "branchId", label: "Branch ID", minWidth: 100 },
//         { id: "agentId", label: "Agent ID", minWidth: 100 },
//         { id: "depositAmount", label: "Deposit Amount", minWidth: 120 },
//         { id: "interestRate", label: "Interest Rate", minWidth: 100 },
//         { id: "tenure", label: "Tenure (Day)", minWidth: 110 },
//         { id: "startDate", label: "Start Date", minWidth: 120 },
//         { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
//         { id: "approvedDate", label: "Approved Date", minWidth: 120 },
//         { id: "approvedBy", label: "Approved By", minWidth: 120 },
//         { id: "status", label: "Status", minWidth: 100 },
//     ];

//     const handleApprove = (row) => {
//         setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "Approved", approvedDate: new Date().toLocaleDateString(), approvedBy: "You" } : r)));
//     };

//     const actions = {
//         view: (r) => alert(`view ${r.accountNo}`),
//         edit: null,
//         delete: null,
//     };

//     // wrap actions to show Approve button in actions column for Pending rows
//     const rowsWithActions = rows.map((r) => ({
//         ...r,
//         actions: (
//             <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
//                 <DynamicButton variant="outlined" text="View" onClick={() => actions.view(r)} />
//                 {r.status && r.status.toLowerCase() === "pending" && (
//                     <DynamicButton text="Approve" color="#0f9d58" textColor="#fff" onClick={() => handleApprove(r)} />
//                 )}
//             </div>
//         ),
//     }));

//     // Provide a columns config that includes actions at the end
//     const columnsForTable = [...columns, { id: "actions", label: "Actions", minWidth: 160, align: "right" }];

//     return (
//         <Box sx={{ width: "100%" }}>
//             <PageHeader title="Approval" onFilter={() => { }} onDownload={() => { }} />
//             <DynamicDataTable columns={columnsForTable} rows={rowsWithActions} />
//         </Box>
//     );
// };

// export default ApprovalDD;

// src/pages/ddAccount/ApprovalDD.jsx
// src/pages/ddAccount/ApprovalDD.jsx
import React, { useState, useMemo, useEffect } from "react";

import { NavLink } from "react-router-dom";
import { Alert, Snackbar, styled, Box, Typography, CircularProgress } from "@mui/material";
import { useApproveDdAccountMutation, useGetDdAccountDetailsQuery } from "../../../features/api/ddAccountsApi";
import { capitalizeFirstLetter } from "../../../helper/helper";
import DynamicButton from "../../../components/DynamicButton";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import DynamicDataTable from "../../../components/DynamicTable";



const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
});

// columns for table — adjust labels to your taste
const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "ddAccountNo", label: "DD Account No.", minWidth: 140 },
    { id: "memberName", label: "Member Name", minWidth: 180 },
    { id: "branchName", label: "Branch Name", minWidth: 150 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 140 },
    { id: "interestRate", label: "Interest Rate", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 120 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
    { id: "approvedDate", label: "Approved Date", minWidth: 120 },
    { id: "approvedBy", label: "Approved By", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 160 },
];

function getDisplayValue(val) {
    if (val === null || val === undefined) return "-";
    if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") return String(val);
    if (Array.isArray(val)) {
        return val
            .map((v) => {
                if (v === null || v === undefined) return "";
                if (typeof v === "string" || typeof v === "number") return String(v);
                return v.name || (v.firstName || v.lastName ? `${v.firstName ?? ""} ${v.lastName ?? ""}`.trim() : JSON.stringify(v));
            })
            .filter(Boolean)
            .join(", ");
    }
    if (typeof val === "object") {
        if (val.name) return String(val.name);
        if (val.fullName) return String(val.fullName);
        const fn = val.firstName ?? val.fname ?? val.givenName;
        const ln = val.lastName ?? val.lname ?? val.familyName;
        if (fn || ln) return `${fn ?? ""}${fn && ln ? " " : ""}${ln ?? ""}`.trim();
        if (val.accountNumber) return String(val.accountNumber);
        if (val.branchName) return String(val.branchName);
        try {
            const json = JSON.stringify(val);
            return json.length > 80 ? json.slice(0, 80) + "..." : json;
        } catch {
            return "-";
        }
    }
    return String(val);
}

const ApprovalDD = () => {
    // snackbars
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

    // fetch dd accounts (list)
    const { data, isLoading, isError, error, refetch } = useGetDdAccountDetailsQuery();

    // approve mutation (server)
    const [approveDdAccount, { isLoading: approveLoading, data: approveRes, isError: approveIsError, error: approveError, isSuccess: approveSuccess }] =
        useApproveDdAccountMutation();

    // in-memory optimistic map for immediate UI
    const [localApprovedMap, setLocalApprovedMap] = useState({});

    // normalize list (support array or { data: [] })
    const ddList = Array.isArray(data) ? data : data?.data ?? [];

    // rows mapping — make sure each cell is a string/number or React node
    const rows = ddList.map((item, i) => {
        const idKey = item?.id ?? item?.accountId ?? i + 1;
        const statusRaw = (localApprovedMap[idKey] && "approved") || item?.status || item?.currentStatus || "pending";
        const status = capitalizeFirstLetter(statusRaw);

        const ddAccountNo = getDisplayValue(item?.accountNumber ?? item?.ddAccountNo ?? item?.account_no);
        const memberName = getDisplayValue(item?.memberName ?? item?.member_name ?? (item?.firstName || item?.lastName ? { firstName: item.firstName, lastName: item.lastName, title: item.title } : null));
        const branchName = getDisplayValue(item?.branchName ?? item?.branch ?? item?.branch_id);
        const depositAmount = (() => {
            const amt = item?.depositAmount ?? item?.amount ?? item?.deposit_amount;
            if (amt === undefined || amt === null) return "-";
            const num = Number(amt);
            if (!Number.isNaN(num)) return `₹ ${num.toLocaleString()}`;
            return String(amt);
        })();
        const interestRate = (() => {
            const r = item?.interestRate ?? item?.rate ?? item?.interest_rate;
            if (r === undefined || r === null) return "-";
            return typeof r === "number" ? `${r}%` : r.toString().includes("%") ? r : `${r}%`;
        })();
        const startDate = getDisplayValue(item?.startDate ?? item?.ddStartDate ?? item?.start_date ?? item?.openedAt);
        const maturityDate = getDisplayValue(item?.maturityDate ?? item?.maturity_date ?? item?.maturityAt);
        const approvedDate = getDisplayValue(item?.approvedDate ?? localApprovedMap[idKey]?.approvedDate ?? item?.approved_date);
        const approvedBy = getDisplayValue(item?.approvedBy ?? localApprovedMap[idKey]?.approvedBy ?? item?.approved_by);

        return {
            id: i + 1,
            ddAccountNo,
            memberName,
            branchName,
            depositAmount,
            interestRate,
            startDate,
            maturityDate,
            approvedDate,
            approvedBy,
            status,
            raw: item,
            action: (
                <ActionButtonContainer>
                    <DynamicButton
                        text="View"
                        variant="outlined"
                        textColor="#7858C6"
                        borderColor="#7858C6"
                        borderRadius="5px"
                        component={NavLink}
                        to={`/dd-accounts/${idKey}/account-details`}
                    />

                    {statusRaw.toLowerCase() === "pending" && (
                        <DynamicButton
                            text={<SubmitButtonLoader isLoading={approveLoading && localApprovedMap[idKey]?.pending} text="Approve" loaderColor="#0D6A84" texting="Please Wait " />}
                            variant="outlined"
                            textColor="#0D6A84"
                            onClick={() => handleApprove(item, idKey)}
                            borderColor="#0D6A84"
                            borderRadius="5px"
                        />
                    )}
                </ActionButtonContainer>
            ),
        };
    });

    // Approve handler: confirm, optimistic UI, call mutation, handle result
    async function handleApprove(item, accountId) {
        const confirm = window.confirm(`Approve DD account ${getDisplayValue(item?.accountNumber ?? accountId)}?`);
        if (!confirm) return;

        // optimistic UI: mark pending in localApprovedMap
        setLocalApprovedMap((prev) => ({ ...prev, [accountId]: { pending: true } }));

        try {
            const res = await approveDdAccount(accountId).unwrap(); // throws if error
            // mark approved date/by in local map with server response if provided
            const approvedDate = res?.approvedDate ?? new Date().toLocaleDateString();
            const approvedBy = res?.approvedBy ?? "You";

            setLocalApprovedMap((prev) => ({
                ...prev,
                [accountId]: { pending: false, approvedDate, approvedBy },
            }));

            setSnackbar({ open: true, message: `Account ${accountId} approved successfully.`, severity: "success" });
        } catch (err) {
            console.error("Approve failed:", err);
            // remove optimistic mark / or mark as failed
            setLocalApprovedMap((prev) => {
                const copy = { ...prev };
                delete copy[accountId];
                return copy;
            });
            setSnackbar({ open: true, message: `Failed to approve account ${accountId}.`, severity: "error" });
        } finally {
            // refetch list to ensure server state is in sync (invalidateTags already set on mutation; this triggers automatically)
            setTimeout(() => refetch(), 300); // small delay helps ensure DB commit on some backends
        }
    }

    const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

    return (
        <PagesMainContainerStyle>
            <PageHeader title="Approval" onFilter onDownload />
            <Box sx={{ width: "100%", mt: 2 }}>
                {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={20} />
                        <Typography>Loading accounts...</Typography>
                    </Box>
                ) : isError ? (
                    <Typography color="error">Failed to load accounts: {JSON.stringify(error)}</Typography>
                ) : (
                    <DynamicDataTable isLoading={false} rows={rows} columns={columns} />
                )}
            </Box>

            <ErrorAndSuccessUseEffect
                isError={approveIsError}
                error={approveError}
                data={approveRes}
                isSuccess={approveSuccess}
                setSnackbar={setSnackbar}
            />

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: "100%", color: "#fff" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </PagesMainContainerStyle>
    );
};

export default ApprovalDD;
