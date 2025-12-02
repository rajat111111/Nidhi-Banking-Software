import { useState, useMemo } from "react";
import * as Yup from "yup";
import PageTopContent from "../../../components/PageTopContent";
import DynamicForm from "../../../components/DynamicForm";
import {
  useAddNewSavingAccountMutation,
  useGetAllMebersQuery,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import {
  changeStringToNumber,
  lowerCaseAndRemoveTrailingS,
} from "../../../helper/helper";

const AddNewAccount = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [paymentMode, setPaymentMode] = useState("");
  const { data: membersData } = useGetAllMebersQuery();
  const [
    addNewSavingAccount,
    { data: addNewSavingAccountData, isLoading, isSuccess, isError, error },
  ] = useAddNewSavingAccountMutation();

  const membersList = membersData?.data || [];

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    branchId: Yup.string().required("Branch name is required"),
    agentId: Yup.string().required("Agent name is required"),
    accountType: Yup.string().required("Account type is required"),
    depositAmount: Yup.number().required("Deposit amount is required"),
    openDate: Yup.date().required("Open date is required"),
    transactionDate: Yup.date().required("Transaction date is required"),
    paymentMode: Yup.string().required("Select a payment mode"),
    cashAmount: Yup.string().when("paymentMode", {
      is: "cash",
      then: (schema) => schema.required("Cash Amount is required"),
    }),
    checkNumber: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Number is required"),
    }),
    checkDate: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Cheque Date is required"),
    }),
    bankName: Yup.string().when("paymentMode", {
      is: "cheque",
      then: (schema) => schema.required("Bank Name is required"),
    }),
    onlineTransactionDate: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) => schema.required("Online Transaction Date is required"),
    }),
    onlineTransactionNumber: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) =>
        schema.required("Online Transaction Number is required"),
    }),
    onlineTransctionMode: Yup.string().when("paymentMode", {
      is: "online",
      then: (schema) => schema.required("Online Transaction Mode is required"),
    }),
  });

  // ✅ Initial Values
  const initialValues = {
    memberId: "",
    branchId: "",
    agentId: "",
    accountType: "",
    depositAmount: "",
    openDate: "",
    transactionDate: "",
    paymentMode: "",
    cashAmount: "",
    checkNumber: "",
    checkDate: "",
    bankName: "",
    onlineTransactionDate: "",
    onlineTransactionNumber: "",
    onlineTransctionMode: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addNewSavingAccount(values).unwrap();
      resetForm();
      setPaymentMode("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const formList = useMemo(() => {
    const baseFields = [
      {
        label: "Member",
        name: "memberId",
        placeholder: "Select Member",
        type: "select",
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
            setFieldValue("branchId", selectedMember.branch?.id || "");
            setFieldValue(
              "agentId",
              selectedMember.agent?.id ||
              selectedMember.csp?.id ||
              selectedMember.employee?.id ||
              ""
            );
            setFieldValue(
              "accountType",
              lowerCaseAndRemoveTrailingS(
                selectedMember.bankAccountDetails?.accountType
              ) || ""
            );
          }
        },
      },
      {
        label: "Branch ID",
        name: "branchId",
        placeholder: "Branch Name",
        disabled: true,
      },
      {
        label: "Agent ID",
        name: "agentId",
        placeholder: "Agent Name",
        disabled: true,
      },
      {
        label: "Account Type",
        name: "accountType",
        placeholder: "Account Type",
        disabled: true,
      },
      {
        label: "Deposit Amount",
        name: "depositAmount",
        placeholder: "Enter Deposit Amount",
        type: "number",
      },
      {
        label: "Open Date",
        name: "openDate",
        type: "date",
      },
      {
        label: "Transaction Date",
        name: "transactionDate",
        type: "date",
      },
      {
        label: "Payment Mode",
        name: "paymentMode",
        type: "select",
        options: [
          { label: "Cash", value: "cash" },
          { label: "Cheque", value: "cheque" },
          { label: "Online Transaction", value: "online" },
        ],
        onChange: (e, formikHandleChange) => {
          setPaymentMode(e.target.value);
          formikHandleChange(e);
        },
      },
    ];

    // Conditional Fields
    if (paymentMode === "cash") {
      baseFields.push({
        label: "Cash Amount",
        name: "cashAmount",
        placeholder: "Enter Cash Amount",
        type: "number",
      });
    }

    if (paymentMode === "cheque") {
      baseFields.push(
        {
          label: "Cheque Number",
          name: "checkNumber",
          placeholder: "Enter Cheque Number",
        },
        {
          label: "Cheque Date",
          name: "checkDate",
          type: "date",
        },
        {
          label: "Bank Name",
          name: "bankName",
          placeholder: "Enter Bank Name",
        }
      );
    }

    if (paymentMode === "online") {
      baseFields.push(
        {
          label: "Online Transaction Date",
          name: "onlineTransactionDate",
          type: "date",
        },
        {
          label: "Online Transaction Number",
          name: "onlineTransactionNumber",
          placeholder: "Enter Transaction Number",
          type: "number",
        },
        {
          label: "Online Transaction Mode",
          name: "onlineTransctionMode",
          placeholder: "Enter Transaction Mode",
        }
      );
    }

    return baseFields;
  }, [paymentMode, membersList]);

  return (
    <div style={{ padding: "20px" }}>
      <PageTopContent title="New Account" />
      <DynamicForm
        headerTitle=""
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        actionButtonText="Create Account"
        texting="Creating"
        isLoading={isLoading}
      />
      <ErrorAndSuccessUseEffect
        setSnackbar={setSnackbar}
        data={addNewSavingAccountData}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        whereToNavigate="/saving-accounts/approval"
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
    </div>
  );
};

export default AddNewAccount;
