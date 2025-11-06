import React, { useMemo } from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageLoader from "../../../../components/PageLoader";
import InformationPage from "../../../../components/InformationPage";
import PageHeader from "../../../../components/PageHeader";
import { useParams } from "react-router-dom";
import { useGetBasicFdAccountDetailsQuery } from "../../../../features/api/fdAccounts";
import { capitalizeFirstLetter } from "../../../../helper/helper";
import DynamicForm from "../../../../components/DynamicForm";

const FdUpgradeAccountPlan = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBasicFdAccountDetailsQuery({ id });

  const basicDetails = data?.data || {};
  console.log("basicDetails", basicDetails);

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
    paymentMode,
    maturityAmount,
    balance,
    interestPayout,
    tdsDeduction,
    autoRenewal,
    address,
  } = basicDetails;

  // 🔹 Left section
  const key1 = [
    "Plan Code",
    "Minimum Lockin Period ",
    "Minimum Amount",
    "Tenure Type",
    "Interest Payout",
    "Saving Min. Monthly Avg Bal",
    "Ladies Interest Rate",
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
    ) : (
      <strong style={{ color: "#1F9C00" }}>Active</strong>
    ),
    seniorCitizen || "N/A",
    approvedBy || "N/A",
    approvedDate ? new Date(approvedDate).toLocaleDateString() : "N/A",
  ];

  // 🔹 Right section
  const key2 = [
    "Plan Name",
    "Interest Lockin Period",
    "Interest Rate",
    "Period",
    "Saving Lock in Amount",
    "Senior Citizen Interest Rate",
    "Ex-Service Interest Rate",
  ];

  const pair2 = [
    fdNumber || "N/A",
    branchName || "N/A",
    capitalizeFirstLetter(plan) || "N/A",
    capitalizeFirstLetter(paymentMode) || "N/A",
    `₹ ${maturityAmount}` || "N/A",
    `₹ ${balance}` || "N/A",
    interestPayout || "N/A",
    tdsDeduction || "N/A",
    autoRenewal || "N/A",
    address || "N/A",
  ];


const upgradePlanFormList = useMemo(() => {
  const formList = [
    {
      label: "Upgrade Account",
      name: "upgradeAccount",
      type: "switch", 
      
    },
    {
      label: "Plan Name",
      placeholder: "XYA112-FD Account",
      name: "planName",
      type: "text",
    },
    {
      label: "Amount",
      placeholder: "Auto refetched based on Plan Name",
      name: "amount",
      type: "text",
      readOnly: true, // optional
    },
  ];

  return formList;
}, []);

  return (
    <PagesMainContainerStyle>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <PageHeader title="Upgrade Account Plan" paddingBottom="0px" />
          <InformationPage
            key1={key1}
            pair1={pair1}
            key2={key2}
            pair2={pair2}
          />
        </>
      )}

      <PageHeader title="Upgrade Account Plan" paddingBottom="0px" />
      <DynamicForm texting="Upgrading" actionButtonText="Upgrade Account" formList={upgradePlanFormList}  />
    </PagesMainContainerStyle>
  );
};

export default FdUpgradeAccountPlan;
