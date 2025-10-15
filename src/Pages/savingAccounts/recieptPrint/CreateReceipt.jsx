import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import DynamicForm from "../../../components/DynamicForm";
import PageTopContent from "../../../components/PageTopContent";
import {
  useCreateRecieptMutation,
  useGetAllMebersQuery,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { changeStringToNumber } from "../../../helper/helper";

const CreateReceipt = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { data } = useGetAllMebersQuery();
  const membersList = data?.data || [];

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");

  const [
    createReciept,
    { data: recieptPrintData, isLoading, isError, error, isSuccess },
  ] = useCreateRecieptMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createReciept(values).unwrap();
      resetForm();
      setSelectedPaymentMode("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  // ✅ Dynamic form fields
  const formList = useMemo(() => {
    const baseFields = [
      {
        label: "Member ID",
        type: "select",
        name: "memberId",
        id: "memberId",
        options:
          membersList?.map((curMember) => ({
            value: changeStringToNumber(curMember?.id),
            label: `${curMember.firstName} ${curMember.lastName} (${curMember?.id})`,
          })) || [],
        onChange: (e, formikHandleChange, formikValues, setFieldValue) => {
          const selectedMemberId = Number(e.target.value);
                    setFieldValue("memberId", selectedMemberId);

          const selectedMember = membersList.find(
            (member) => member.id === selectedMemberId
          );
          console.log("selectedMember",selectedMember)

          if (selectedMember) {
            setFieldValue(
              "accountId",
              selectedMember?.bankAccountDetails?.accountNumber || ""
            );
            setFieldValue(
              "bankName",
              selectedMember?.bankAccountDetails?.bankName || ""
            );
            setFieldValue("branchName", selectedMember?.branch?.name || "");
            setFieldValue(
              "memberName",
              `${selectedMember?.firstName || ""} ${
                selectedMember?.lastName || ""
              }`
            );
          }
        },
      },
      {
        label: "Account Number",
        type: "number",
        placeholder: "Auto-filled Account Number",
        name: "accountId",
        id: "accountId",
        disabled: true,
      },
      {
        label: "Member Name",
        readOnly: true,
        disabled: true,
        placeholder: "Auto-filled after selecting Member",
        name: "memberName",
        id: "memberName",
      },
      {
        label: "Transaction Type",
        type: "select",
        name: "transactionType",
        id: "transactionType",
        options: [
          { label: "Deposit", value: "deposit" },
          { label: "Withdrawal", value: "withdrawal" },
        ],
      },
      {
        label: "Receipt Date",
        type: "date",
        name: "reciptDate",
        id: "reciptDate",
      },
      {
        label: "Amount",
        type: "number",
        name: "amount",
        placeholder: "Enter Amount",
        id: "amount",
      },
      {
        label: "Mode Of Payment",
        type: "select",
        name: "paymentMode",
        id: "paymentMode",
        options: [
          { label: "Cash", value: "cash" },
          { label: "Cheque", value: "cheque" },
          { label: "Online", value: "online" },
        ],
        onChange: (e, formikHandleChange) => {
          const mode = e.target.value;
          setSelectedPaymentMode(mode);
          formikHandleChange(e);
        },
      },
    ];

    // ✅ Conditionally show cheque number if mode is cheque
    if (selectedPaymentMode === "cheque") {
      baseFields.push({
        label: "Cheque Number",
        type: "number",
        name: "chequeNumber",
        placeholder: "Enter Cheque Number",
        id: "chequeNumber",
      });
    }

    // ✅ Common fields
    baseFields.push(
      {
        label: "Bank Name",
        name: "bankName",
        disabled: true,
        placeholder: "Auto-filled Bank Name",
        id: "bankName",
      },
      {
        label: "Branch Name",
        name: "branchName",
        disabled: true,
        placeholder: "Auto-filled Branch Name",
        id: "branchName",
      },
      {
        label: "Remarks",
        type: "textarea",
        name: "remarks",
        placeholder: "Enter Remarks",
        id: "remarks",
      }
    );

    return baseFields;
  }, [membersList, selectedPaymentMode]);

  // ✅ Validation schema
  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    accountId: Yup.string().required("Account number is required"),
    transactionType: Yup.string().required("Transaction type is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    paymentMode: Yup.string().required("Mode of payment is required"),
    chequeNumber: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Number is required"),
    }),
  });

  // ✅ Initial form values
  const initialValues = {
    memberId: "",
    accountId: "",
    memberName: "",
    transactionType: "",
    reciptDate: "",
    amount: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
    branchName: "",
    remarks: "",
  };

  return (
    <PagesMainContainerStyle>
      <PageTopContent title="Create Receipt" />

      <DynamicForm
        formList={formList}
        validationSchema={validationSchema}
        initialValues={initialValues}
        actionButtonText="Create Receipt"
        isLoading={isLoading}
        texting="Creating"
        handleSubmit={handleSubmit}
      />

      <ErrorAndSuccessUseEffect
        isError={isError}
        error={error}
        isSuccess={isSuccess}
        data={recieptPrintData}
        setSnackbar={setSnackbar}
        whereToNavigate="/saving-accounts/receipt-print"
      />

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
    </PagesMainContainerStyle>
  );
};

export default CreateReceipt;
