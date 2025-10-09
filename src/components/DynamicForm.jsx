import { Grid, styled } from "@mui/material";
import PageTopContent from "../components/PageTopContent";
import PagesMainContainerStyle from "./PagesMainContainerStyle";
import DynamicButton from "./DynamicButton";
import FormLabel from "../components/FormLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikError from "../components/FormikError";
import SubmitButtonLoader from "./SubmitButtonLoader";

const DynamicForm = ({
  headerTitle,
  formList = [],
  actionButtonText = "Submit",
  isLoading,
  texting,
  initialValues = {},
  validationSchema = Yup.object(),
  handleSubmit = () => {},
  md,
  width,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    resetForm,
    setFieldValue, 
  } = formik;

  return (
    <>
      <PagesMainContainerStyle />
      {headerTitle && <PageTopContent title={headerTitle} />}

      <FormContainer onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          {formList.map((curList, i) => {
            const {
              label,
              placeholder,
              type = "text",
              name,
              id,
              grid = { xs: 12, sm: 6, md: md || 6 },
              options = [],
              readOnly = false,
              disabled = false,
              onChange,
            } = curList;

            return (
              <Grid sx={{ width: width || "45%" }} item key={i} {...grid}>
                <FormContent>
                  <FormLabel label={label} />

                  {type === "select" ? (
                    <select
                      name={name}
                      id={id}
                      value={values[name]}
                      onChange={
                        onChange
                          ? (e) =>
                              onChange(
                                e,
                                handleChange,
                                values, 
                                setFieldValue 
                              )
                          : handleChange
                      }
                      onBlur={handleBlur}
                      disabled={disabled}
                    >
                      <option value="">Select {label}</option>
                      {options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : type === "textarea" ? (
                   <>
               
                    <textarea
                      name={name}
                      id={id}
                      placeholder={placeholder}
                      value={values[name]}
                      onChange={
                        onChange
                          ? (e) =>
                              onChange(
                                e,
                                handleChange,
                                values, 
                                setFieldValue 
                              )
                          : handleChange
                      }
                      onBlur={handleBlur}
                      readOnly={readOnly}
                      rows={10}
                      style={{ width: "206%" }}
                      disabled={disabled}
                    />
                   </>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      id={id}
                      placeholder={placeholder}
                      value={values[name]}
                      onChange={
                        onChange
                          ? (e) =>
                              onChange(
                                e,
                                handleChange,
                                values, 
                                setFieldValue 
                              )
                          : handleChange
                      }
                      onBlur={handleBlur}
                      readOnly={readOnly}
                      disabled={disabled}
                    />
                  )}

                  <FormikError name={name} touched={touched} errors={errors} />
                </FormContent>
              </Grid>
            );
          })}
        </Grid>

        <FormAction>
          <DynamicButton
            type="submit"
            color="#7858C6"
            textColor="#fff"
            text={
              <SubmitButtonLoader
                isLoading={isLoading}
                text={actionButtonText}
                texting={texting}
              />
            }
          />
          <DynamicButton
            variant="outlined"
            borderColor="#ECEBF3"
            text="Cancel"
            textColor="#212B36"
            onClick={() => resetForm()}
          />
        </FormAction>
      </FormContainer>
    </>
  );
};

export default DynamicForm;

// ✅ Styled Components (unchanged)
const FormContainer = styled("form")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

const FormAction = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

const FormContent = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",

  "& input, & select, & textarea": {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s ease",

    "&:focus": {
      borderColor: "#7858C6",
      boxShadow: "0 0 4px rgba(120, 88, 198, 0.3)",
    },

    "&:disabled": {
      backgroundColor: "#f5f5f5",
      cursor: "not-allowed",
      color: "#999",
    },

    "&[readonly]": {
      backgroundColor: "#f9f9f9",
      color: "#555",
    },
  },
});
