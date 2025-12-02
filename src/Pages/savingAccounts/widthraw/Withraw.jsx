import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import { useWithdrawalAmountByAcccountNumberMutation } from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import GetSavingDetailsByAcnt from "../../../components/GetSavingDetailsByAcnt";

const Withdraw = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // 🔹 Sync account number after showDetails changes
  useEffect(() => {
    const storedAccNo = localStorage.getItem("accountNumber");
    if (storedAccNo) {
      setAccountNumber(storedAccNo);
    } else {
      setAccountNumber("");
    }
  }, [showDetails]);

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


  const withdreMoneyValidationSchema = Yup.object({
    amount: Yup.number()
      .required("Withdraw amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    transactionDate: Yup.string().required("Transaction Date is required"),
    payMode: Yup.string().required("Mode of Payment is required"),
  });


  const withdrMoneyHandleSubmit = async (values, { resetForm }) => {
    try {
      const result = await withdrawalAmountByAcccountNumber({
        ...values,
        accountNumber,
      }).unwrap();

      if (result?.success) {
        resetForm();
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };


  const handleCloseSnackbarAlert = () =>
    setSnackbarAlert((prev) => ({ ...prev, open: false }));


  return (
    <PagesMainContainerStyle>

      <GetSavingDetailsByAcnt
        title="Withdrawal Details"
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />

      <ErrorAndSuccessUseEffect
        isError={withdrawalAmountIsError}
        isSuccess={withdrawalAmountSuccess}
        data={withdrawalAmountData}
        error={withdrawalAmountError}
        setSnackbar={setSnackbarAlert}
      />

      {showDetails && accountNumber && (
        <>
          <PageHeader
            title="Withdraw Money"
            borderBottom="1px solid #DDDDEBBF"
          />

          <DynamicForm
            formList={withdreMoneyFormList}
            initialValues={{
              accountNumber,
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
