import { Alert, Snackbar } from "@mui/material";
import DynamicForm from "../../../../components/DynamicForm";
import PageHeader from "../../../../components/PageHeader";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import * as Yup from "yup";
import { useCloseAccountMutation } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useState } from "react";

const CloseAccount = ({setActiveTab}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { id } = useParams();
  const [closeAccount, { data, isLoading, isError, isSuccess, error }] =
    useCloseAccountMutation();

  const formList = [
    {
      label: "Net Amount to Release",
      placeholder: "Enter Amount",
      name: "closeAmount",
      type: "number",
    },
    {
      label: "Transaction Date",
      type: "date",
      name: "closeDate",
    },
    {
      label: "Remark (If Any)",
      placeholder: "Enter Remark",
      name: "closeRemark",
    },
    {
      label: "Payment Mode",
      type: "select",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
        { value: "Cheque", label: "Cheque" },
      ],

      name: "closePaymentMode",
    },
  ];

  const initialValues = {
    closeDate: "",
    closeRemark: "",
    closeAmount: "",
    closePaymentMode: "",
  };

  const validationSchema = Yup.object({
    closePaymentMode: Yup.string().required("Payment Mode is required"),
    closeAmount: Yup.number()
      .required("Amount is required")
      .typeError("Amount must be a number"),
    closeDate: Yup.string().required("Closing Date is required"),
  });

  const handleSubmit = async (values) => {
    await closeAccount({ values, id }).unwrap();
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader borderBottom="1px solid #DDDDEBBF" title="Close Account" />
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
        successTab="basic"
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

export default CloseAccount;

