import InformationPage from "../../../../components/InformationPage";
import { useParams } from "react-router-dom";
import PageLoader from "../../../../components/PageLoader";
import { capitalizeFirstLetter } from "../../../../helper/helper";
import { useBasicRdDetailsQuery } from "../../../../features/api/rdAccounts";
import { styled } from "@mui/material";

const RdBasicDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useBasicRdDetailsQuery(id);

  const basicDetails = data?.data || {};

  const {
    memberName,
    memberId,
    agentName,
    rdAmount,
    openDate,
    annualInterestRate,
    maturityDate,
    status,
    seniorCitizen,
    approvedBy,
    approvedDate,
    rdAccountNumber,
    branchName,
    paymentMode,
    maturityAmount,
    balance,
    interestPayout,
    tdsDeduction,
    autoRenew,
    address,
  } = basicDetails;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const formatAmount = (value) =>
    value && value !== "null" ? `₹ ${parseFloat(value).toFixed(2)}` : "₹ 0.00";

  const renderStatus = (status) => {
    if (!status) return "N/A";
    const normalized = status.toLowerCase();
    if (normalized === "closed")
      return <StatusBadge color="#de1313">Closed</StatusBadge>;
    if (normalized === "pending")
      return <StatusBadge color="#e6b800">Pending</StatusBadge>;
    return <StatusBadge color="#1F9C00">Active</StatusBadge>;
  };

  const key1 = [
    "Member Name",
    "Member ID",
    "Agent Name",
    "RD Amount",
    "Open Date",
    "Annual Interest Rate",
    "Maturity Date",
    "Status",
    "Senior Citizen",
    "Approved By",
    "Approved Date",
  ];

  const pair1 = [
    capitalizeFirstLetter(memberName) || "N/A",
    memberId || "N/A",
    capitalizeFirstLetter(agentName) || "N/A",
    formatAmount(rdAmount),
    formatDate(openDate),
    annualInterestRate ? `${annualInterestRate}%` : "N/A",
    formatDate(maturityDate),
    renderStatus(status),
    seniorCitizen ? (
      <YesContainer>Yes</YesContainer>
    ) : (
      <NoContainer>No</NoContainer>
    ),
    approvedBy && approvedBy !== "null null"
      ? capitalizeFirstLetter(approvedBy)
      : "N/A",
    formatDate(approvedDate),
  ];

  const key2 = [
    "RD Account Number",
    "Branch Name",
    "Payment Mode",
    "Maturity Amount",
    "Balance",
    "Interest Payout",
    "TDS Deduction",
    "Auto Renewal",
    "Address",
  ];

  const pair2 = [
    rdAccountNumber || "N/A",
    capitalizeFirstLetter(branchName) || "N/A",
    capitalizeFirstLetter(paymentMode) || "N/A",
    formatAmount(maturityAmount),
    formatAmount(balance),
    interestPayout || "N/A",
    tdsDeduction ? (
      <YesContainer>Yes</YesContainer>
    ) : (
      <NoContainer>No</NoContainer>
    ),
    autoRenew ? (
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

export default RdBasicDetails;

const StatusBadge = styled("div")(({ color }) => ({
  width: "120px",
  height: "30px",
  padding: "0 12px",
  backgroundColor: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
  fontWeight: 600,
}));

const YesContainer = styled("div")({
  height: "30px",
  backgroundColor: "#3ac610eb",
  width: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
});

const NoContainer = styled("div")({
  height: "30px",
  backgroundColor: "#c61010eb",
  width: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
});
