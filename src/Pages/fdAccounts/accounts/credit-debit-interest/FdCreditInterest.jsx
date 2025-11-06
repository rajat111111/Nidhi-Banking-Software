import React, { useMemo, useState } from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicForm from "../../../../components/DynamicForm";
import * as Yup from "yup";
import { useCreditOrDebitFdInterestMutation } from "../../../../features/api/fdAccounts";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";


const FdCreditInterest = ({setActiveTab="viewTransaction"}) => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "",
    });
  const [creditOrDebitFdInterest,{data,isLoading,isError,isSuccess,error}]=useCreditOrDebitFdInterestMutation()
  const {id}=useParams()

  const handleSubmit=async(values)=>{
    try {
      await creditOrDebitFdInterest({values,id})
    } catch (error) {
      
    }
  }
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
        type:"select",
       options: [
        { value: "Debit", label: "Deduct" },
        { value: "Credit", label: "Credit" },
      ],
        placeholder: "Enter Transaction Type",
        name: "transactionType",
      },
      {
        label: "Interest Amount",
        type: "number",
        placeholder: "Enter Interest Amount",
        name: "interestAmount",
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
    interestAmount: Yup.number()
      .required("Interest Amount is required")
      .positive("Interest Amount must be positive")
      .typeError("Interest Amount must be a number"),
  });

  const initialValues={
transactionDate:"",
transactionType:"",
interestAmount:"",
remark:""
  }

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Credit/Debit Interest" paddingBottom="0px" />
      <DynamicForm
        actionButtonText="Save"
        validationSchema={validationSchema}
        texting="Saving"
        isLoading={isLoading}
        initialValues={initialValues}
        formList={creditInterestFormList}
        handleSubmit={handleSubmit}
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

export default FdCreditInterest;
