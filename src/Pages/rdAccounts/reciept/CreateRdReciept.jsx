import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import DynamicForm from "../../../components/DynamicForm";
import PageTopContent from "../../../components/PageTopContent";
import {
  useGetAllMebersQuery,
} from "../../../features/api/savingAccounts";
import { useCreateRdRecieptPrintMutation } from "../../../features/api/rdAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { changeStringToNumber } from "../../../helper/helper";

const CreateRdReciept = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { data } = useGetAllMebersQuery();
  const membersList = data?.data || [];

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedMemberAccounts, setSelectedMemberAccounts] = useState([]);

  const [
    createReciept,
    { data: recieptPrintData, isLoading, isError, error, isSuccess },
  ] = useCreateRdRecieptPrintMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createReciept(values).unwrap();
      resetForm();
      setSelectedPaymentMode("");
      setSelectedMemberAccounts([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const formList = useMemo(() => {
    const baseFields = [
      // SELECT MEMBER
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

          if (selectedMember) {
            // --- STORE RD ACCOUNTS FOR THE DROPDOWN ---
            const rdAccounts = selectedMember?.rdAccounts || [];
            setSelectedMemberAccounts(rdAccounts);

            // Auto populate values
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

            // Reset accountNumber so user can choose from dropdown
            setFieldValue("accountNumber", "");
          }
        },
      },

      // RD ACCOUNT NUMBER DROPDOWN (FILLED DYNAMICALLY)
     {
  label: "RD Account Number",
  type: "select",
  placeholder: "Select RD Account",
  name: "accountNumber",
  id: "accountNumber",
  options:
    selectedMemberAccounts.length > 0
      ? selectedMemberAccounts.map((acc) => ({
          value: acc.accountNumber,
          label: acc.accountNumber,
        }))
      : [
          {
            label: "No RD Account Found",
            value: "",
          },
        ],
},


      {
        label: "Member Name",
        readOnly: true,
        disabled: true,
        placeholder: "Auto-filled",
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

      // PAYMENT MODE
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

    // CHEQUE FIELD IF USER SELECTS CHEQUE
    if (selectedPaymentMode === "cheque") {
      baseFields.push({
        label: "Cheque Number",
        type: "number",
        name: "chequeNumber",
        placeholder: "Enter Cheque Number",
        id: "chequeNumber",
      });
    }

    // AUTO FILLED FIELDS
    baseFields.push(
      {
        label: "Bank Name",
        name: "bankName",
        disabled: true,
        placeholder: "Bank Name",
        id: "bankName",
      },
      {
        label: "Branch Name",
        name: "branchName",
        disabled: true,
        placeholder: "Branch Name",
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
  }, [membersList, selectedPaymentMode, selectedMemberAccounts]);

  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    accountNumber: Yup.string().required("Account number is required"),
    transactionType: Yup.string().required("Transaction type is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    paymentMode: Yup.string().required("Payment mode is required"),
    chequeNumber: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque number is required"),
    }),
  });

  const initialValues = {
    memberId: "",
    accountNumber: "",
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
      <PageTopContent title="Create RD Receipt" />

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
        whereToNavigate="/rd-accounts/receipt-print"
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

export default CreateRdReciept;
