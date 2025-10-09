import { useState, useEffect } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import { useDepositAmountByAcccountNumberMutation } from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import GetSavingDetailsByAcnt from "../../../components/GetSavingDetailsByAcnt";

const Deposit = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // ✅ Sync account number when details are shown
  useEffect(() => {
    const storedAccNo = localStorage.getItem("accountNumber");
    if (storedAccNo) {
      setAccountNumber(storedAccNo);
    } else {
      setAccountNumber("");
    }
  }, [showDetails]);

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

  // 🔹 Deposit form
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

  // 🔹 Validation schema
  const depositeMoneyValidationSchema = Yup.object({
    amount: Yup.number()
      .required("Deposit amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    transactionDate: Yup.string().required("Transaction Date is required"),
    payMode: Yup.string().required("Mode Of Payment is required"),
  });

  // ✅ Deposit money submission
  const depositMoneyHandleSubmit = async (values, { resetForm }) => {
    try {
      const result = await depositAmountByAcccountNumber({
        ...values,
        accountNumber,
      }).unwrap();

      if (result?.success) {
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbarAlert = () =>
    setSnackbarAlert((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      {/* 🔹 Search Form */}
      <GetSavingDetailsByAcnt
        title="Deposit Details"
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />

      {/* 🔹 API Status Alerts */}
      <ErrorAndSuccessUseEffect
        isError={depositAmountIsError}
        isSuccess={depositAmountSuccess}
        data={depositAmountData}
        error={depositAmountError}
        setSnackbar={setSnackbarAlert}
      />

      {/* 🔹 Show deposit form when account is selected */}
      {showDetails && accountNumber && (
        <>
          <PageHeader
            title="Deposit Money"
            borderBottom="1px solid #DDDDEBBF"
          />

          <DynamicForm
            formList={depositeMoneyFormList}
            initialValues={{
              accountNumber,
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

      {/* 🔹 Snackbar for success/error */}
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
