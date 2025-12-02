// import React, { useMemo } from "react";
// import { Box, Stack, Typography, Button } from "@mui/material";
// import PageTopContent from "../../../../components/PageTopContent";
// import DynamicDataTable from "../../../../components/DynamicTable";
// import PageHeader from "../../../../components/PageHeader";


// const statusColor = {
//     Success: "#1aa251",
//     Pending: "#f09a5c",
//     Rejected: "#e24444",
// };

// const ViewTransactionDetails = () => {
//     const columns = useMemo(
//         () => [
//             { id: "index", label: "#", minWidth: 40 },
//             { id: "transactionDate", label: "Transaction Date", minWidth: 140 },
//             { id: "transactionId", label: "Transaction ID", minWidth: 140 },
//             { id: "accountNo", label: "DD Account No.", minWidth: 140 },
//             { id: "installmentNo", label: "Installment No", minWidth: 100, align: "center" },
//             { id: "txnType", label: "Txn Type", minWidth: 110 },
//             { id: "credit", label: "Credit", minWidth: 100, align: "right" },
//             { id: "debit", label: "Debit", minWidth: 100, align: "right" },
//             { id: "balance", label: "Balance", minWidth: 120, align: "right" },
//             { id: "paymentMode", label: "Payment Mode", minWidth: 120 },
//             { id: "remark", label: "Remark", minWidth: 160 },
//             { id: "status", label: "Status", minWidth: 100, align: "center" },
//         ],
//         []
//     );

//     const rows = useMemo(
//         () =>
//             [
//                 {
//                     index: 1,
//                     transactionDate: "12-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 12,
//                     txnType: "Deposit",
//                     credit: "₹5,000",
//                     debit: "-",
//                     balance: "₹70,650",
//                     paymentMode: "Cash",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 2,
//                     transactionDate: "11-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 1,
//                     txnType: "Deposit",
//                     credit: "₹10,000",
//                     debit: "-",
//                     balance: "₹75,650",
//                     paymentMode: "NEFT/RTGS",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 3,
//                     transactionDate: "08-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 11,
//                     txnType: "Interest",
//                     credit: "₹1,237",
//                     debit: "-",
//                     balance: "₹25,650",
//                     paymentMode: "UPI",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 4,
//                     transactionDate: "05-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 6,
//                     txnType: "Deposit",
//                     credit: "₹5,000",
//                     debit: "-",
//                     balance: "₹28,150",
//                     paymentMode: "NEFT/RTGS",
//                     remark: "Daily Deposit",
//                     statusText: "Pending",
//                 },
//                 {
//                     index: 5,
//                     transactionDate: "12-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 6,
//                     txnType: "Penalty",
//                     credit: "-",
//                     debit: "₹537",
//                     balance: "₹70,650",
//                     paymentMode: "Online",
//                     remark: "Late instalment penalty",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 6,
//                     transactionDate: "11-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 12,
//                     txnType: "Deposit",
//                     credit: "₹5,000",
//                     debit: "-",
//                     balance: "₹75,650",
//                     paymentMode: "Cash",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 7,
//                     transactionDate: "08-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 1,
//                     txnType: "Deposit",
//                     credit: "₹10,000",
//                     debit: "-",
//                     balance: "₹25,650",
//                     paymentMode: "NEFT/RTGS",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 8,
//                     transactionDate: "05-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 11,
//                     txnType: "Interest",
//                     credit: "₹1,237",
//                     debit: "-",
//                     balance: "₹28,150",
//                     paymentMode: "UPI",
//                     remark: "Daily Deposit",
//                     statusText: "Rejected",
//                 },
//                 {
//                     index: 9,
//                     transactionDate: "08-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 6,
//                     txnType: "Deposit",
//                     credit: "₹5,000",
//                     debit: "-",
//                     balance: "₹25,650",
//                     paymentMode: "NEFT/RTGS",
//                     remark: "Daily Deposit",
//                     statusText: "Success",
//                 },
//                 {
//                     index: 10,
//                     transactionDate: "05-Sep-2025",
//                     transactionId: "DD-20251008",
//                     accountNo: "DD10001234",
//                     installmentNo: 6,
//                     txnType: "Penalty",
//                     credit: "-",
//                     debit: "₹537",
//                     balance: "₹28,150",
//                     paymentMode: "Online",
//                     remark: "Late instalment penalty",
//                     statusText: "Pending",
//                 },
//             ].map((r) => ({
//                 ...r,
//                 status: (
//                     <Typography sx={{ color: statusColor[r.statusText] || "#666", fontWeight: 600 }}>
//                         {r.statusText}
//                     </Typography>
//                 ),
//             })),
//         [],
//         []
//     );

