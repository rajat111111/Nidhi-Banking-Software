import * as Yup from "yup";
import PageHeader from "../../../../components/PageHeader";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import DynamicForm from "../../../../components/DynamicForm";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useState } from "react";
import { useDebitOtherChargesMutation } from "../../../../features/api/savingAccounts";
import { Alert, Snackbar } from "@mui/material";

const DebitOtherCharges = ({ setActiveTab="transaction" }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [debitOtherCharges, { isLoading, isError, isSuccess, error, data }] =
    useDebitOtherChargesMutation();

  const accountNumber = localStorage.getItem("accountNumber");

  const formList = [
    {
      label: "Charges Type",
      placeholder: "Enter Charges Type",
      name: "savingCharges",
    },
    {
      label: "Remark (If Any)",
      placeholder: "Enter Remark",
      name: "remark",
    },
    {
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
      name: "amount",
    },
    {
      label: "Transaction Date",
      type: "date",
      name: "transactionDate",
    },
  ];

  const initialValues = {
    savingCharges: "",
    remark: "",
    amount: "",
    transactionDate: "",
  };

  const validationSchema = Yup.object({
    savingCharges: Yup.string().required("Saving Charges Type is required"),
    amount: Yup.string().required("Amount  is required"),
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
        title="Debit Other Charges"
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
          autoHideDuration={snackbar.severity === "success" ? 6000 : 4000}
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

export default DebitOtherCharges;
