import React, { useState } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import {
  useLazyGetDeposiListByAccountNumberQuery,
  useWithdrawalAmountByAcccountNumberMutation,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";

const Withdraw = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [triggerGetDeposiList, { data, isLoading, isError, isSuccess, error }] =
    useLazyGetDeposiListByAccountNumberQuery();

  const [
    withdrawalAmountByAcccountNumber,
    {
      data: withdrawalAmountData,
      isError: withdrawalAmountIsError,
      isLoading: withdrawalAmountLoading,
      isSuccess: withdrawalAmountSuccess,
      error: withdrawalAmountError,
    },
  ] = useWithdrawalAmountByAcccountNumberMutation();

  const withdrawalDetails = data?.data || {};

  // 🔹 Search form
  const formList = [
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
    },
    {
      label: "Member Name",
      placeholder: "Enter Name",
      type: "text",
      name: "memberName",
      id: "memberName",
    },
  ];

  // 🔹 Withdraw form
  const withdreMoneyFormList = [
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
      disabled: true,
    },
    {
      label: "Amount to Withdraw",
      placeholder: "0.00",
      type: "number",
      name: "amount",
      id: "amount",
    },
    {
      label: "Transaction Date",
      type: "date",
      name: "transactionDate",
      id: "transactionDate",
    },
    {
      label: "Remark (If Any)",
      placeholder: "Enter Remark",
      name: "remark",
      id: "remark",
    },
    {
      label: "Mode of Payment",
      name: "payMode",
      id: "payMode",
      type: "select",
      options: [
        { label: "Cash", value: "Cash" },
        { label: "Cheque", value: "Cheque" },
        { label: "UPI", value: "UPI" },
      ],
    },
  ];

  const initialValues = {
    accountNumber: "",
    memberName: "",
  };

  const columns = [
    { id: "savingAccountNo", label: "Saving Account No.", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "branchName", label: "Branch Name", minWidth: 120 },
    { id: "availableBalance", label: "Available Balance (₹)", minWidth: 120 },
  ];

  const rows = [
    {
      savingAccountNo: withdrawalDetails?.savingAccountNo || "N/A",
      memberName: withdrawalDetails?.memberName || "N/A",
      branchName: withdrawalDetails?.branchName || "N/A",
      availableBalance: withdrawalDetails?.availableBalance
        ? `₹ ${withdrawalDetails.availableBalance}`
        : "N/A",
    },
  ];

  // 🔹 Validation for search form
  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    memberName: Yup.string()
      .required("Member name is required")
      .matches(/^[A-Za-z\s]+$/, "Customer name must only contain letters"),
  });

  // 🔹 Validation for withdraw form
  const withdreMoneyValidationSchema = Yup.object({
    amount: Yup.number()
      .required("Withdraw amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    transactionDate: Yup.string().required("Transaction Date is required"),
    payMode: Yup.string().required("Mode of Payment is required"),
  });

  // 🔹 Fetch withdrawal details
  const handleSubmit = async (values, { resetForm }) => {
    const { accountNumber, memberName } = values;
    setShowDetails(false); // clear old details

    try {
      const result = await triggerGetDeposiList({
        accountNumber,
        memberName,
      }).unwrap();

      if (result?.success || result?.data) {
        setShowDetails(true);
        resetForm();
      } else {
        setShowDetails(false);
      }
    } catch (err) {
      console.error("Error fetching withdrawal list:", err);
      setShowDetails(false);
    }
  };

  // 🔹 Withdraw money submission
  const withdrMoneyHandleSubmit = async (values, { resetForm }) => {
    try {
      const result = await withdrawalAmountByAcccountNumber({
        ...values,
        accountNumber: withdrawalDetails?.savingAccountNo,
      }).unwrap();

      if (result?.success) {
        resetForm();
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));
  const handleCloseSnackbarAlert = () =>
    setSnackbarAlert((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      {/* 🔹 Search Form */}
      <DynamicForm
        headerTitle="Withdrawal Details"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        texting="Searching"
      />

      {/* 🔹 Snackbar for fetching */}
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        data={data}
        error={error}
        setSnackbar={setSnackbar}
      />

      {/* 🔹 Snackbar for withdrawal */}
      <ErrorAndSuccessUseEffect
        isError={withdrawalAmountIsError}
        isSuccess={withdrawalAmountSuccess}
        data={withdrawalAmountData}
        error={withdrawalAmountError}
        setSnackbar={setSnackbarAlert}
      />

      {/* 🔹 Show details section */}
      {showDetails && (
        <>
          <DynamicDataTable rows={rows} columns={columns} />

          <PageHeader
            title="Withdraw Money"
            borderBottom="1px solid #DDDDEBBF"
          />

          <DynamicForm
            formList={withdreMoneyFormList}
            initialValues={{
              accountNumber: withdrawalDetails?.savingAccountNo || "",
              amount: "",
              transactionDate: "",
              remark: "",
              payMode: "",
            }}
            validationSchema={withdreMoneyValidationSchema}
            actionButtonText="Withdraw"
            isLoading={withdrawalAmountLoading}
            texting="Please Wait"
            handleSubmit={withdrMoneyHandleSubmit}
          />
        </>
      )}

      {/* 🔹 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbar.severity}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarAlert.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbarAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbarAlert}
          variant="filled"
          severity={snackbarAlert.severity}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbarAlert.message}
        </Alert>
      </Snackbar>
    </PagesMainContainerStyle>
  );
};

export default Withdraw;
