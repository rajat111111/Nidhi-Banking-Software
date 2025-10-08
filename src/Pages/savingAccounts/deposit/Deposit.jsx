import React, { useState } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import {
  useDepositAmountByAcccountNumberMutation,
  useLazyGetDeposiListByAccountNumberQuery,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";

const Deposit = () => {
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
    depositAmountByAcccountNumber,
    {
      data: depositAmountData,
      isError: depositAmountIsError,
      isLoading: depositAmountLoading,
      isSuccess: depositAmountSuccess,
      error: depositAmountError,
    },
  ] = useDepositAmountByAcccountNumberMutation();

  const depositDetails = data?.data || {};

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

  const depositeMoneyFormList = [
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
      disabled: true,
    },
    {
      label: "Amount to Deposit",
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
      label: "Payment Mode",
      type: "select",
      name: "payMode",
      id: "payMode",
      options: [
        { label: "Online", value: "online" },
        { label: "Cash", value: "cash" },
        { label: "Cheque", value: "cheque" },
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
      savingAccountNo: depositDetails?.savingAccountNo || "N/A",
      memberName: depositDetails?.memberName || "N/A",
      branchName: depositDetails?.branchName || "N/A",
      availableBalance: depositDetails?.availableBalance
        ? `₹ ${depositDetails.availableBalance}`
        : "N/A",
    },
  ];

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    memberName: Yup.string()
      .required("Member name is required")
      .matches(/^[A-Za-z\s]+$/, "Customer name must only contain letters"),
  });

  const depositeMoneyValidationSchema = Yup.object({
    amount: Yup.string().required("Deposit Amount is required"),
    transactionDate: Yup.string().required("Transaction Date is required"),
    payMode: Yup.string().required("Mode Of Payment is required"),
  });

  // ✅ Fetch deposit details manually (cached)
  const handleSubmit = async (values, { resetForm }) => {
    const { accountNumber, memberName } = values;

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
      console.error("Error fetching deposit list:", err);
      setShowDetails(false);
    }
  };

  // ✅ Deposit Money Submission
  const depositMoneyHandleSubmit = async (values, { resetForm }) => {
    try {
      const result = await depositAmountByAcccountNumber({
        ...values,
        accountNumber: depositDetails?.savingAccountNo,
      }).unwrap();

      if (result?.success) {
        resetForm();
      }
    } catch (error) {
      console.log(error);
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
        headerTitle="Deposit Details"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        texting="Searching"
      />

      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        data={data}
        error={error}
        setSnackbar={setSnackbar}
      />
      <ErrorAndSuccessUseEffect
        isError={depositAmountIsError}
        isSuccess={depositAmountSuccess}
        data={depositAmountData}
        error={depositAmountError}
        setSnackbar={setSnackbarAlert}
      />

      {/* 🔹 Show details section */}
      {showDetails && (
        <>
          <DynamicDataTable rows={rows} columns={columns} />

          <PageHeader
            title="Deposit Money"
            borderBottom="1px solid #DDDDEBBF"
          />

          <DynamicForm
            formList={depositeMoneyFormList}
            initialValues={{
              accountNumber: depositDetails?.savingAccountNo || "",
              amount: "",
              transactionDate: "",
              remark: "",
              payMode: "",
            }}
            validationSchema={depositeMoneyValidationSchema}
            actionButtonText="Deposit"
            isLoading={depositAmountLoading}
            texting="Please Wait"
            handleSubmit={depositMoneyHandleSubmit}
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

export default Deposit;
