import { Alert, Snackbar, styled } from "@mui/material";
import PageTopHeader from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import { useAddNewFdNomineeMutation, useGetSingleUserFdNonineeDetailsQuery } from "../../../../features/api/fdAccounts";

const UpdateFdNominee = () => {
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

  const {
    data: nomineeDetails,
    isLoading: isNomineeLoading,
    isFetching: isNomineeFetching,
  } = useGetSingleUserFdNonineeDetailsQuery({id}, {
    refetchOnMountOrArgChange: true,
  });

  const detailsOfNominee = nomineeDetails?.data || {};

  const formList = useMemo(() => {
    return [
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
  }, []);

  const initialValues = useMemo(
    () => ({
      nomineeName: detailsOfNominee.nomineeName || "",
      nomineeRelation: detailsOfNominee.nomineeRelation || "",
      nomineeMobile: detailsOfNominee.nomineeMobile || "",
      nomineeAadhar: detailsOfNominee.nomineeAadhar || "",
      nomineeVoterId: detailsOfNominee.nomineeVoterId || "",
      nomineePan: detailsOfNominee.nomineePan || "",
      nomineeRationCard: detailsOfNominee.nomineeRationCard || "",
      nomineeAddress: detailsOfNominee.nomineeAddress || "",
    }),
    [detailsOfNominee]
  );

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
      await addNewFdNominee({ id:detailsOfNominee?.fdAccountId, values });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <AddNomineeMainContainer>
      <PageTopHeader title="Edit Nominee" />

      {!isNomineeLoading && !isNomineeFetching ? (
        <DynamicForm
          handleSubmit={handleSubmit}
          formList={formList}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          actionButtonText="Update Nominee"
          texting="Updating"
          isLoading={isLoading}
        />
      ) : (
        <p style={{ textAlign: "center", fontSize: "16px", marginTop: "30px" }}>
          Loading nominee details...
        </p>
      )}

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

export default UpdateFdNominee;

const AddNomineeMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});
