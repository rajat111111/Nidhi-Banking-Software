import { Alert, Snackbar, styled } from "@mui/material";
import { useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import PageTopHeader from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";

import { useAddNomineeOfASingleMemberMutation } from "../../../../features/api/savingAccounts";

// ───────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────
const AddNominee = () => {
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [addNominee, { data, isLoading, isError, isSuccess, error }] =
    useAddNomineeOfASingleMemberMutation();

  // ───────────────────────────────────────────────
  // Form Fields (memoized for performance)
  // ───────────────────────────────────────────────
  const formList = useMemo(
    () => [
      { label: "Nominee Name", name: "nomineeName", placeholder: "Enter Nominee Name" },
      { label: "Nominee Relation", name: "nomineeRelation", placeholder: "Enter Nominee Relation" },
      { label: "Mobile Number", name: "nomineeMobile", placeholder: "Enter Mobile Number", type: "number" },
      { label: "Nominee Aadhar Number", name: "nomineeAadhar", placeholder: "Enter Aadhar Number", type: "number" },
      { label: "Nominee Voter ID Number", name: "nomineeVoterId", placeholder: "Enter Voter ID Number" },
      { label: "Nominee PAN Number", name: "nomineePan", placeholder: "Enter PAN Number" },
      { label: "Nominee Ration Card Number", name: "nomineeRationCard", placeholder: "Enter Ration Card Number" },
      { label: "Nominee Address", name: "nomineeAddress", placeholder: "Enter Address Details" },
    ],
    []
  );

  // ───────────────────────────────────────────────
  // Initial Values & Validation Schema
  // ───────────────────────────────────────────────
  const initialValues = useMemo(
    () => ({
      nomineeName: "",
      nomineeRelation: "",
      nomineeMobile: "",
      nomineeAadhar: "",
      nomineeVoterId: "",
      nomineePan: "",
      nomineeRationCard: "",
      nomineeAddress: "",
    }),
    []
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        nomineeName: Yup.string().required("Nominee Name is required"),
        nomineeRelation: Yup.string().required("Nominee Relation is required"),

        nomineeMobile: Yup.string()
          .required("Mobile Number is required")
          .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

        nomineeAadhar: Yup.string()
          .required("Aadhar Number is required")
          .matches(/^\d{12}$/, "Aadhar Number must be 12 digits"),

        nomineePan: Yup.string()
          .required("PAN Number is required")
          .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter valid PAN (e.g., ABCDE1234F)"),

        nomineeVoterId: Yup.string()
          .nullable()
          .matches(/^[A-Z]{3}[0-9]{7}$/, {
            message: "Enter valid Voter ID (e.g., ABC1234567)",
            excludeEmptyString: true,
          }),
      }),
    []
  );

  // ───────────────────────────────────────────────
  // Handlers
  // ───────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (values) => {
      try {
        await addNominee({ values, id }).unwrap();
      } catch (err) {
        console.error("Failed to add nominee:", err);
      }
    },
    [addNominee, id]
  );

  const handleCloseSnackbar = useCallback(
    () => setSnackbar((prev) => ({ ...prev, open: false })),
    []
  );

  // ───────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────
  return (
    <MainContainer>
      <PageTopHeader title="Add New Nominee" />

      <DynamicForm
        handleSubmit={handleSubmit}
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Add Nominee"
        texting="Adding"
        isLoading={isLoading}
      />

      <ErrorAndSuccessUseEffect
        isError={isError}
        setSnackbar={setSnackbar}
        isSuccess={isSuccess}
        error={error}
        data={data}
        whereToNavigate="/saving-accounts"
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
    </MainContainer>
  );
};

export default AddNominee;

// ───────────────────────────────────────────────
// Styled Component
// ───────────────────────────────────────────────
const MainContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  paddingBottom: theme.spacing(4),
}));
