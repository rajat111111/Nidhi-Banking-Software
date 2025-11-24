import { useState, useMemo } from "react";
import * as Yup from "yup";
import PageTopContent from "../../../components/PageTopContent";
import DynamicForm from "../../../components/DynamicForm";
import { useGetAllMebersQuery } from "../../../features/api/savingAccounts";
import { useCreateFdAccountMutation } from "../../../features/api/fdAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import {
  changeStringToNumber,
  lowerCaseAndRemoveTrailingS,
} from "../../../helper/helper";

const AddFdAccount = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [paymentMode, setPaymentMode] = useState("");
  const [showNominee, setShowNominee] = useState(false);

  const { data: membersData } = useGetAllMebersQuery();
  const [
    createFdAccount,
    { data: newFdAccountData, isLoading, isSuccess, isError, error },
  ] = useCreateFdAccountMutation();

  const membersList = membersData?.data || [];
  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    branchId: Yup.string().required("Branch name is required"),
    agentId: Yup.string().required("Agent name is required"),
    accountType: Yup.string().required("Account type is required"),
    depositAmount: Yup.number()
      .required("Deposit amount is required")
      .positive(),
    startDate: Yup.date().required("Start date is required"),
    maturityDate: Yup.date().required("Maturity date is required"),
    interestRate: Yup.number().required("Interest rate is required"),
    paymentMode: Yup.string().required("Select a payment mode"),
    ...(showNominee && {
      nomineeName: Yup.string().required("Nominee name is required"),
      nomineeRelation: Yup.string().required("Nominee relation is required"),
      nomineeMobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Nominee mobile is required"),
      nomineeAadhar: Yup.string()
        .matches(/^[0-9]{12}$/, "Enter a valid 12-digit Aadhar number")
        .required("Nominee Aadhar is required"),
      nomineeVoterId: Yup.string().required("Nominee Voter ID is required"),
      nomineePan: Yup.string()
        .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Enter a valid PAN number")
        .required("Nominee PAN is required"),
      nomineeRationCard: Yup.string().required(
        "Nominee Ration Card is required"
      ),
    }),
  });
  const initialValues = {
    memberId: "",
    branchId: "",
    agentId: "",
    accountType: "",
    depositAmount: "",
    startDate: "",
    maturityDate: "",
    interestRate: "",
    paymentMode: "",
    cashAmount: "",
    checkNumber: "",
    checkDate: "",
    bankName: "",
    onlineTransactionDate: "",
    onlineTransactionNumber: "",
    onlineTransactionMode: "",
    deductTds: false,
    autoRenew: false,
    accountOnHold: false,
    isSeniorCitizen: false,
    isJointAccount: false,
    nomineeName: "",
    nomineeRelation: "",
    nomineeMobile: "",
    nomineeAadhar: "",
    nomineeVoterId: "",
    nomineePan: "",
    nomineeRationCard: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        ...(showNominee
          ? {}
          : {
              nomineeName: null,
              nomineeRelation: null,
              nomineeMobile: null,
              nomineeAadhar: null,
              nomineeVoterId: null,
              nomineePan: null,
              nomineeRationCard: null,
            }),
      };

      await createFdAccount(payload).unwrap();
      resetForm();
      setPaymentMode("");
      setShowNominee(false);
    } catch (err) {
      console.error(err);
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
          membersList?.map((member) => ({
            value: changeStringToNumber(member?.id),
            label: `${member.firstName} ${member.lastName} (${member?.id})`,
          })) || [],
        onChange: (e, formikHandleChange, formikValues, setFieldValue) => {
          const selectedMemberId = Number(e.target.value);
          setFieldValue("memberId", selectedMemberId);

          const selectedMember = membersList.find(
            (m) => m.id === selectedMemberId
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
        label: "Branch",
        name: "branchId",
        placeholder: "Branch Name",
        disabled: true,
      },
      {
        label: "Agent",
        name: "agentId",
        placeholder: "Agent Name",
        disabled: true,
      },
      {
        label: "Account Type",
        name: "accountType",
        placeholder: "Enter Account Type",
        disabled: false,
      },
      {
        label: "Deposit Amount",
        name: "depositAmount",
        placeholder: "Enter Deposit Amount",
        type: "number",
      },
      {
        label: "Start Date",
        name: "startDate",
        type: "date",
      },
      {
        label: "Maturity Date",
        name: "maturityDate",
        type: "date",
      },
      {
        label: "Interest Rate (%)",
        name: "interestRate",
        placeholder: "Enter Interest Rate",
        type: "number",
      },
      {
        label: "Account Settings",
        isSwitchGroup: true,
        switches: [
          { label: "Deduct TDS", name: "deductTds" },
          { label: "Auto Renew", name: "autoRenew" },
          { label: "Account on Hold", name: "accountOnHold" },
          { label: "Senior Citizen", name: "isSeniorCitizen" },
          { label: "Joint Account", name: "isJointAccount" },
          {
            label: "Add Nominee",
            name: "showNominee",
            customSwitchHandler: (checked) => setShowNominee(checked),
            checked: showNominee,
          },
        ],
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
          placeholder: "Enter Online Transaction Number",
          type: "text",
        },
        {
          label: "Online Transaction Mode",
          name: "onlineTransactionMode",
          type: "select",
          options: [
            { label: "UPI", value: "upi" },
            { label: "Card", value: "card" },
          ],
        }
      );
    }

    if (showNominee) {
      baseFields.push(
        {
          label: "Nominee Name",
          name: "nomineeName",
          placeholder: "Enter Nominee Name",
        },
        {
          label: "Nominee Relation",
          name: "nomineeRelation",
          placeholder: "Enter Relation",
        },
        {
          label: "Nominee Mobile",
          name: "nomineeMobile",
          placeholder: "Enter Nominee Mobile",
          type: "number",
        },
        {
          label: "Nominee Aadhar",
          name: "nomineeAadhar",
          placeholder: "Enter Aadhar Number",
          type: "number",
        },
        {
          label: "Nominee Voter ID",
          name: "nomineeVoterId",
          placeholder: "Enter Voter ID",
        },
        {
          label: "Nominee PAN",
          name: "nomineePan",
          placeholder: "Enter PAN Number",
        },
        {
          label: "Nominee Ration Card",
          name: "nomineeRationCard",
          placeholder: "Enter Ration Card Number",
        }
      );
    }

    return baseFields;
  }, [paymentMode, membersList, showNominee]);

  return (
    <div style={{ padding: "20px" }}>
      <PageTopContent title="New Fixed Deposit" />
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
        data={newFdAccountData}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        whereToNavigate="/fd-accounts/approval"
      />
      {snackbar.open && (
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

export default AddFdAccount;
