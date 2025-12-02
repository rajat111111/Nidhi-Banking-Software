

// import React from "react";
// import { styled } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import DynamicButton from "../../../components/DynamicButton";
// import PageHeader from "../../../components/PageHeader";
// import DynamicDataTable from "../../../components/DynamicTable";

// // Action button wrapper
// const ActionButtonContainer = styled("div")({
//     display: "flex",
//     gap: "10px",
//     alignItems: "center",
// });


// const STATIC_DD_ACCOUNTS = [
//     {
//         id: 4,
//         member: {
//             id: 1,
//             firstName: "satyam",
//             lastName: "kumar",
//             createdAt: "2025-10-24T11:03:29.701Z",
//         },
//         branch: { id: 1, name: "Bank of India Main Branch" },
//         agent: { id: 1, name: "Ravi kumar" },
//         amount: "15000.00",
//         paymentMode: "cash",
//         status: "pending",
//         createdAt: "2025-11-10T06:47:48.565Z",
//         accountNumber: null,
//     },
//     {
//         id: 7,
//         member: { id: 3, firstName: "Sanu", lastName: "Kumar", createdAt: "2025-11-01T11:56:58.179Z" },
//         branch: { id: 1, name: "Bank of India Main Branch" },
//         agent: { id: 1, name: "Ravi kumar" },
//         amount: "10000.00",
//         paymentMode: "cash",
//         status: "approved",
//         createdAt: "2025-11-10T06:59:07.880Z",
//         accountNumber: "DD1762937367659",
//     },
//     {
//         id: 8,
//         member: { id: 2, firstName: "satyam", lastName: "kumar", createdAt: "2025-10-24T11:25:56.707Z" },
//         branch: { id: 1, name: "Bank of India Main Branch" },
//         agent: { id: 1, name: "Ravi kumar" },
//         amount: "10000.00",
//         paymentMode: "cash",
//         status: "pending",
//         createdAt: "2025-11-13T05:27:49.890Z",
//         accountNumber: null,
//     },
//     {
//         id: 9,
//         member: { id: 2, firstName: "satyam", lastName: "kumar", createdAt: "2025-10-24T11:25:56.707Z" },
//         branch: { id: 1, name: "Bank of India Main Branch" },
//         agent: { id: 1, name: "Ravi kumar" },
//         amount: "10000.00",
//         paymentMode: "cash",
//         status: "pending",
//         createdAt: "2025-11-13T05:27:51.782Z",
//         accountNumber: null,
//     },
//     {
//         id: 10,
//         member: { id: 2, firstName: "satyam", lastName: "kumar", createdAt: "2025-10-24T11:25:56.707Z" },
//         branch: { id: 1, name: "Bank of India Main Branch" },
//         agent: { id: 1, name: "Ravi kumar" },
//         amount: "10000.00",
//         paymentMode: "cash",
//         status: "pending",
//         createdAt: "2025-11-13T05:32:07.889Z",
//         accountNumber: null,
//     },
// ];

// const AccountDetails = () => {
//     // Use static array instead of fetching
//     const ddAccounts = STATIC_DD_ACCOUNTS;

//     // Table columns
//     const columns = [
//         { id: "id", label: "#", minWidth: 50 },
//         { id: "ddAccountNo", label: "DD A/c No", minWidth: 150 },
//         { id: "memberNo", label: "Member No", minWidth: 120 },
//         { id: "memberName", label: "Member Name", minWidth: 150 },
//         { id: "accountType", label: "Account Type", minWidth: 130 },
//         { id: "branch", label: "Branch", minWidth: 150 },
//         { id: "agentName", label: "Agent Name", minWidth: 130 },
//         { id: "amount", label: "Amount", minWidth: 100 },
//         { id: "paymentMode", label: "Pay Mode", minWidth: 100 },
//         { id: "status", label: "Status", minWidth: 100 },
//         { id: "openDate", label: "Open Date", minWidth: 150 },
//         { id: "action", label: "Actions", minWidth: 150 },
//     ];

//     // Map static data -> rows
//     const rows = ddAccounts.map((item, index) => {
//         const member = item.member || {};
//         const branch = item.branch || {};
//         const agent = item.agent || {};

//         return {
//             id: index + 1,
//             ddAccountNo: item.accountNumber ?? `DD${item.id}`,
//             memberNo: member.id ?? item.memberId ?? "-",
//             memberName: `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim() || "-",
//             accountType: item.accountType ?? member.accountType ?? "-",
//             branch: branch.name ?? "-",
//             agentName: agent.name ?? "-",
//             amount: item.amount ? `₹${item.amount}` : "-",
//             paymentMode: item.paymentMode ?? "-",
//             status: item.status ?? "-",
//             openDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
//             action: (
//                 <ActionButtonContainer>
//                     <DynamicButton
//                         text="View"
//                         variant="outlined"
//                         textColor="#0D6A84"
//                         borderColor="#0D6A84"
//                         borderRadius="5px"
//                         component={NavLink}
//                         to={`/dd-accounts/${encodeURIComponent(item.id ?? "")}/account-detailsDD`}
//                     />
//                 </ActionButtonContainer>
//             ),
//         };
//     });

