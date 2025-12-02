import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import {
  useForFdCloseAccountMutation,
  useGetBasicFdAccountDetailsQuery,
} from "../../../../features/api/fdAccounts";
import { Alert, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";

const FdForClose = ({ setActiveTab }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { id } = useParams();
  console.log("closeid",id)
  const [forFdCloseAccount, { data, isError, error, isLoading, isSuccess }] =
    useForFdCloseAccountMutation();

  const { data: fdAccountBasicDetails } = useGetBasicFdAccountDetailsQuery({
    id,
  });
  const fdAccountId = fdAccountBasicDetails?.data?.fdId || "N/A";

  const forCloseFormList = useMemo(
    () => [
      {
        label: "Closure Date",
        name: "closureDate",
        type: "date",
      },
      {
        label: "Balance",
        name: "balance",
        placeholder: "Enter Balance",
        type: "number",
      },
      {
        label: "Interest left to Paid",
        name: "interestLeftToPay",
        placeholder: "0.00",
        type: "number",
      },
      {
        label: "TDS Deduction",
        name: "tdsDeduction",
        placeholder: "Enter TDS Deduction",
        type: "number",
      },
      {
        label: "Penal Charges",
        name: "penalCharges",
        placeholder: "Enter Penal Charges",
        type: "number",
      },
      {
        label: "Cancellation Charges",
        name: "cancellationCharges",
        placeholder: "Enter Cancellation Charges",
        type: "number",
      },
      {
        label: "Final Amount",
        name: "finalAmount",
        placeholder: "Enter Final Amount",
        type: "number",
      },
    ],
    []
  );

  const validationSchema = Yup.object({
    closureDate: Yup.string().required("Close Date  is required"),
    balance: Yup.number()
      .required("Balance is required")
      .positive("Balance must be positive")
      .typeError("Balance must be a number"),
    penalCharges: Yup.number()
      .required("Penal Charges is required")
      .positive("Penal Charges must be positive")
      .typeError("Penal Charges must be a number"),
    tdsDeduction: Yup.number()
      .required("TDS Deduction is required")
      .positive("TDS Deduction must be positive")
      .typeError("TDS Deduction must be a number"),
    finalAmount: Yup.number()
      .required("Final Amount is required")
      .positive("Final Amount must be positive")
      .typeError("Final Amount must be a number"),
    cancellationCharges: Yup.number()
      .required("Cancellation Charges is required")
      .positive("Cancellation Charges must be positive")
      .typeError("Cancellation Charges must be a number"),
  });

  const initialValues = {
    closureDate: "",
    balance: "",
    tdsDeduction: "",
    penalCharges: "",
    cancellationCharges: "",
    finalAmount: "",
    interestLeftToPay: "",
  };
  const handleSubmit = async (values) => {
    await forFdCloseAccount({ values, id }).unwrap();
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Fore Close" borderBottom="1px solid #DDDDEBBF" />
      <DynamicForm
        actionButtonText="Fore Close"
        texting="Closing"
        formList={forCloseFormList}
        isLoading={isLoading}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema}
      />
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        setSnackbar={setSnackbar}
        setActiveTab={setActiveTab}
        successTab="basic"
        data={data}
        set
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
    </PagesMainContainerStyle>
  );
};

export default FdForClose;
