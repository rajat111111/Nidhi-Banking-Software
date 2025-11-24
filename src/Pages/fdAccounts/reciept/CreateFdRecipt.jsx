import { useMemo, useState } from "react";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import DynamicForm from "../../../components/DynamicForm";
import PageTopContent from "../../../components/PageTopContent";
import {
  useGetAllMebersQuery,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { changeStringToNumber } from "../../../helper/helper";
import { useCreateFdRecieptPrintMutation } from "../../../features/api/fdAccounts";

const CreateFdReceipt = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const { data } = useGetAllMebersQuery();
  const membersList = data?.data || [];

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedMemberFdAccounts, setSelectedMemberFdAccounts] = useState([]);

  const [
    createFdRecieptPrint,
    { data: recieptPrintData, isLoading, isError, error, isSuccess },
  ] = useCreateFdRecieptPrintMutation();

  // 🔧 Handle Form Submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        memberId: changeStringToNumber(values.memberId),
        amount: Number(values.amount),
      };

      await createFdRecieptPrint(payload).unwrap();

      resetForm();
      setSelectedPaymentMode("");
      setSelectedMemberFdAccounts([]);
    } catch (error) {
      console.error("FD Receipt Creation Error:", error);
    }
  };

  // 🧠 Dynamic Form Fields
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
            // Set FD Accounts
            const fdAccounts = selectedMember?.fdAccounts || [];
            setSelectedMemberFdAccounts(fdAccounts);

            // Clear dropdown value
            setFieldValue("accountNumber", "");

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

      // FD ACCOUNT NUMBER (DYNAMIC)
      {
        label: "FD Account Number",
        type: "select",
        name: "accountNumber",
        id: "accountNumber",
        options:
          selectedMemberFdAccounts.length > 0
            ? selectedMemberFdAccounts.map((acc) => ({
                value: acc.accountNumber,
                label: acc.accountNumber,
              }))
            : [
                {
                  label: "No FD Account Found",
                  value: "",
                },
              ],
      },

      {
        label: "Member Name",
        type: "text",
        name: "memberName",
        id: "memberName",
        disabled: true,
        placeholder: "Auto-filled after selecting Member",
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
        name: "receiptDate",
        id: "receiptDate",
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

    // IF CHEQUE MODE → SHOW CHEQUE FIELD
    if (selectedPaymentMode === "cheque") {
      baseFields.push({
        label: "Cheque Number",
        type: "number",
        name: "chequeNumber",
        id: "chequeNumber",
        placeholder: "Enter Cheque Number",
      });
    }

    baseFields.push(
      {
        label: "Bank Name",
        type: "text",
        name: "bankName",
        id: "bankName",
        disabled: true,
        placeholder: "Auto-filled Bank Name",
      },
      {
        label: "Branch Name",
        type: "text",
        name: "branchName",
        id: "branchName",
        disabled: true,
        placeholder: "Auto-filled Branch Name",
      },
      {
        label: "Remarks",
        type: "textarea",
        name: "remarks",
        id: "remarks",
        placeholder: "Enter Remarks",
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        id: "status",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Approve", value: "approve" },
          { label: "Reject", value: "reject" },
        ],
      }
    );

    return baseFields;
  }, [membersList, selectedPaymentMode, selectedMemberFdAccounts]);

  // ✔ VALIDATION
  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    accountNumber: Yup.string().required("FD Account Number is required"),
    transactionType: Yup.string().required("Transaction type is required"),
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
    paymentMode: Yup.string().required("Mode of payment is required"),
    chequeNumber: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Number is required"),
    }),
  });

  // ✔ INITIAL VALUES
  const initialValues = {
    memberId: "",
    accountNumber: "",
    memberName: "",
    transactionType: "",
    receiptDate: "",
    amount: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
    branchName: "",
    remarks: "",
    status: "",
  };

  return (
    <PagesMainContainerStyle>
      <PageTopContent title="Create FD Receipt" />

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
        whereToNavigate="/fd-accounts/receipt-print"
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

export default CreateFdReceipt;
