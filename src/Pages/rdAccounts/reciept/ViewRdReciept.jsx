import React from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageTopContent from "../../../components/PageTopContent";
import PageLoader from "../../../components/PageLoader";
import InformationPage from "../../../components/InformationPage";
import { useGetBasicFdAccountDetailsQuery } from "../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helper/helper";
import PageHeader from "../../../components/PageHeader";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";

const ViewRdReciept = () => {
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

  const key2 = ["Member Name", "Amount", "Payment Mode", "Status"];
  const key1 = [
    "Member ID",
    "RD Account Number",
    "Receipt Date",
    "Transaction ID",
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

  const initialValues = {
    status: "",
  };

  const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
  });

  const formList = [
    {
      label: "Status",
      type: "select",
      name: "status",
      options: [
        {
          label: "Appove",
          value: "approve",
        },
        {
          label: "Pending",
          value: "pending",
        },
      ],
    },
  ];

  return (
    <PagesMainContainerStyle>
      <PageTopContent title="Receipt Details" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
      )}
      <PageHeader title="Change Receipt Status" paddingBottom="0px" />
      <DynamicForm
        formList={formList}
        actionButtonText="Upgrade"
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </PagesMainContainerStyle>
  );
};

export default ViewRdReciept;