//     return (
//         <>
//             <PageHeader
//                 title="Account Details"
//                 onDownload
//                 onFilter
//                 primaryButton={{
//                     label: "Add New",
//                     variant: "contained",
//                     component: NavLink,
//                     to: "/dd-accounts/add-new-account",
//                     color: "secondary",
//                 }}
//             />

//             {/* No network load — pass false so table won't show loading */}
//             <DynamicDataTable isLoading={false} rows={rows} columns={columns} />
//         </>
//     );
// };

// export default AccountDetails;


import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import DynamicButton from "../../../components/DynamicButton";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { useGetDdAccountsWithoutPendingQuery } from "../../../features/api/ddAccountsApi";

const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
});

const AccountDetails = () => {
    // call the API (no arg needed since endpoint uses /dd-account/all)
    const { data, isLoading, isFetching, isError, refetch } = useGetDdAccountsWithoutPendingQuery();
    console.log(data)
    // normalise response: handles { data: [...] } or raw array
    const ddAccounts = data?.data ?? data ?? [];

    // local rows state to keep DynamicDataTable props stable
    const [rows, setRows] = useState([]);

    // track whether the initial load finished (success or error)
    const [firstLoadDone, setFirstLoadDone] = useState(false);

    // table column def
    const columns = [
        { id: "id", label: "#", minWidth: 50 },
        { id: "ddAccountNo", label: "DD A/c No", minWidth: 150 },
        { id: "memberNo", label: "Member No", minWidth: 120 },
        { id: "memberName", label: "Member Name", minWidth: 150 },
        { id: "accountType", label: "Account Type", minWidth: 130 },
        { id: "branch", label: "Branch", minWidth: 150 },
        { id: "agentName", label: "Agent Name", minWidth: 130 },
        { id: "amount", label: "Amount", minWidth: 100 },
        { id: "paymentMode", label: "Pay Mode", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
        { id: "openDate", label: "Open Date", minWidth: 150 },
        { id: "action", label: "Actions", minWidth: 150 },
    ];

    // debug
    useEffect(() => {
        console.log("ddAccounts API:", { data, isLoading, isFetching, isError });
    }, [data, isLoading, isFetching, isError]);

    // map API -> rows whenever ddAccounts changes
    useEffect(() => {
        if (!Array.isArray(ddAccounts) || ddAccounts.length === 0) {
            setRows([]);
            return;
        }

        const mapped = ddAccounts.map((item, index) => {
            const member = item.member ?? {};
            const branch = item.branch ?? {};
            const agent = item.agent ?? {};

            return {
                id: index + 1,
                ddAccountNo: item.accountNumber ?? `DD${item.id ?? index + 1}`,
                memberNo: item.id ?? item.memberId ?? "-",
                memberName: `${item.memberName ?? ""} ${member.lastName ?? ""}`.trim() || "-",
                accountType: item.accountType ?? member.accountType ?? "-",
                branch: item.branchName ?? "-",
                agentName: item.agentName ?? "-",
                amount: item.amount ? `₹${item.amount}` : "-",
                paymentMode: item.paymentMode ?? item.payMode ?? "-",
                status: item.status ?? "-",
                openDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
                action: (
                    <ActionButtonContainer>
                        <DynamicButton
                            text="View"
                            variant="outlined"
                            textColor="#0D6A84"
                            borderColor="#0D6A84"
                            borderRadius="5px"
                            component={NavLink}
                            to={`/dd-accounts/${encodeURIComponent(item.id ?? "")}/account-detailsDD`}
                        />
                    </ActionButtonContainer>
                ),
            };
        });
        setRows(mapped);
    }, [ddAccounts]);

    // mark first load done when data arrives or when there is an error
    useEffect(() => {
        if (!firstLoadDone && Array.isArray(ddAccounts) && ddAccounts.length > 0) {
            setFirstLoadDone(true);
        }
        if (!firstLoadDone && isError) {
            setFirstLoadDone(true);
        }
    }, [ddAccounts, isError, firstLoadDone]);

    // show loader only during initial load (not on background refetch)
    const showLoading = !firstLoadDone && isLoading;

    return (
        <>
            <PageHeader
                title="Account Details"
                onDownload
                onFilter
                primaryButton={{
                    label: "Add New",
                    variant: "contained",
                    component: NavLink,
                    to: "/dd-accounts/add-new-account",
                    color: "secondary",
                }}
            />
            <DynamicDataTable isLoading={showLoading} rows={rows} columns={columns} />
            {isError && (
                <div style={{ color: "red", marginTop: 12 }}>
                    Failed to load account details.{" "}
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => refetch()}
                        style={{ marginLeft: 8 }}
                    >
                        Retry
                    </Button>
                </div>
            )}
        </>
    );
};

export default AccountDetails;