//     return (
//         <Box sx={{ width: "100%" }}>
//             {/* <PageTopContent title="Transaction Details" /> */}
//             <PageHeader title="Transaction Details" onDownload onFilter />

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
//             </Box>

//             <DynamicDataTable columns={columns} rows={rows} pagination />

//         </Box>
//     );
// };

// export default ViewTransactionDetails;


// src/pages/.../ViewTransactionDetails.jsx
import React, { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import PageLoader from "../../../../components/PageLoader";
import { useGetTransactionsQuery } from "../../../../features/api/ddAccountsApi";

const statusColor = {
    Success: "#1aa251",
    Pending: "#f09a5c",
    Rejected: "#e24444",
};

const ViewTransactionDetails = () => {
    const { id } = useParams(); // expects route like /dd-accounts/:id/transactions or similar

    // call API (id comes from route). If id is missing you'll get empty list.
    const { data, isLoading, isError, refetch } = useGetTransactionsQuery(id, {
        skip: !id, // don't call API if no id
    });

    // normalize server payload: support { data: [...] } or raw array
    const txns = data?.data ?? data ?? [];

    const columns = useMemo(
        () => [
            { id: "index", label: "#", minWidth: 40 },
            { id: "transactionDate", label: "Transaction Date", minWidth: 140 },
            { id: "transactionId", label: "Transaction ID", minWidth: 140 },
            { id: "accountNo", label: "DD Account No.", minWidth: 140 },
            { id: "installmentNo", label: "Installment No", minWidth: 100, align: "center" },
            { id: "txnType", label: "Txn Type", minWidth: 110 },
            { id: "credit", label: "Credit", minWidth: 100, align: "right" },
            { id: "debit", label: "Debit", minWidth: 100, align: "right" },
            { id: "balance", label: "Balance", minWidth: 120, align: "right" },
            { id: "paymentMode", label: "Payment Mode", minWidth: 120 },
            { id: "remark", label: "Remark", minWidth: 160 },
            { id: "status", label: "Status", minWidth: 100, align: "center" },
        ],
        []
    );

    // map server transactions to table rows
    const rows = useMemo(() => {
        if (!Array.isArray(txns)) return [];

        return txns.map((t, i) => {
            // adapt keys to your backend shape, with sensible fallbacks
            const txnDate = t.transactionDate ?? t.createdAt ?? t.date ?? "-";
            const txnId = t.transactionId ?? t.txnId ?? t.id ?? "-";
            const accountNo = t.accountNumber ?? t.accountNo ?? t.ddAccountNo ?? "-";
            const installmentNo = t.installmentNo ?? t.installmentNumber ?? "-";
            const txnType = t.type ?? t.txnType ?? t.transactionType ?? "-";

            const formatAmount = (val) => {
                if (val === null || typeof val === "undefined" || val === "") return "-";
                // if string like "10000.00", convert to number then format
                const num = Number(String(val).replace(/,/g, ""));
                if (Number.isFinite(num)) return `₹${num.toLocaleString("en-IN")}`;
                return String(val);
            };

            const credit = formatAmount(t.credit ?? t.creditAmount ?? t.credit_amt);
            const debit = formatAmount(t.debit ?? t.debitAmount ?? t.debit_amt);
            const balance = formatAmount(t.balance ?? t.currentBalance ?? t.closingBalance);

            const paymentMode = t.paymentMode ?? t.mode ?? "-";
            const remark = t.remark ?? t.narration ?? t.note ?? "-";

            const statusText = t.status ?? t.statusText ?? (t.success ? "Success" : "Pending");

            return {
                index: i + 1,
                transactionDate: txnDate,
                transactionId: txnId,
                accountNo,
                installmentNo,
                txnType,
                credit,
                debit,
                balance,
                paymentMode,
                remark,
                status: (
                    <Typography sx={{ color: statusColor[statusText] || "#666", fontWeight: 600 }}>
                        {statusText}
                    </Typography>
                ),
            };
        });
    }, [txns]);

    return (
        <Box sx={{ width: "100%" }}>
            <PageHeader title="Transaction Details" onDownload onFilter />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
                {/* optionally add buttons here */}
            </Box>

            {isLoading ? (
                <PageLoader />
            ) : isError ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography color="error" mb={2}>
                        Failed to load transactions.
                    </Typography>
                    <Button variant="contained" onClick={() => refetch()}>
                        Retry
                    </Button>
                </Box>
            ) : (
                <DynamicDataTable columns={columns} rows={rows} pagination />
            )}
        </Box>
    );
};

export default ViewTransactionDetails;
