// // src/Pages/ddAccount/statement/StatementDetails.jsx
// import React, { useMemo, useState } from "react";
// import { Box, Button, Grid, Paper, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";

// import * as Yup from "yup";
// import PageTopContent from "../../../components/PageTopContent";
// import DynamicForm from "../../../components/DynamicForm";
// import DynamicDataTable from "../../../components/DynamicTable";


// const Container = styled("div")({
//     width: "100%",
//     maxWidth: 1100,
//     margin: "0 auto",
//     padding: "20px 24px",
// });

// const topFormList = [
//     { label: "Member Name", name: "memberName", type: "text", grid: { xs: 12, sm: 6, md: 6 } },
//     { label: "DD Account Number", name: "ddAccountNo", type: "text", grid: { xs: 12, sm: 6, md: 6 } },
// ];

// const rangeFormList = [
//     { label: "From Date", name: "fromDate", type: "date", grid: { xs: 12, sm: 6, md: 6 } },
//     { label: "To Date", name: "toDate", type: "date", grid: { xs: 12, sm: 6, md: 6 } },
// ];

// const validation = Yup.object().shape({
//     memberName: Yup.string().nullable(),
//     ddAccountNo: Yup.string().nullable(),
//     fromDate: Yup.date().nullable(),
//     toDate: Yup.date().nullable(),
// });

// const sampleAccountRow = {
//     accountNo: "23654896544",
//     memberName: "Rahul Sharma",
//     branchName: "Kalkaji Branch, New Delhi",
//     availableBalance: "₹ 25,350",
// };

// const sampleTransactions = [
//     {
//         id: "DD0001",
//         ddNo: "DD0001",
//         accountNo: "23654896544",
//         memberNo: "M0005",
//         memberName: "Aamna Khan",
//         txnType: "Deposit",
//         txnDate: "14-12-2022",
//         txnMode: "Cash",
//         credit: "₹50,000",
//         debit: "-",
//         balance: "₹50,000",
//         status: "Success",
//     },
//     {
//         id: "DD0002",
//         ddNo: "DD0002",
//         accountNo: "23654896544",
//         memberNo: "M0005",
//         memberName: "Rohan Verma",
//         txnType: "Interest",
//         txnDate: "01-01-2023",
//         txnMode: "NEFT/RTGS",
//         credit: "₹45.50",
//         debit: "-",
//         balance: "₹1,00,000",
//         status: "Success",
//     },
//     {
//         id: "DD0003",
//         ddNo: "DD0003",
//         accountNo: "23654896544",
//         memberNo: "M0005",
//         memberName: "Aamna Khan",
//         txnType: "Deposit",
//         txnDate: "20-06-2023",
//         txnMode: "Cheque",
//         credit: "₹5,000",
//         debit: "-",
//         balance: "₹75,000",
//         status: "Success",
//     },
//     // add more sample rows if needed
// ];

// const StatementDetails = () => {
//     const [topValues, setTopValues] = useState({ memberName: "Rahul Sharma", ddAccountNo: "2365896523" });
//     const [rangeValues, setRangeValues] = useState({ fromDate: "2025-09-01", toDate: "2025-09-15" });
//     const [filteredRows, setFilteredRows] = useState(sampleTransactions);

//     const columns = useMemo(
//         () => [
//             { id: "idx", label: "#", minWidth: 40 },
//             { id: "txnDate", label: "Transaction Date", minWidth: 120 },
//             { id: "ddNo", label: "Transaction ID", minWidth: 140 },
//             { id: "accountNo", label: "DD Account No.", minWidth: 140 },
//             { id: "txnType", label: "Transaction Type", minWidth: 120 },
//             { id: "txnDate", label: "Txn. Date", minWidth: 110 },
//             { id: "txnMode", label: "Transaction Mode", minWidth: 120 },
//             { id: "credit", label: "Credit", minWidth: 100 },
//             { id: "debit", label: "Debit", minWidth: 100 },
//             { id: "balance", label: "Balance", minWidth: 110 },
//             { id: "status", label: "Status", minWidth: 80, align: "center" },
//             { id: "actions", label: "Actions", minWidth: 100, align: "right" },
//         ],
//         []
//     );

//     // map transactions to rows for DynamicDataTable
//     const rows = filteredRows.map((r, i) => ({
//         id: r.id,
//         idx: `${i + 1}.`,
//         txnDate: r.txnDate,
//         ddNo: r.id,
//         accountNo: r.accountNo,
//         txnType: r.txnType,
//         txnMode: r.txnMode,
//         credit: r.credit,
//         debit: r.debit,
//         balance: r.balance,
//         status: r.status,
//         actions: "", // actions handled via actions prop
//     }));

//     const handleTopSubmit = (values) => {
//         setTopValues(values);
//     };

