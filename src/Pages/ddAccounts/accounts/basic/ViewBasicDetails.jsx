
// import React from "react";
// import { Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import PageTopContent from "../../../../components/PageTopContent";
// import InformationPage from "../../../../components/InformationPage";
// import { useParams } from "react-router-dom";
// import { useGetDdAccountByIdQuery } from "../../../../features/api/ddAccountsApi";

// const Container = styled("div")({
//     width: "100%",
//     maxWidth: 1100,
//     margin: "0 auto",
//     padding: "20px 24px",
// });

// const ViewBasicDetails = () => {
//     // STATIC DATA (Replace later when API is ready)
//     const { id } = useParams();
//     const { data, isLoading, isError, refetch } = useGetDdAccountByIdQuery(id);
//     console.log(data)

//     const reference = "Rahul Sharma";
//     const memberNo = "12366445";
//     const agentName = "Rajesh Mehta";
//     const ddAmount = "₹150.00";
//     const openDate = "23 March 2024";
//     const interestRate = "9.0%";
//     const maturityDate = "14 Dec 2026";
//     const status = "Active";
//     const senior = "YES";
//     const approvedBy = "Rahul Sharma";
//     const approvedDate = "20 March 2024";

//     const ddAccountNumber = "1236589654123";
//     const branchName = "Nehru Place";
//     const plan = "FD Plan A";
//     const paymentMode = "Cash";
//     const maturityAmount = "₹150000.00";
//     const balance = "₹150000.00";
//     const interestPayout = "Cumulative yearly";
//     const tds = "YES";
//     const autoRenewal = "YES";
//     const address = "Flat No. 12B, Shanti Apartments, Andheri East Mumbai, MH – India";

//     const key1 = [
//         "Member",
//         "Member No.",
//         "Agent Name",
//         "DD Amount",
//         "Open Date",
//         "Annual Interest Rate",
//         "Maturity Date",
//         "Status",
//         "Senior Citizen",
//         "Approved By",
//         "Approved Date",
//     ];

//     const pair1 = [
//         reference,
//         memberNo,
//         agentName,
//         ddAmount,
//         openDate,
//         interestRate,
//         maturityDate,
//         status,
//         senior,
//         approvedBy,
//         approvedDate,
//     ];

//     const key2 = [
//         "DD Account Number",
//         "Branch Name",
//         "Plan",
//         "Payment Mode",
//         "Maturity Amount",
//         "Balance",
//         "Interest Payout",
//         "TDS Deduction",
//         "Auto Renewal",
//         "Address",
//     ];

//     const pair2 = [
//         ddAccountNumber,
//         branchName,
//         plan,
//         paymentMode,
//         maturityAmount,
//         balance,
//         interestPayout,
//         tds,
//         autoRenewal,
//         address,
//     ];

//     return (
//         <Box sx={{ width: "100%", pb: 6 }}>
//             <Container>
//                 <PageTopContent title="Basic Details" />
//                 <Box sx={{ mt: 2, p: 3, bgcolor: "#F2F3F6BF", borderRadius: 1 }}>
//                     <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default ViewBasicDetails;


import React from "react";
import InformationPage from "../../../../components/InformationPage";

import { useParams } from "react-router-dom";
import PageLoader from "../../../../components/PageLoader";
import { capitalizeFirstLetter } from "../../../../helper/helper";
import { useGetDdAccountByIdQuery } from "../../../../features/api/ddAccountsApi";

const ViewBasicDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError, refetch } = useGetDdAccountByIdQuery(id);

    // normalize server response (supports { data: {...} } or raw object)
    const basicDetails = data?.data ?? data ?? {};

    // Try to pull sensible fields from the payload (use fallbacks)
    const memberObj = basicDetails.member ?? {};
    const memberName = (
        basicDetails.memberName ||
        `${memberObj.firstName ?? ""} ${memberObj.lastName ?? ""}`.trim()
    ) || "N/A";



    const accountNumber = basicDetails.accountNumber ?? basicDetails.ddAccountNo ?? "N/A";
    const accountType = basicDetails.accountType ?? memberObj.accountType ?? "N/A";

    // principalAmount: payload has `amount` or `totalDeposited`/`balance` etc. choose amount first
    const principalAmount = basicDetails.amount ?? basicDetails.principalAmount ?? basicDetails.totalDeposited ?? basicDetails.balance ?? 0;

    const openDate = basicDetails.openDate ?? basicDetails.createdAt ?? memberObj.createdAt ?? "N/A";
    const status = basicDetails.status ?? "N/A";
    const balance = basicDetails.balance ?? basicDetails.totalDeposited ?? "0.00";
    const nomineeRelation = basicDetails.nomineeRelation ?? (basicDetails.nominees && basicDetails.nominees[0]?.relation) ?? "N/A";
    const onHold = typeof basicDetails.onHold !== "undefined" ? basicDetails.onHold : basicDetails.on_hold ?? false;
    const branchName = basicDetails.branchName ?? basicDetails.branch?.name ?? "N/A";
    const nomineeName = basicDetails.nomineeName ?? (basicDetails.nominees && basicDetails.nominees[0]?.name) ?? "N/A";
    const lockinAmount = basicDetails.lockinAmount ?? basicDetails.lockin_amount ?? 0;
    const approvedBy = basicDetails.approvedBy?.name ?? basicDetails.approvedBy ?? "N/A";
    const address =
        (basicDetails.correspondenceAddress && `${basicDetails.correspondenceAddress.addressLine1 || ""} ${basicDetails.correspondenceAddress.addressLine2 || ""}, ${basicDetails.correspondenceAddress.city || ""}`.trim()) ||
        basicDetails.permanentAddress?.address ||
        basicDetails.address ||
        "N/A";
    const approvedDate = basicDetails.approvedAt ?? basicDetails.approvedDate ?? "N/A";

    const key1 = [
        "Member",
        "Account Type",
        "Open Date",
        "Status",
        "Nominee Relation",
        "Branch Name",
        "Approved By",
        "Approved Date",
    ];

    const pair1 = [
        memberName,
        capitalizeFirstLetter(accountType) || "N/A",
        openDate || "N/A",
        status === "closed" ? (
            <strong style={{ color: "#de1313ff" }}>Closed</strong>
        ) : (
            <strong style={{ color: "#1F9C00" }}>Active</strong>
        ),
        nomineeRelation || "N/A",
        branchName || "N/A",
        approvedBy || "N/A",
        approvedDate || "N/A",
    ];

    const key2 = [
        "Account Number",
        "Principal Amount",
        "Balance",
        "On Hold",
        "Nominee Name",
        "Lockin Amount",
        "Address",
    ];

    const pair2 = [
        accountNumber || "N/A",
        `₹ ${principalAmount ?? 0}`,
        `₹ ${balance ?? 0}`,
        onHold ? "Yes" : "No",
        nomineeName || "N/A",
        `₹ ${lockinAmount ?? 0}`,
        address || "N/A",
    ];

    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : isError && !basicDetails ? (
                <div style={{ textAlign: "center", padding: 24 }}>
                    <div style={{ marginBottom: 12, color: "red" }}>Failed to load details.</div>
                    <button onClick={() => refetch()}>Retry</button>
                </div>
            ) : (
                <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
            )}
        </>
    );
};

export default ViewBasicDetails;
