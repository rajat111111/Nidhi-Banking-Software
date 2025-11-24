import React from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageTopContent from "../../../components/PageTopContent";
import PageLoader from "../../../components/PageLoader";
import InformationPage from "../../../components/InformationPage";
import { useGetFdSingleReciptDetailsQuery } from "../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helper/helper";
import PageHeader from "../../../components/PageHeader";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";

const ViewFdRecipt = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFdSingleReciptDetailsQuery({ id });

  // Handle API response
  const reciptDetails = data?.data?.data || {}; // based on your nested API structure

  console.log("reciptDetails", reciptDetails);

  // Destructure safely from API
  const {
    id: receiptId,
    accountNumber,
    memberId,
    memberName,
    branchName,
    transactionType,
    amount,
    paymentMode,
    receiptDate,
  } = reciptDetails;

  // 🧾 Define keys and values for InformationPage
  const key1 = ["Member ID", "Member Name", "FD Account Number", "Branch Name"];
  const pair1 = [
    memberId || "N/A",
    memberName || "N/A",
    accountNumber || "N/A",
    branchName || "N/A",
  ];

  const key2 = ["Transaction Type", "Amount", "Payment Mode", "Receipt Date"];
  const pair2 = [
    capitalizeFirstLetter(transactionType) || "N/A",
    amount ? `₹ ${parseFloat(amount).toLocaleString("en-IN")}` : "N/A",
    capitalizeFirstLetter(paymentMode) || "N/A",
    receiptDate
      ? new Date(receiptDate).toLocaleString("en-IN")
      : "N/A",
  ];

  // 🧩 Form setup for changing status
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
      id: "status",
      options: [
        { label: "Approve", value: "approve" },
        { label: "Pending", value: "pending" },
        { label: "Reject", value: "reject" },
      ],
    },
  ];

  const handleSubmit = (values) => {
    console.log("Status Update:", values);
    // 🧠 Here you can integrate mutation for status update
  };

  return (
    <PagesMainContainerStyle>
      <PageTopContent title="Receipt Details" />

      {isLoading ? (
        <PageLoader />
      ) : (
        <InformationPage
          key1={key1}
          pair1={pair1}
          key2={key2}
          pair2={pair2}
        />
      )}

      <PageHeader title="Change Receipt Status" paddingBottom="0px" />

      <DynamicForm
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Update Status"
        handleSubmit={handleSubmit}
      />
    </PagesMainContainerStyle>
  );
};

export default ViewFdRecipt;
