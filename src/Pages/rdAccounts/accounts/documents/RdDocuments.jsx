import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import { Alert, CircularProgress, Grid, Snackbar, styled } from "@mui/material";
import FormLabel from "../../../../components/FormLabel";
import DynamicButton from "../../../../components/DynamicButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSubmitRdAccountDocsMutation } from "../../../../features/api/rdAccounts";

const RdDocuments = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [
    submitRdAccountDocs,
    { isError, isLoading, isSuccess, error, data },
  ] = useSubmitRdAccountDocsMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const documentLists = [
    { label: "Pan Card", name: "panCard" },
    { label: "Aadhar Card", name: "aadharCard" },
    { label: "Voter ID", name: "voterId" },
    { label: "Bank Statement", name: "bankStatement" },
    { label: "Signature", name: "signature" },
    { label: "Driving License", name: "drivingLicense" },
    { label: "Photo", name: "photo" },
    { label: "Other", name: "other" },
    { label: "Other Document File", name: "otherDocumentFile" },
  ];

  const FILE_SIZE_1MB = 1 * 1024 * 1024;
  const FILE_SIZE_2MB = 2 * 1024 * 1024;
  const FILE_SIZE_3MB = 3 * 1024 * 1024;
  const FILE_SIZE_5MB = 5 * 1024 * 1024;

  const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const SUPPORTED_DOC_TYPES = ["application/pdf", ...SUPPORTED_IMAGE_TYPES];

  const validationSchema = Yup.object({
    panCard: Yup.mixed()
      .required("Pan Card is required")
      .test("fileSize", "Max 2MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_2MB : true
      )
      .test("fileType", "Only JPG, PNG, PDF allowed", (file) =>
        file ? SUPPORTED_DOC_TYPES.includes(file.type) : true
      ),

    aadharCard: Yup.mixed()
      .required("Aadhar Card is required")
      .test("fileSize", "Max 3MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_3MB : true
      )
      .test("fileType", "Only JPG, PNG, PDF allowed", (file) =>
        file ? SUPPORTED_DOC_TYPES.includes(file.type) : true
      ),

    voterId: Yup.mixed()
      .required("Voter ID is required")
      .test("fileSize", "Max 2MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_2MB : true
      )
      .test("fileType", "Only JPG, PNG, PDF allowed", (file) =>
        file ? SUPPORTED_DOC_TYPES.includes(file.type) : true
      ),

    bankStatement: Yup.mixed()
      .required("Bank Statement is required")
      .test("fileSize", "Max 5MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_5MB : true
      )
      .test("fileType", "Only PDF allowed", (file) =>
        file ? file.type === "application/pdf" : true
      ),

    drivingLicense: Yup.mixed()
      .required("Driving License is required")
      .test("fileSize", "Max 3MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_3MB : true
      )
      .test("fileType", "Only JPG, PNG, PDF allowed", (file) =>
        file ? SUPPORTED_DOC_TYPES.includes(file.type) : true
      ),

    signature: Yup.mixed()
      .required("Signature is required")
      .test("fileSize", "Max 1MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_1MB : true
      )
      .test("fileType", "Only JPG, PNG allowed", (file) =>
        file ? SUPPORTED_IMAGE_TYPES.includes(file.type) : true
      ),

    photo: Yup.mixed()
      .required("Photo is required")
      .test("fileSize", "Max 1MB allowed", (file) =>
        file ? file.size <= FILE_SIZE_1MB : true
      )
      .test("fileType", "Only JPG, PNG allowed", (file) =>
        file ? SUPPORTED_IMAGE_TYPES.includes(file.type) : true
      ),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      await submitRdAccountDocs({ id: id, values: formData });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const formik = useFormik({
    initialValues: {
      panCard: "",
      aadharCard: "",
      voterId: "",
      bankStatement: "",
      signature: "",
      drivingLicense: "",
      photo: "",
      other: "",
      otherDocumentFile: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isError && error) {
      setSnackbar({
        open: true,
        message:
          error?.data?.message || error?.data?.error || "Something Went Wrong!",
        severity: "error",
      });
    }
    if (isSuccess && data) {
      setSnackbar({
        open: true,
        message: data?.message,
        severity: "success",
      });
      formik.resetForm();
    }
  }, [isError, isSuccess, error, data]);

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Document Details" borderBottom="1px solid #DDDDEBBF" />

      <UploadingDocumentsForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {documentLists.map((curList, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <FormContent>
                <FormLabel label={curList.label} />

                <input
                  type="file"
                  name={curList.name}
                  style={{ paddingTop: "8px", cursor: "pointer" }}
                  onChange={(e) =>
                    formik.setFieldValue(curList.name, e.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                />

                {formik.touched[curList.name] &&
                  formik.errors[curList.name] && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors[curList.name]}
                    </p>
                  )}
              </FormContent>
            </Grid>
          ))}
        </Grid>

        <FormAction>
          <DynamicButton
            type="submit"
            color="#7858C6"
            textColor="#fff"
            text={
              isLoading ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <CircularProgress size={20} color="#fff" />
                  Submitting
                </div>
              ) : (
                "Save"
              )
            }
          />
          <DynamicButton
            variant="outlined"
            borderColor="#ECEBF3"
            text="Cancel"
            textColor="#212B36"
          />
        </FormAction>
      </UploadingDocumentsForm>
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
    </>
  );
};

export default RdDocuments;

const UploadingDocumentsForm = styled("form")({
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FormContent = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const FormAction = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
