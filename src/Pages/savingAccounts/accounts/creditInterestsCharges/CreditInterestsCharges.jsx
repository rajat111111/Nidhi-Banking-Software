import * as Yup from "yup";
import PageHeader from "../../../../components/PageHeader";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import DynamicForm from "../../../../components/DynamicForm";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useState } from "react";
import { useCreditOtherChargesMutation } from "../../../../features/api/savingAccounts";
import { Alert, Snackbar } from "@mui/material";

const CreditInterestsCharges = ({setActiveTab}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [debitOtherCharges, { isLoading, isError, isSuccess, error, data }] =
    useCreditOtherChargesMutation();

  const accountNumber = localStorage.getItem("accountNumber");

  const formList = [
    {
      label: "Transaction Date",
      type: "date",
      name: "transactionDate",
    },
    {
      label: "Transaction Type",
      placeholder: "Enter Transaction Type",
      name: "transactionType",
     
    },

    {
      label: "Interest Amount",
      type: "number",
      placeholder: "Enter Amount",
      name: "interestAmount",
    },
    {
      label: "Remark (If Any)",
      placeholder: "Enter Remark",
      name: "remark",
    },
  ];

  const initialValues = {
    transactionType: "",
    remark: "",
    interestAmount: "",
    transactionDate: "",
  };

  const validationSchema = Yup.object({
    transactionType: Yup.string().required("Transaction Type is required"),
    interestAmount: Yup.string().required("Amount  is required"),
    transactionDate: Yup.string().required("Transaction Date  is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await debitOtherCharges({ values, accountNumber });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader
        borderBottom="1px solid #DDDDEBBF"
        title="Credit Interest Charge"
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
        data={data}
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        setSnackbar={setSnackbar}
       setActiveTab={setActiveTab}
        successTab="transaction"
      />
      {snackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={12000}
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

export default CreditInterestsCharges;
