// // src/Pages/savingAccounts/accounts/nominee/NomineeList.jsx
// import React from "react";
// import { Box } from "@mui/material";
// import PageTopContent from "../../../../components/PageTopContent";
// import DynamicDataTable from "../../../../components/DynamicTable";
// import DynamicButton from "../../../../components/DynamicButton";
// import { useNavigate } from "react-router-dom";

// const NomineeDetails = () => {
//     const navigate = useNavigate();

//     const columns = [
//         { id: "id", label: "#", minWidth: 50 },
//         { id: "nomineeName", label: "Nominee Name", minWidth: 180 },
//         { id: "relation", label: "Relation", minWidth: 120 },
//         { id: "mobileNumber", label: "Mobile Number", minWidth: 140 },
//         { id: "aadharNumber", label: "Aadhar Number", minWidth: 160 },
//         { id: "panNumber", label: "Pan Number", minWidth: 140 },
//         { id: "voterId", label: "Voter ID", minWidth: 140 },
//         { id: "rationCard", label: "Ration Card", minWidth: 140 },
//         { id: "address", label: "Address", minWidth: 260 },
//         { id: "action", label: "Action", minWidth: 160, align: "right" },
//     ];

//     // static sample rows (replace with API data if available)
//     const rows = [
//         {
//             id: 1,
//             nomineeName: "Rakesh Sharma",
//             relation: "Brother",
//             mobileNumber: "+91 9995861456",
//             aadharNumber: "1235 5645 3214",
//             panNumber: "BPNPK2560R",
//             voterId: "-",
//             rationCard: "AP23654783",
//             address: "-",
//             memberId: 12, // used for routing to update page
//         },
//     ].map((r) => ({
//         ...r,
//         action: (
//             <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
//                 <DynamicButton
//                     variant="outlined"
//                     text="View"
//                     onClick={() => navigate(`/saving-accounts/${r.memberId}/nominee/${r.id}`)}
//                 />
//                 <DynamicButton
//                     variant="outlined"
//                     text="Edit"
//                     onClick={() => navigate(`/${r.memberId}/dd-accounts/update-nominee/${r.id}`)}
//                 />
//                 <DynamicButton
//                     variant="outlined"
//                     text="Delete"
//                     textColor="#D32F2F"
//                     borderColor="#D32F2F"
//                     onClick={() => {
//                         // implement delete handler or call API
//                         // placeholder:
//                         // window.confirm and then call API
//                         if (window.confirm(`Delete nominee ${r.nomineeName}?`)) {
//                             // call delete API
//                         }
//                     }}
//                 />
//             </div>
//         ),
//     }));

//     return (
//         <Box sx={{ width: "100%" }}>
//             <PageTopContent title="Nominee Details" />
//             <Box sx={{ mt: 2 }}>
//                 <DynamicDataTable columns={columns} rows={rows} pagination />
//             </Box>
//         </Box>
//     );
// };

// export default NomineeDetails;

// src/Pages/ddAccount/nominee/NomineeList.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import PageTopContent from "../../../../components/PageTopContent";
import DynamicDataTable from "../../../../components/DynamicTable";
import DynamicButton from "../../../../components/DynamicButton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDdNomineesQuery } from "../../../../features/api/ddAccountsApi";


const NomineeDetails = () => {
    const navigate = useNavigate();
    const { id: accountId } = useParams(); // expects route like /dd-accounts/:id/nominee
    const { data, isLoading, isError } = useGetDdNomineesQuery(accountId, {
        skip: !accountId,
    });

    const nominees = data?.data ?? data ?? [];

    const columns = [
        { id: "id", label: "#", minWidth: 50 },
        { id: "nomineeName", label: "Nominee Name", minWidth: 180 },
        { id: "relation", label: "Relation", minWidth: 120 },
        { id: "mobileNumber", label: "Mobile Number", minWidth: 140 },
        { id: "aadharNumber", label: "Aadhar Number", minWidth: 160 },
        { id: "panNumber", label: "Pan Number", minWidth: 140 },
        { id: "voterId", label: "Voter ID", minWidth: 140 },
        { id: "rationCard", label: "Ration Card", minWidth: 140 },
        { id: "address", label: "Address", minWidth: 260 },
        { id: "action", label: "Action", minWidth: 160, align: "right" },
    ];

    const rows = (Array.isArray(nominees) ? nominees : []).map((n, idx) => {
        // adapt to API fields with safe fallbacks
        const nomineeName = n.name || n.nomineeName || `${n.firstName || ""} ${n.lastName || ""}`.trim() || "-";
        const relation = n.relation || n.relationship || "-";
        const mobileNumber = n.mobileNumber || n.phone || n.mobile || "-";
        const aadharNumber = n.aadharNumber || n.aadhar || "-";
        const panNumber = n.panNumber || n.pan || "-";
        const voterId = n.voterId || n.voter || "-";
        const rationCard = n.rationCard || n.ration || "-";
        const address = n.address || n.addressLine || "-";
        const nomineeId = n.id || idx + 1;

        return {
            id: idx + 1,
            nomineeName,
            relation,
            mobileNumber,
            aadharNumber,
            panNumber,
            voterId,
            rationCard,
            address,
            action: (
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <DynamicButton
                        variant="outlined"
                        text="View"
                        onClick={() => navigate(`/dd-accounts/${accountId}/nominee/view/${nomineeId}`)}
                    />
                    <DynamicButton
                        variant="outlined"
                        text="Edit"
                        onClick={() => navigate(`/dd-accounts/${accountId}/nominee/edit/${nomineeId}`)}
                    />
                    <DynamicButton
                        variant="outlined"
                        text="Delete"
                        textColor="#D32F2F"
                        borderColor="#D32F2F"
                        onClick={() => {
                            if (window.confirm(`Delete nominee ${nomineeName}?`)) {
                                // call delete API in your app (not implemented here)
                            }
                        }}
                    />
                </div>
            ),
        };
    });

    return (
        <Box sx={{ width: "100%" }}>
            <PageTopContent title="Nominee Details" />
            {isError && <Typography color="error" sx={{ mt: 2 }}>Failed to load nominee details.</Typography>}
            <Box sx={{ mt: 2 }}>
                <DynamicDataTable columns={columns} rows={rows} isLoading={isLoading} pagination />
            </Box>
        </Box>
    );
};

export default NomineeDetails;
