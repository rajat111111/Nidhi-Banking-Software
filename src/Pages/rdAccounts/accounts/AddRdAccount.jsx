import { useState, useMemo } from "react";
import * as Yup from "yup";
import PageTopContent from "../../../components/PageTopContent";
import DynamicForm from "../../../components/DynamicForm";
import { useGetAllMebersQuery } from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import {
  changeStringToNumber,
  lowerCaseAndRemoveTrailingS,
} from "../../../helper/helper";
import { useCreateRdAccountMutation } from "../../../features/api/rdAccounts";

const AddRdAccount = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [paymentMode, setPaymentMode] = useState("");
  const [showNominee, setShowNominee] = useState(false);

  const { data: membersData } = useGetAllMebersQuery();

  const [
    createRdAccount,
    { data: newRdAccountData, isLoading, isSuccess, isError, error },
  ] = useCreateRdAccountMutation();

  const membersList = membersData?.data || [];

  // ---------------------- VALIDATION SCHEMA ----------------------
  const validationSchema = Yup.object({
    memberId: Yup.number().required("Member is required"),
    branchId: Yup.string().required("Branch name is required"),
    agentId: Yup.string().required("Agent name is required"),
    accountType: Yup.string().required("Account type is required"),
    amount: Yup.number().required("Deposit amount is required").positive(),
    startDate: Yup.date().required("Start date is required"),
    transactionDate: Yup.date().required("Transaction date is required"),
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

  // ---------------------- INITIAL VALUES ----------------------
  const initialValues = {
    memberId: "",
    branchId: "",
    agentId: "",
    cspId: null,
    employeeId: null,
    accountType: "",

    amount: "",
    startDate: "",
    transactionDate: "",
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
    onHold: false,
    seniorCitizen: false,
    jointAccount: false,

    nomineeName: "",
    nomineeRelation: "",
    nomineeMobile: "",
    nomineeAadhar: "",
    nomineeVoterId: "",
    nomineePan: "",
    nomineeRationCard: "",
  };

  // ---------------------- HANDLE SUBMIT ----------------------
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

      await createRdAccount(payload).unwrap();
      resetForm();
      setPaymentMode("");
      setShowNominee(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  // ---------------------- FORM FIELDS ----------------------
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
        onChange: (e, handleChange, values, setFieldValue) => {
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

      { label: "Branch", name: "branchId", disabled: true },
      { label: "Agent", name: "agentId", disabled: true },

      {
        label: "Amount",
        name: "amount",
        placeholder: "Enter Amount",
        type: "number",
      },
      { label: "Open Date", name: "startDate", type: "date" },
      { label: "Transaction Date", name: "transactionDate", type: "date" },

      {
        label: "Account Settings",
        isSwitchGroup: true,
        switches: [
          { label: "Deduct TDS", name: "deductTds" },
          { label: "Auto Renew", name: "autoRenew" },
          { label: "On Hold", name: "onHold" },
          { label: "Senior Citizen", name: "seniorCitizen" },
          { label: "Joint Account", name: "jointAccount" },
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
        onChange: (e, handleChange) => {
          setPaymentMode(e.target.value);
          handleChange(e);
        },
      },
    ];

    // ---------------------- CASH ----------------------
    if (paymentMode === "cash") {
      baseFields.push({
        label: "Cash Amount",
        name: "cashAmount",
        type: "number",
        placeholder: "Enter Cash Amount",
      });
    }

    // ---------------------- CHEQUE ----------------------
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

    // ---------------------- ONLINE ----------------------
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
        },
        {
          label: "Online Mode",
          name: "onlineTransactionMode",
          type: "select",
          options: [
            { label: "UPI", value: "upi" },
            { label: "Card", value: "card" },
          ],
        }
      );
    }

    // ---------------------- NOMINEE ----------------------
    if (showNominee) {
      baseFields.push(
        {
          label: "Nominee Name",
          name: "nomineeName",
        },
        {
          label: "Nominee Relation",
          name: "nomineeRelation",
        },
        {
          label: "Nominee Mobile",
          name: "nomineeMobile",
          type: "number",
        },
        {
          label: "Nominee Aadhar",
          name: "nomineeAadhar",
          type: "number",
        },
        {
          label: "Nominee Voter ID",
          name: "nomineeVoterId",
        },
        {
          label: "Nominee PAN",
          name: "nomineePan",
        },
        {
          label: "Nominee Ration Card",
          name: "nomineeRationCard",
        }
      );
    }

    return baseFields;
  }, [paymentMode, membersList, showNominee]);

  return (
    <div style={{ padding: "20px" }}>
      <PageTopContent title="New RD Account" />

      <DynamicForm
        headerTitle=""
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        actionButtonText="Create RD Account"
        texting="Creating"
        isLoading={isLoading}
      />

      <ErrorAndSuccessUseEffect
        setSnackbar={setSnackbar}
        data={newRdAccountData}
        error={error}
        isSuccess={isSuccess}
        isError={isError}
        whereToNavigate="/rd-accounts/approval"
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

export default AddRdAccount;
