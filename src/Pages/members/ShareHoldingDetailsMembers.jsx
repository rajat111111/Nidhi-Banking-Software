// import { Grid, styled } from "@mui/material";
// import { useState } from "react";
// import PageTopContent from "../../components/PageTopContent";
// import GroupOfButton from "../../components/GroupOfButton";
// import DynamicDataTable from "../../components/DynamicTable";
// import AddNewShareHolding from "./AddNewShareHolding";
// import ManualShareAllocation from "./ManualShareAllocation";
// import UnallottedShares from "./UnallottedShares";
// import ManualShareTransfer from "./ManualShareTransfer";



// const ShareHoldingDetailsMembers = () => {

//     const [activeTab, setActiveTab] = useState("shareHoldings");

//     const columns = [
//         { id: "member", label: "Member", minWidth: 120 },
//         { id: "shareRange", label: "Share Range", minWidth: 140 },
//         { id: "totalShareHeld", label: "Total Share Held", minWidth: 130 },
//         { id: "nominalVal", label: "Nominal Val", minWidth: 100 },
//         { id: "totalShareVal", label: "Total Share Val", minWidth: 130 },
//         { id: "allotmentDate", label: "Allotment Date", minWidth: 140 },
//         { id: "transferDate", label: "Transfer Date", minWidth: 130 },
//         { id: "folioNumber", label: "Folio Number", minWidth: 140 },
//         { id: "certNumber", label: "Cert Number", minWidth: 140 },
//         { id: "surrendered", label: "Surrendered", minWidth: 100 },
//         { id: "status", label: "Status", minWidth: 80, align: "center" },
//         { id: "actions", label: "Actions", minWidth: 220, align: "right" },
//     ];

//     const rows = [
//         {
//             id: 1,
//             member: "Taxhint Advisor",
//             shareRange: "40011 - 40020",
//             totalShareHeld: 1,
//             nominalVal: 10,
//             totalShareVal: 10,
//             allotmentDate: "31 March 2024",
//             transferDate: "09 April 2025",
//             folioNumber: "2563256",
//             certNumber: "0012562",
//             surrendered: "No",
//             statusText: "Pending",
//         },
//         {
//             id: 2,
//             member: "Mr. Kitzo Tech",
//             shareRange: "40001 - 40010",
//             totalShareHeld: 10,
//             nominalVal: 10,
//             totalShareVal: 100,
//             allotmentDate: "09 April 2024",
//             transferDate: "13 April 2025",
//             folioNumber: "2563256",
//             certNumber: "0012256",
//             surrendered: "No",
//             statusText: "Pending",
//         },

//     ];

//     const buttonsList = [
//         {
//             title: "Share Holdings",
//             onClick: () => setActiveTab("shareHoldings"),
//             color: activeTab === "shareHoldings" ? "#F68712" : "#7858C6",
//         },
//         {
//             title: "Add New",
//             onClick: () => setActiveTab("AddNew"),
//             color: activeTab === "shareHoldings" ? "#F68712" : "#7858C6",
//         },
//         {
//             title: "Manual Share Allocation",
//             onClick: () => setActiveTab("manualAllocation"),
//             color: activeTab === "manualAllocation" ? "#F68712" : "#7858C6",
//         },
//         {
//             title: "Unallotted Shares",
//             onClick: () => setActiveTab("unallotted"),
//             color: activeTab === "unallotted" ? "#F68712" : "#7858C6",
//         },
//         {
//             title: "Manual Share Transfer",
//             onClick: () => setActiveTab("manualTransfer"),
//             color: activeTab === "manualTransfer" ? "#F68712" : "#7858C6",
//         },

//     ];

//     return (
//         <ShareHoldingMainContainer>
//             <PageTopContent title="Share Holding Details" />
//             <GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

//             <DynamicDataTable columns={columns} rows={rows} pagination />


//             {/* Conditional rendering of each section */}
//             {activeTab === "AddNew" && <AddNewShareHolding />}
//             {activeTab === "manualAllocation" && <ManualShareAllocation />}
//             {activeTab === "unallotted" && <UnallottedShares />}
//             {activeTab === "manualTransfer" && <ManualShareTransfer />}

//         </ShareHoldingMainContainer>
//     );
// };

