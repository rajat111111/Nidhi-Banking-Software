import { Alert, Snackbar, styled } from "@mui/material";
import PageTopHeader from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { useAddNomineeOfASingleMemberMutation } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useAddRdNomineeMutation } from "../../../../features/api/rdAccounts";

const AddRdNominee = () => {
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [addRdNominee, { data, isLoading, isError, isSuccess, error }] =
    useAddRdNomineeMutation();

  const formList = useMemo(() => {
    const baseFields = [
      {
        label: "Nominee Name",
        placeholder: "Enter Nominee Name",
        name: "name",
      },
      {
        label: "Nominee Relation",
        placeholder: "Enter Nominee Relation",
        name: "relation",
      },
      {
        label: "Mobile Number",
        placeholder: "Enter Mobile Number",
        name: "mobile",
        type: "number",
      },
      {
        label: "Nominee Aadhar Number",
        placeholder: "Enter Aadhar Number",
        name: "aadharNumber",
        type: "number",
      },
      {
        label: "Nominee Voter ID Number",
        placeholder: "Enter Voter ID Number",
        name: "voterId",
      },
      {
        label: "Nominee Pan Number",
        placeholder: "Enter Pan Number",
        name: "panNumber",
      },
      {
        label: "Nominee Ration Card Number",
        placeholder: "Enter Ration Card Number",
        name: "rationCardNumber",
      },
      {
        label: "Nominee Address",
        placeholder: "Enter Nominee Address Details",
        name: "address",
      },
    ];
    return baseFields;
  }, []);

  const initialValues = {
    name: "",
    relation: "",
    mobile: "",
    aadharNumber: "",
    voterId: "",
    panNumber: "",
    rationCardNumber: "",
    address: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nominee Name is required"),
    relation: Yup.string().required("Nominee Relation is required"),

    mobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    aadharNumber: Yup.string()
      .required("Aadhar Number is required")
      .matches(/^\d{12}$/, "Aadhar Number must be a valid 12-digit number"),

    panNumber: Yup.string()
      .required("PAN Number is required")
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Enter a valid PAN number (e.g., ABCDE1234F)"
      ),

    voterId: Yup.string()
      .nullable()
      .matches(/^[A-Z]{3}[0-9]{7}$/, {
        message: "Enter a valid Voter ID (e.g., ABC1234567)",
        excludeEmptyString: true,
      }),
  });

  const handleSubmit = async (values) => {
    try {
      await addRdNominee({ values, id });
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
        whereToNavigate="/rd-accounts"
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

export default AddRdNominee;

const AddNomineeMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});
