import React, { useMemo, useState } from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicForm from "../../../../components/DynamicForm";
import * as Yup from "yup";
import { useDeductOrReverseTdsMutation } from "../../../../features/api/fdAccounts";
import { Alert, Snackbar } from "@mui/material";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useParams } from "react-router-dom";

const FdReverseTds = ({ setActiveTab = "viewTransaction" }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [deductOrReverseTds, { data, isLoading, isError, isSuccess, error }] =
    useDeductOrReverseTdsMutation();
  const { id } = useParams();

  const handleSubmit = async (values) => {
    try {
      await deductOrReverseTds({ values, id });
    } catch (error) {
      console.log("error",error)
    }
  };
  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const creditInterestFormList = useMemo(() => {
    const formList = [
      {
        label: "Transaction Date",
        type: "date",
        name: "transactionDate",
      },
      {
        label: "Transaction Type",
        type: "select",
        options: [
          { value: "deduct", label: "Deduct" },
          { value: "credit", label: "Credit" },
        ],
        placeholder: "Enter Transaction Type",
        name: "transactionType",
      },
      {
        label: "Interest Amount",
        type: "number",
        placeholder: "Enter Interest Amount",
        name: "tdsAmount",
      },
      {
        label: "Remark",
        placeholder: "Enter Remark",
        name: "remark",
      },
    ];
    return formList;
  }, []);

  const validationSchema = Yup.object({
    transactionDate: Yup.string().required("Transaction Date  is required"),
    transactionType: Yup.string().required("Transaction Type  is required"),
    tdsAmount: Yup.number()
      .required("Interest Amount is required")
      .positive("Interest Amount must be positive")
      .typeError("Interest Amount must be a number"),
  });

  const initialValues = {
    transactionDate: "",
    transactionType: "",
    tdsAmount: "",
    remark: "",
  };

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Deduct/Reverse TDS" paddingBottom="0px" />
      <DynamicForm
        actionButtonText="Save"
        validationSchema={validationSchema}
        texting="Saving"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        initialValues={initialValues}
        formList={creditInterestFormList}
      />
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        data={data}
        error={error}
        setSnackbar={setSnackbar}
        setActiveTab={setActiveTab}
        successTab="viewTransaction"
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
    </PagesMainContainerStyle>
  );
};

export default FdReverseTds;
