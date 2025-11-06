import { Alert, Snackbar, styled } from "@mui/material";
import PageTopHeader from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useAddNewFdNomineeMutation } from "../../../../features/api/fdAccounts";

const AddFdNominee = () => {
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    addNewFdNominee,
    { data, isLoading, isError, isSuccess, error },
  ] = useAddNewFdNomineeMutation();

  const formList = useMemo(() => {
    const baseFields = [
      {
        label: "Nominee Name",
        placeholder: "Enter Nominee Name",
        name: "nomineeName",
      },
      {
        label: "Nominee Relation",
        placeholder: "Enter Nominee Relation",
        name: "nomineeRelation",
      },
      {
        label: "Mobile Number",
        placeholder: "Enter Mobile Number",
        name: "nomineeMobile",
        type: "number",
      },
      {
        label: "Nominee Aadhar Number",
        placeholder: "Enter Aadhar Number",
        name: "nomineeAadhar",
        type: "number",
      },
      {
        label: "Nominee Voter ID Number",
        placeholder: "Enter Voter ID Number",
        name: "nomineeVoterId",
      },
      {
        label: "Nominee Pan Number",
        placeholder: "Enter Pan Number",
        name: "nomineePan",
      },
      {
        label: "Nominee Ration Card Number",
        placeholder: "Enter Ration Card Number",
        name: "nomineeRationCard",
      },
      {
        label: "Nominee Address",
        placeholder: "Enter Nominee Address Details",
        name: "nomineeAddress",
      },
    ];
    return baseFields;
  }, []);

  const initialValues = {
    nomineeName: "",
    nomineeRelation: "",
    nomineeMobile: "",
    nomineeAadhar: "",
    nomineeVoterId: "",
    nomineePan: "",
    nomineeRationCard: "",
    nomineeAddress: "",
  };

  const validationSchema = Yup.object({
    nomineeName: Yup.string().required("Nominee Name is required"),
    nomineeRelation: Yup.string().required("Nominee Relation is required"),

    nomineeMobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    nomineeAadhar: Yup.string()
      .required("Aadhar Number is required")
      .matches(/^\d{12}$/, "Aadhar Number must be a valid 12-digit number"),

    nomineePan: Yup.string()
      .required("PAN Number is required")
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Enter a valid PAN number (e.g., ABCDE1234F)"
      ),

    nomineeVoterId: Yup.string()
      .nullable()
      .matches(/^[A-Z]{3}[0-9]{7}$/, {
        message: "Enter a valid Voter ID (e.g., ABC1234567)",
        excludeEmptyString: true,
      }),
  });

  const handleSubmit = async (values) => {
    try {
      await addNewFdNominee({ values, id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <AddNomineeMainContainer>
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
        whereToNavigate="/fd-accounts"
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
    </AddNomineeMainContainer>
  );
};

export default AddFdNominee;

const AddNomineeMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});
