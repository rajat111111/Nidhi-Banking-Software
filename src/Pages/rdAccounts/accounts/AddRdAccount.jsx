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

const AddRdAccount = () => {
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
    // ✅ Switch group initial values
    openLessMinAmount: false,
    deductTds: false,
    autoRenew: false,
    accountOnHold: false,
    seniorCitizen: false,
    jointAccount: false,
    nominee: false,
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
        label: "Plan Name",
        name: "planName",
        type: "select",
        options: [],
      },
      {
        label: "Open RD with Less than Minimum Amount",
        name: "openLessMinAmount",
        type: "switch",
      },
      {
        label: "Amount",
        name: "amount",
        placeholder: "Enter Amount",
      },
      
       {
        label: "Open Date",
        name: "openDate",
        type: "date",
      },
      {
        label: "Account Settings",
        isSwitchGroup: true,
        
        switches: [
          { label: "Deduct TDS", name: "deductTds" },
          { label: "Auto Renew", name: "autoRenew" },
          { label: "Account on Hold", name: "accountOnHold" },
          { label: "Senior Citizen", name: "seniorCitizen" },
          { label: "Joint Account", name: "jointAccount" },
          { label: "Nominee", name: "nominee" },
        ],
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
        { label: "Cheque Date", name: "checkDate", type: "date" },
        { label: "Bank Name", name: "bankName", placeholder: "Enter Bank Name" }
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
          placeholder:"Enter Online Transaction Number ",
          type: "number",
        },
        { label: "Online Transaction Mode", type:"select",options:[
            {
                label:"UPI",value:"upi"
            },
            {
                label:"Card",value:"card"
            },
        ] ,name: "onlineTransctionMode" }
      );
    }

    return baseFields;
  }, [paymentMode, membersList]);

  return (
    <div style={{ padding: "20px" }}>
      <PageTopContent title="New Recurring Deposit" />
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

export default AddRdAccount;
