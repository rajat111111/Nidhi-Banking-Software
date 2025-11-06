import { Alert, Snackbar, styled } from "@mui/material";
import PageTopHeader from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import ErrorAndSuccessUseEffect from "../../../../components/ErrorAndSuccessUseEffect";
import {
  useAddRdNomineeMutation,
  useGetRdNomineesQuery,
} from "../../../../features/api/rdAccounts";

const UpdateRdNominee = () => {
  const { id } = useParams();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    addRdNominee,
    { data, isLoading, isError, isSuccess, error },
  ] = useAddRdNomineeMutation();

  const {
    data: nomineeDetails,
    isLoading: isNomineeLoading,
    isFetching: isNomineeFetching,
  } = useGetRdNomineesQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const detailsOfNominee = nomineeDetails?.data[0] || []


  const formList = useMemo(
    () => [
      { label: "Nominee Name", placeholder: "Enter Nominee Name", name: "name" },
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
    ],
    []
  );

  const initialValues = useMemo(
    () => ({
      name: detailsOfNominee?.name || "",
      relation: detailsOfNominee?.relation || "",
      mobile: detailsOfNominee?.mobile || "",
      aadharNumber: detailsOfNominee?.aadharNumber || "",
      voterId: detailsOfNominee?.voterId || "",
      panNumber: detailsOfNominee?.panNumber || "",
      rationCardNumber: detailsOfNominee?.rationCardNumber || "",
      address: detailsOfNominee?.address || "",
    }),
    [detailsOfNominee]
  );

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
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN number (e.g., ABCDE1234F)"),

    voterId: Yup.string()
      .nullable()
      .matches(/^[A-Z]{3}[0-9]{7}$/, {
        message: "Enter a valid Voter ID (e.g., ABC1234567)",
        excludeEmptyString: true,
      }),
  });

  const handleSubmit = async (values) => {
    try {
      await addRdNominee({ id, values }).unwrap();
    } catch (error) {
      console.error("Error while updating nominee:", error);
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
          enableReinitialize
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
        whereToNavigate="/rd-accounts"
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
          severity={snackbar.severity || "info"}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AddNomineeMainContainer>
  );
};

export default UpdateRdNominee;

const AddNomineeMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});
