import React from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo } from "react";
import * as Yup from "yup";

const FdForClose = () => {
  const forCloseFormList = useMemo(
    () => [
      {
        label: "Closure Date",
        name: "closeDate",
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
        name: "interestPaid",
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
    closeDate: Yup.string().required("Close Date  is required"),
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
    closeDate: "",
    balance: "",
    tdsDeduction: "",
    penalCharges: "",
    cancellationCharges: "",
    finalAmount: "",
    interestPaid: "",
  };

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Fore Close" borderBottom="1px solid #DDDDEBBF" />
      <DynamicForm
        actionButtonText="Fore Close"
        texting="Closing"
        formList={forCloseFormList}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </PagesMainContainerStyle>
  );
};

export default FdForClose;
