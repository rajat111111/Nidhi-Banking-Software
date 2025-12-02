
// import React from "react";
// import { Box, Divider, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate, useParams } from "react-router-dom";
// import PageTopContent from "../../components/PageTopContent";
// import DynamicButton from "../../components/DynamicButton";
// import InformationPage from "../../components/InformationPage";
// import { useGetMemberByIdQuery } from "../../features/api/membersApi";

// const PageWrapper = styled("div")({
//     width: "100%",
//     maxWidth: 1100,
//     margin: "0 auto",
//     padding: "20px 24px",
// });

// const ApprovalViewDetails = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { data, isLoading, isError } = useGetMemberByIdQuery(id);

//     if (isError) return <Typography color="error">Failed to load details</Typography>;
//     if (isLoading) return <Typography>Loading...</Typography>;

//     const detail = data?.data ?? data ?? {};
//     const member = detail || {};

//     // Extract fields safely
//     const reference = `Member#${member.id || "-"}`;
//     const memberNo = member.applicationNumber || "-";
//     const memberName = `${member.firstName || ""} ${member.lastName || ""}`.trim() || "-";
//     const accountType = member.accountType || "-";
//     const amount = member.amount ? `₹ ${member.amount}` : "-";
//     const transactionDate = member.createdAt?.split("T")[0] || "-";
//     const accountNumber = member.bankAccountDetails?.accountNumber || "-";
//     const reviewedBy = member.reviewedBy || "-";
//     const remark = member.remark || "-";
//     const status = member.status || "-";
//     const gender = member.gender || "-";
//     const dob = member.dob || "-";
//     const fatherName = member.fatherName || "-";
//     const spouseName = member.spouseName || "-";
//     const address =
//         member.correspondenceAddress?.addressLine1 ||
//         member.permanentAddress?.address ||
//         "-";

//     // Information Page content
//     const key1 = ["Reference", "Member No.", "Member Name", "Account Type"];
//     const pair1 = [reference, memberNo, memberName, accountType];

//     const key2 = ["Amount", "Created Date", "Account Number", "Status"];
//     const pair2 = [amount, transactionDate, accountNumber, status];

//     const key3 = ["Reviewed by", "Remark", "Gender", "Date of Birth"];
//     const pair3 = [reviewedBy, remark, gender, dob];

//     const key4 = ["Father's Name", "Spouse/Husband Name", "Address", "Approved Time"];
//     const pair4 = [fatherName, spouseName, address, member.approvedTime || "-"];

//     return (
//         <Box sx={{ width: "100%", pb: 6 }}>
//             <PageWrapper>
//                 <PageTopContent title="Member Details View" />

//                 <Box sx={{ mt: 2, p: 3, bgcolor: "#F2F3F6BF", borderRadius: 1 }}>
//                     <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />

//                     <InformationPage key1={key3} pair1={pair3} key2={key4} pair2={pair4} />



//                     <Box sx={{ display: "flex", gap: 12, justifyContent: "flex-end", mt: 1 }}>
//                         <DynamicButton
//                             variant="outlined"
//                             text="Back"
//                             onClick={() => navigate(-1)}
//                         />
//                     </Box>
//                 </Box>
//             </PageWrapper>
//         </Box>
//     );
// };

// export default ApprovalViewDetails;
import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import PageTopContent from "../../components/PageTopContent";
import DynamicButton from "../../components/DynamicButton";
import InformationPage from "../../components/InformationPage";
import { useGetMemberByIdQuery } from "../../features/api/membersApi";

const PageWrapper = styled("div")({
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
});

const ApprovalViewDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetMemberByIdQuery(id);

    if (isError) return <Typography color="error">Failed to load details</Typography>;
    if (isLoading) return <Typography>Loading...</Typography>;

    const detail = data?.data ?? data ?? {};
    const member = detail || {};

    // Extract fields safely
    const reference = `Member#${member.id || "-"}`;
    const memberNo = member.applicationNumber || "-";
    const memberName = `${member.firstName || ""} ${member.lastName || ""}`.trim() || "-";
    const accountType = member.accountType || "-";
    const amount = member.amount ? `₹ ${member.amount}` : "-";
    const transactionDate = member.createdAt?.split("T")[0] || "-";
    const accountNumber = member.bankAccountDetails?.accountNumber || "-";
    const reviewedBy = member.reviewedBy || "-";
    const remark = member.remark || "-";
    const status = member.status || "-";
    const gender = member.gender || "-";
    const dob = member.dob || "-";
    const fatherName = member.fatherName || "-";
    const spouseName = member.spouseName || "-";
    const address =
        member.correspondenceAddress?.addressLine1 ||
        member.permanentAddress?.address ||
        "-";

    // Information Page content


    const key1 = [
        "Reference",
        "Member No.",
        "Member Name",
        "Account Type",
        "Amount",
        "Created Date",
        "Account Number",
        "Status",
    ];

    const pair1 = [
        reference,
        memberNo,
        memberName,
        accountType,
        amount,
        transactionDate,
        accountNumber,
        status,
    ];


    const key2 = [
        "Reviewed by",
        "Remark",
        "Gender",
        "Date of Birth",
        "Father's Name",
        "Spouse/Husband Name",
        "Address",
        "Approved Time",
    ];

    const pair2 = [
        reviewedBy,
        remark,
        gender,
        dob,
        fatherName,
        spouseName,
        address,
        member.approvedTime || "-",
    ];

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            <PageWrapper>
                <PageTopContent title="Member Details View" />

                <Box sx={{ mt: 2, p: 3, bgcolor: "#F2F3F6BF", borderRadius: 2 }}>
                    {/* First Info Block */}
                    <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />

                    <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end", mt: 1 }}>
                        <DynamicButton
                            variant="outlined"
                            text="Back"
                            onClick={() => navigate(-1)}
                        />
                    </Box>
                </Box>
            </PageWrapper>
        </Box>
    );
};

export default ApprovalViewDetails;