//     const handleRangeSubmit = (values) => {
//         setRangeValues(values);
//         // demo filter: here we just keep sample rows; in real app filter by date/account/member
//         // keep simple: if ddAccountNo provided and doesn't match sample account, clear rows
//         if (values.ddAccountNo && !sampleTransactions.some((s) => s.accountNo === values.ddAccountNo)) {
//             setFilteredRows([]);
//         } else {
//             setFilteredRows(sampleTransactions);
//         }
//     };

//     const handleView = (row) => {
//         // placeholder: open transaction detail
//         alert(`view ${row.ddNo}`);
//     };

//     return (
//         <Box sx={{ width: "100%", pb: 6 }}>
//             <Container>
//                 <PageTopContent title="Statement Details" />

//                 {/* top small form */}
//                 <Box sx={{ mt: 2 }}>
//                     <DynamicForm
//                         headerTitle={null}
//                         formList={topFormList}
//                         initialValues={topValues}
//                         validationSchema={validation}
//                         handleSubmit={(values) => handleTopSubmit(values)}
//                         actionButtonText="Show Details"
//                         isLoading={false}
//                         md={6}
//                         width="100%"
//                     />
//                 </Box>

//                 {/* account summary row (table-like) */}
//                 {/* account summary as a single-row dynamic table */}
//                 <Box sx={{ mt: 2 }}>
//                     <DynamicDataTable
//                         columns={[
//                             { id: "accountNo", label: "DD Account No.", minWidth: 180 },
//                             { id: "memberName", label: "Member Name", minWidth: 220 },
//                             { id: "branchName", label: "Branch Name", minWidth: 240 },
//                             { id: "availableBalance", label: "Available Balance (₹)", minWidth: 160, align: "right" },
//                         ]}
//                         rows={[
//                             {
//                                 id: sampleAccountRow.accountNo,
//                                 accountNo: sampleAccountRow.accountNo,
//                                 memberName: sampleAccountRow.memberName,
//                                 branchName: sampleAccountRow.branchName,
//                                 availableBalance: sampleAccountRow.availableBalance,
//                             },
//                         ]}
//                         isLoading={false}
//                     />
//                 </Box>


//                 {/* from-to form and buttons */}
//                 <Box sx={{ mt: 2 }}>
//                     <DynamicForm
//                         headerTitle={null}
//                         formList={rangeFormList}
//                         initialValues={rangeValues}
//                         validationSchema={validation}
//                         handleSubmit={(values) => handleRangeSubmit(values)}
//                         actionButtonText="Show Details"
//                         isLoading={false}
//                         md={6}
//                         width="100%"
//                     />
//                 </Box>

//                 <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
//                     <Button variant="contained" sx={{ background: "#7858C6", color: "#fff" }}>
//                         Print Passbook
//                     </Button>
//                     <Button variant="outlined">Download PDF</Button>
//                 </Box>

//                 {/* account transactions table */}
//                 <Box sx={{ mt: 3 }}>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                         Account Details
//                     </Typography>

//                     <DynamicDataTable
//                         columns={columns}
//                         rows={rows}
//                         isLoading={false}
//                         actions={{ view: handleView }}
//                     />
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default StatementDetails;


// src/Pages/ddAccount/statement/StatementDetails.jsx
import React, { useMemo, useState } from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import GetSavingDetailsByAcnt from "../../../components/GetSavingDetailsByAcnt";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { styled, Box, Typography, CircularProgress } from "@mui/material";
import FormLabel from "../../../components/FormLabel";
import { useGetBankStatementByAccountNumberQuery } from "../../../features/api/savingAccounts";
import { capitalizeFirstLetter } from "../../../helper/helper";