// export default ShareHoldingDetailsMembers;

// const ShareHoldingMainContainer = styled("div")({
//     width: "100%",
//     height: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
// });


import { Grid, styled } from "@mui/material";
import { useState } from "react";
import PageTopContent from "../../components/PageTopContent";
import GroupOfButton from "../../components/GroupOfButton";
import DynamicDataTable from "../../components/DynamicTable";
import AddNewShareHolding from "./AddNewShareHolding";
import ManualShareAllocation from "./ManualShareAllocation";
import UnallottedShares from "./UnallottedShares";
import ManualShareTransfer from "./ManualShareTransfer";

const ShareHoldingDetailsMembers = () => {
    const [activeTab, setActiveTab] = useState("shareHoldings");

    const columns = [
        { id: "member", label: "Member", minWidth: 120 },
        { id: "shareRange", label: "Share Range", minWidth: 140 },
        { id: "totalShareHeld", label: "Total Share Held", minWidth: 130 },
        { id: "nominalVal", label: "Nominal Val", minWidth: 100 },
        { id: "totalShareVal", label: "Total Share Val", minWidth: 130 },
        { id: "allotmentDate", label: "Allotment Date", minWidth: 140 },
        { id: "transferDate", label: "Transfer Date", minWidth: 130 },
        { id: "folioNumber", label: "Folio Number", minWidth: 140 },
        { id: "certNumber", label: "Cert Number", minWidth: 140 },
        { id: "surrendered", label: "Surrendered", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 80, align: "center" },
        { id: "actions", label: "Actions", minWidth: 220, align: "right" },
    ];

    const rows = [
        {
            id: 1,
            member: "Taxhint Advisor",
            shareRange: "40011 - 40020",
            totalShareHeld: 1,
            nominalVal: 10,
            totalShareVal: 10,
            allotmentDate: "31 March 2024",
            transferDate: "09 April 2025",
            folioNumber: "2563256",
            certNumber: "0012562",
            surrendered: "No",
            statusText: "Pending",
        },
        {
            id: 2,
            member: "Mr. Kitzo Tech",
            shareRange: "40001 - 40010",
            totalShareHeld: 10,
            nominalVal: 10,
            totalShareVal: 100,
            allotmentDate: "09 April 2024",
            transferDate: "13 April 2025",
            folioNumber: "2563256",
            certNumber: "0012256",
            surrendered: "No",
            statusText: "Pending",
        },
    ];

    const buttonsList = [
        {
            title: "Share Holdings",
            onClick: () => setActiveTab("shareHoldings"),
            color: activeTab === "shareHoldings" ? "#F68712" : "#7858C6",
        },
        {
            title: "Add New",
            onClick: () => setActiveTab("AddNew"),
            color: activeTab === "AddNew" ? "#F68712" : "#7858C6",
        },
        {
            title: "Manual Share Allocation",
            onClick: () => setActiveTab("manualAllocation"),
            color: activeTab === "manualAllocation" ? "#F68712" : "#7858C6",
        },
        {
            title: "Unallotted Shares",
            onClick: () => setActiveTab("unallotted"),
            color: activeTab === "unallotted" ? "#F68712" : "#7858C6",
        },
        {
            title: "Manual Share Transfer",
            onClick: () => setActiveTab("manualTransfer"),
            color: activeTab === "manualTransfer" ? "#F68712" : "#7858C6",
        },
    ];

    return (
        <ShareHoldingMainContainer>

            <GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

            {/* show table only for Share Holdings tab */}
            {activeTab === "shareHoldings" && (
                <>
                    <PageTopContent title="Share Holding Details" />
                    <DynamicDataTable columns={columns} rows={rows} pagination />
                </>
            )}

            {/* Conditional rendering of each section (no table for these) */}
            {activeTab === "AddNew" && <AddNewShareHolding />}
            {activeTab === "manualAllocation" && <ManualShareAllocation />}
            {activeTab === "unallotted" && <UnallottedShares />}
            {activeTab === "manualTransfer" && <ManualShareTransfer />}
        </ShareHoldingMainContainer>
    );
};

export default ShareHoldingDetailsMembers;

const ShareHoldingMainContainer = styled("div")({
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
});
