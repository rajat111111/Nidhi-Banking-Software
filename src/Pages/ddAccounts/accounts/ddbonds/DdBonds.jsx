// import React from "react";
// import { Box } from "@mui/material";
// import DynamicDataTable from "../../../../components/DynamicTable";

// const DDBonds = () => {
//     const columns = [
//         { id: "id", label: "#", minWidth: 50 },
//         { id: "bondId", label: "Bond ID", minWidth: 120 },
//         { id: "ddAccountNo", label: "DD Account No.", minWidth: 150 },
//         { id: "memberName", label: "Member Name", minWidth: 160 },
//         { id: "branch", label: "Branch", minWidth: 180 },
//         { id: "issueDate", label: "Issue Date", minWidth: 140 },
//         { id: "amount", label: "Amount", minWidth: 120 },
//         { id: "ddStartDate", label: "DD Start Date", minWidth: 140 },
//         { id: "maturityDate", label: "Maturity Date", minWidth: 150 },
//         { id: "interestRate", label: "Interest Rate (%)", minWidth: 150 },
//         { id: "payoutMode", label: "Payout Mode", minWidth: 120 },
//         { id: "status", label: "Status", minWidth: 100 },
//     ];

//     const rows = [
//         {
//             id: 1,
//             bondId: "DD0001",
//             ddAccountNo: "DD10001234",
//             memberName: "Rohan Verma",
//             branch: "Taxhint Pvt. Ltd.",
//             issueDate: "20 March 2024",
//             amount: "₹50,000",
//             ddStartDate: "14-12-2022",
//             maturityDate: "14-12-2025",
//             interestRate: "10%",
//             payoutMode: "Yearly",
//             status: "Active",
//         },
//         {
//             id: 2,
//             bondId: "DD0002",
//             ddAccountNo: "DD10001232",
//             memberName: "Rohan Verma",
//             branch: "Taxhint Pvt. Ltd.",
//             issueDate: "20 March 2024",
//             amount: "₹1,00,000",
//             ddStartDate: "01-01-2023",
//             maturityDate: "01-01-2028",
//             interestRate: "9%",
//             payoutMode: "Yearly",
//             status: "Active",
//         },
//     ];

//     const actions = {
//         view: (row) => alert(`Viewing Bond: ${row.bondId}`),
//         download: (row) => alert(`Downloading Bond: ${row.bondId}`),
//     };

//     return (
//         <Box sx={{ width: "100%", mt: 2 }}>
//             <h2 style={{ fontWeight: 600, marginBottom: 15 }}>DD Bond</h2>

//             <DynamicDataTable
//                 columns={columns}
//                 rows={rows}
//                 actions={{
//                     view: actions.view,
//                     edit: null,
//                     delete: null,
//                 }}
//             />
//         </Box>
//     );
// };

// export default DDBonds;
// src/pages/dd/parts/DDBonds.jsx
import React, { useMemo } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import DynamicDataTable from "../../../../components/DynamicTable";

import { useParams } from "react-router-dom";
import { useGetDdAccountBondsQuery } from "../../../../features/api/ddAccountsApi";

/**
 * DDBonds
 * Props:
 *  - accountId (optional). If not provided, component will try to read :id from route params.
 */
const DDBonds = ({ accountId: propAccountId }) => {
    const params = useParams();
    const accountId = propAccountId ?? params.id ?? params.accountId ?? 0; // fallback

    const { data, isLoading, isError, error } = useGetDdAccountBondsQuery(accountId, {
        // skip: !accountId // If you want to skip when no id provided
    });

    // columns definition
    const columns = useMemo(
        () => [
            { id: "id", label: "#", minWidth: 50 },
            { id: "bondId", label: "Bond ID", minWidth: 120 },
            { id: "ddAccountNo", label: "DD Account No.", minWidth: 150 },
            { id: "memberName", label: "Member Name", minWidth: 160 },
            { id: "branch", label: "Branch", minWidth: 180 },
            { id: "issueDate", label: "Issue Date", minWidth: 140 },
            { id: "amount", label: "Amount", minWidth: 120 },
            { id: "ddStartDate", label: "DD Start Date", minWidth: 140 },
            { id: "maturityDate", label: "Maturity Date", minWidth: 150 },
            { id: "interestRate", label: "Interest Rate (%)", minWidth: 150 },
            { id: "payoutMode", label: "Payout Mode", minWidth: 120 },
            { id: "status", label: "Status", minWidth: 100 },
        ],
        []
    );

    // Map server response to rows expected by DynamicDataTable.
    // Adjust depending on the server's response shape.
    const rows = (data?.data ?? []).map((bond, idx) => ({
        id: bond.id ?? idx + 1,
        bondId: bond.bondId ?? bond.bond_id ?? bond.bondNo ?? `BOND-${bond.id ?? idx + 1}`,
        ddAccountNo: bond.ddAccountNo ?? bond.dd_account_no ?? bond.accountNumber ?? "",
        memberName: bond.memberName ?? bond.member_name ?? bond.member ?? "",
        branch: bond.branch ?? bond.branchName ?? bond.branch_name ?? "",
        issueDate: bond.issueDate ?? bond.issue_date ?? bond.issuedAt ?? "",
        amount: bond.amount ? formatAmount(bond.amount) : bond.amount_display ?? "",
        ddStartDate: bond.ddStartDate ?? bond.dd_start_date ?? bond.startDate ?? "",
        maturityDate: bond.maturityDate ?? bond.maturity_date ?? bond.maturity ?? "",
        interestRate: bond.interestRate ?? bond.interest_rate ?? bond.rate ?? "",
        payoutMode: bond.payoutMode ?? bond.payout_mode ?? bond.payout ?? "",
        status: bond.status ?? bond.currentStatus ?? "Unknown",
        raw: bond, // keep full object if needed by actions
    }));

    function formatAmount(val) {
        // Basic formatting: if number, show with currency symbol
        if (typeof val === "number") return `₹${val.toLocaleString()}`;
        return val;
    }

    const actions = {
        view: (row) => {
            // e.g. navigate to bond detail or open modal
            alert(`Viewing Bond: ${row.bondId}`);
        },
        download: (row) => {
            // e.g. call an endpoint to download pdf using row.raw or row.id
            alert(`Downloading Bond: ${row.bondId}`);
        },
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <h2 style={{ fontWeight: 600, marginBottom: 15 }}>DD Bond</h2>

            {isLoading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CircularProgress size={20} />
                    <Typography>Loading bonds...</Typography>
                </Box>
            )}

            {isError && (
                <Box sx={{ mt: 2 }}>
                    <Typography color="error">Failed to load bonds.</Typography>
                    <Typography variant="body2">{JSON.stringify(error)}</Typography>
                </Box>
            )}

            {!isLoading && !isError && rows.length === 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography>No bonds found for this account.</Typography>
                </Box>
            )}

            {!isLoading && !isError && rows.length > 0 && (
                <DynamicDataTable
                    columns={columns}
                    rows={rows}
                    actions={{
                        view: actions.view,
                        edit: null,
                        delete: null,
                        // if your table supports custom action buttons like download,
                        // pass them through a prop (replace or extend above structure).
                        // Example: extraActions: [{ key: 'download', label: 'Download', onClick: actions.download }]
                    }}
                />
            )}

            {/* quick debug button to re-fetch if needed (optional) */}
            {/* <Button onClick={() => refetch()}>Refetch</Button> */}

        </Box>
    );

};

export default DDBonds;