const StatementDetails = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // keep parity with your earlier code: accountNumber from localStorage
    const accountNumber = localStorage.getItem("accountNumber") ?? "";

    // query; hook will handle network state
    const { data, isLoading, isError, error, refetch } = useGetBankStatementByAccountNumberQuery({
        fromDate,
        toDate,
        accountNumber,
    });

    // normalize response - many APIs return { data: { transactions: [...] } } or { data: [...] }
    const bankStatementList = useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.data?.transactions)) return data.data.transactions;
        if (Array.isArray(data?.data)) return data.data;
        // try common keys
        const candidates = ["transactions", "items", "result"];
        for (const c of candidates) {
            if (Array.isArray(data[c])) return data[c];
            if (Array.isArray(data?.data?.[c])) return data.data[c];
        }
        return [];
    }, [data]);

    const columns = useMemo(
        () => [
            { id: "id", label: "#", minWidth: 50 },
            { id: "transactionDate", label: "Transaction Date", minWidth: 140 },
            { id: "transactionID", label: "Transaction ID", minWidth: 160 },
            { id: "transactionType", label: "Transaction Type", minWidth: 140 },
            { id: "remark", label: "Remark", minWidth: 160 },
            { id: "debit", label: "Debit", minWidth: 120, align: "right" },
            { id: "credit", label: "Credit", minWidth: 120, align: "right" },
            { id: "balance", label: "Balance", minWidth: 120, align: "right" },
            { id: "status", label: "Status", minWidth: 100, align: "center" },
        ],
        []
    );

    // stable rows creation - prevents re-render loops and keeps values simple (no table tags, only strings/numbers/React nodes)
    const rows = useMemo(() => {
        if (!Array.isArray(bankStatementList) || bankStatementList.length === 0) return [];

        return bankStatementList.map((curStatement, i) => {
            const txnDate =
                curStatement?.transactionDate ??
                curStatement?.txnDate ??
                curStatement?.date ??
                curStatement?.transaction_date ??
                "-";
            const transactionID =
                curStatement?.transactionId ??
                curStatement?.transactionID ??
                curStatement?.txnId ??
                curStatement?.id ??
                `TXN-${i + 1}`;
            const transactionType =
                capitalizeFirstLetter(curStatement?.transactionType ?? curStatement?.type ?? "-") ?? "-";
            const remark = curStatement?.remark ?? curStatement?.narration ?? "-";

            const numeric = (v) =>
                v !== undefined && v !== null && v !== ""
                    ? `₹ ${Number(v).toLocaleString()}`
                    : "-";

            const debit = numeric(curStatement?.debit ?? curStatement?.amountDebit);
            const credit = numeric(curStatement?.credit ?? curStatement?.amountCredit ?? curStatement?.creditAmount);
            const balance =
                curStatement?.balance !== undefined && curStatement?.balance !== null
                    ? `₹ ${Number(curStatement.balance).toLocaleString()}`
                    : curStatement?.closingBalance
                        ? `₹ ${Number(curStatement.closingBalance).toLocaleString()}`
                        : "-";

            const status = capitalizeFirstLetter(curStatement?.status ?? curStatement?.txnStatus ?? "-");

            return {
                id: i + 1,
                transactionDate: txnDate,
                transactionID,
                transactionType,
                remark,
                debit,
                credit,
                balance,
                status,
                raw: curStatement, // keep raw for debugging if needed
            };
        });
    }, [bankStatementList]);

    // Loading / error / empty handling for UI
    const content = (() => {
        if (isLoading) {
            return (
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mt: 2 }}>
                    <CircularProgress size={18} />
                    <Typography>Loading statement...</Typography>
                </Box>
            );
        }
        if (isError) {
            return (
                <Box sx={{ mt: 2 }}>
                    <Typography color="error">Failed to load statement.</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {error?.error ?? (error ? JSON.stringify(error) : "Unknown error")}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <button onClick={() => refetch()}>Retry</button>
                    </Box>
                </Box>
            );
        }
        if (!rows.length) {
            return (
                <Box sx={{ mt: 2 }}>
                    <Typography>No transactions found for the selected account / date range.</Typography>
                </Box>
            );
        }
        return <DynamicDataTable isLoading={false} rows={rows} columns={columns} />;
    })();

    return (
        <PagesMainContainerStyle>
            <GetSavingDetailsByAcnt
                title="Statement Details"
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                accountNumber={accountNumber}
                setAccountNumber={(val) => {
                    localStorage.setItem("accountNumber", val);
                }}
            />

            {showDetails && (
                <>
                    <FilterByDate>
                        <FormContent>
                            <FormLabel label="From Date" />
                            <input type="date" name="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        </FormContent>

                        <FormContent>
                            <FormLabel label="To Date" />
                            <input type="date" name="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                        </FormContent>
                    </FilterByDate>

                    <PageHeader
                        title="Print Transaction Details"
                        borderBottom="1px solid #DDDDEBBF"
                        extraButtons={[
                            {
                                label: "🖨 Print Passbook",
                                onClick: () => {
                                    // minimal print - you can hook to your print function
                                    const htmlRows = rows
                                        .map(
                                            (r, idx) =>
                                                `<tr>
                          <td style="padding:6px;border:1px solid #ddd">${idx + 1}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.transactionDate}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.transactionID}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.transactionType}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.remark}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.debit}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.credit}</td>
                          <td style="padding:6px;border:1px solid #ddd">${r.balance}</td>
                        </tr>`).join("");
                                    const html = `<html><head><title>Passbook</title><style>table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px}</style></head><body><h3>Passbook</h3><table><thead><tr><th>#</th><th>Date</th><th>Txn ID</th><th>Type</th><th>Remark</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>${htmlRows}</tbody></table><script>window.print()</script></body></html>`;
                                    const w = window.open("", "_blank");
                                    w.document.write(html);
                                    w.document.close();
                                },
                                disabled: isLoading || rows.length === 0,
                            },
                            {
                                label: "⬇  Download PDF",
                                onClick: () => {
                                    // hook your download implementation if available
                                    alert("Download PDF handler not implemented in this simple view.");
                                },
                                disabled: isLoading || rows.length === 0,
                            },
                        ]}
                    />

                    <Box sx={{ mt: 2 }}>{content}</Box>
                </>
            )}
        </PagesMainContainerStyle>
    );
};

export default StatementDetails;

const FilterByDate = styled("div")({
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginTop: 12,
});

const FormContent = styled("div")({
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});
