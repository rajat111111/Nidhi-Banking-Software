import InformationPage from "../../../../components/InformationPage";
import { useParams } from "react-router-dom";
import PageLoader from "../../../../components/PageLoader";
import { capitalizeFirstLetter } from "../../../../helper/helper";
import { useGetBasicFdAccountDetailsQuery } from "../../../../features/api/fdAccounts";
import { styled } from "@mui/material";

const FdBasics = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBasicFdAccountDetailsQuery({ id });

  const basicDetails = data?.data || {};

  // Destructure safely from API
  const {
    member,
    memberNo,
    agentName,
    principalAmount,
    openDate,
    annualInterestRate,
    maturityDate,
    status,
    seniorCitizen,
    approvedBy,
    approvedDate,
    fdNumber,
    branchName,
    plan,
    fdId,
    paymentMode,
    maturityAmount,
    balance,
    interestPayout,
    tdsDeduction,
    autoRenewal,
    address,
    closureApprovalId,
  } = basicDetails;

  // 🔹 Left section
  const key1 = [
    "Member",
    "Member No.",
    "Agent Name",
    "Principal Amount",
    "Open Date",
    "Annual Interest Rate",
    "Maturity Date",
    "Status",
    "Closure Request Id",
    "Senior Citizen",
    "Approved By",
    "Approved Date",
  ];

  const pair1 = [
    member || "N/A",
    memberNo || "N/A",
    agentName || "N/A",
    `₹ ${principalAmount}` || "N/A",
    openDate || "N/A",
    annualInterestRate || "N/A",
    maturityDate || "N/A",
    status === "closed" ? (
      <strong style={{ color: "#de1313" }}>Closed</strong>
    ) : status === "Closure_Approval" ? (
      <strong style={{ color: "#e47b1fff" }}>Pending For Closure</strong>
    ) : (
      <strong style={{ color: "#1F9C00" }}>Active</strong>
    ),
    closureApprovalId || "N/A",
    seniorCitizen === "Yes" ? (
      <YesContainer>Yes</YesContainer>
    ) : (
      <NoContainer>No</NoContainer>
    ),
    approvedBy || "N/A",
    approvedDate ? new Date(approvedDate).toLocaleDateString() : "N/A",
  ];

  // 🔹 Right section
  const key2 = [
    "FD Account Number",
    "FD Id",
    "Branch Name",
    "Plan",
    "Payment Mode",
    "Maturity Amount",
    "Balance",
    "Interest Payout",
    "TDS Deduction",
    "Auto Renewal",
    "Address",
  ];

  const pair2 = [
    fdNumber || "N/A",
    fdId || "N/A",
    branchName || "N/A",
    capitalizeFirstLetter(plan) || "N/A",
    capitalizeFirstLetter(paymentMode) || "N/A",
    `₹ ${maturityAmount}` || "N/A",
    `₹ ${balance}` || "N/A",
    interestPayout || "N/A",
    tdsDeduction === "Yes" ? (
      <YesContainer>Yes</YesContainer>
    ) : (
      <NoContainer>No</NoContainer>
    ),
    autoRenewal === "Yes" ? (
      <YesContainer>Yes</YesContainer>
    ) : (
      <NoContainer>No</NoContainer>
    ),
    address || "N/A",
  ];

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
      )}
    </>
  );
};

export default FdBasics;

const NoContainer = styled("div")({
  height: "25px",
  backgroundColor: "#c61010eb",
  width: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
});
const YesContainer = styled("div")({
  height: "25px",
  backgroundColor: "#c61010eb",
  width: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
});
