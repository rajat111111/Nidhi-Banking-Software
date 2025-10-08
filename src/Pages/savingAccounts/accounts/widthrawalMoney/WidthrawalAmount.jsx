import { Alert, Snackbar, styled } from "@mui/material";
import DynamicForm from "../../../../components/DynamicForm";
import PageHeader from "../../../../components/PageHeader";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import * as Yup from "yup";
import {  useDepositAmountMutation } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useState } from "react";

const WidthrawalAmount = ({setActiveTab="transaction"}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { id } = useParams();


  const [depositAmount, { data, isLoading, isError, isSuccess, error }] =
    useDepositAmountMutation();

  const formList = [
    {
      label: "Transaction Type",
      type: "select",
      options: [
        { value: "deposit", label: "Deposit" },
        { value: "withdrawal", label: "Withdrawal" },
      ],

      name: "transactionType",
    },
    {
      label: "Amount to Deposit",
      placeholder: "Enter Amount",
      name: "amount",
      type: "number",
    },
    {
      label: "Transaction Date",
      type: "date",
      name: "transactionDate",
    },

    {
      label: "Remark (If Any)",
      placeholder: "Enter Remark",
      name: "remark",
    },
    {
      label: "Payment Mode",
      type: "select",
      options: [
        { value: "cash", label: "Cash" },
        { value: "online", label: "Online" },
        { value: "cheque", label: "Cheque" },
      ],

      name: "paymentMode",
    },
  ];

  const initialValues = {
    transactionType: "",
    amount: "",
    transactionDate: "",
    remark: "",
    paymentMode: "",
  };

  const validationSchema = Yup.object({
    paymentMode: Yup.string().required("Payment Mode is required"),
    amount: Yup.number()
      .required("Amount is required")
      .typeError("Amount must be a number"),
    transactionDate: Yup.string().required("Closing Date is required"),
    transactionType: Yup.string().required("Transaction Type is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    await depositAmount({ values, id });
    // resetForm()
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader
        borderBottom="1px solid #DDDDEBBF"
        title="Deposit/Withdrawal Money"
      />
      <DynamicForm
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Save"
        texting="Saving"
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        data={data}
        setSnackbar={setSnackbar}

setActiveTab={setActiveTab}
  successTab="transaction"
      />
      {snackbar && (
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
      )}
    </>
  );
};

export default WidthrawalAmount;
