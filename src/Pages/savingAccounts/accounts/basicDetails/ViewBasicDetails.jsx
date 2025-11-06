import React from "react";
import InformationPage from "../../../../components/InformationPage";
import { useGetBasicAccountDetailsQuery } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PageLoader from "../../../../components/PageLoader";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const ViewBasicDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const { data, isLoading } = useGetBasicAccountDetailsQuery({ id });

  const basicDetails = data?.data || {};

  const {
    memberName,
    accountNumber,
    accountType,
    principalAmount,
    openDate,
    status,
    balance,
    nomineeRelation,
    onHold,
    branchName,
    nomineeName,
    lockinAmount,
    approvedBy,
    address,
    approvedDate,
  } = basicDetails;

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
    memberName || "N/A",
    capitalizeFirstLetter(accountType) || "N/A",
    openDate || "N/A",
    status === "closed" ? (
      <strong style={{ color: "#de1313ff" }}>Closed</strong>
    ) :status === "approved" ? (
      <strong style={{ color: "#1F9C00" }}>Active</strong> || "N/A"
    ): (
      <strong style={{ color: "#9c4900ff" }}>N/A</strong> || "N/A"
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
    `₹ ${principalAmount}` || "N/A",
    `₹ ${balance}` || "N/A",
    onHold === false ? "No" : "Yes" || "N/A",
    nomineeName || "N/A",
    `₹ ${lockinAmount}` || "N/A",
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

export default ViewBasicDetails;
