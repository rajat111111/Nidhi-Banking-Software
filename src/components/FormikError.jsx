const FormikError = ({ name, touched, errors }) => {
  if (touched[name] && errors[name]) {
    return <div className="validationError">{errors[name]}</div>;
  }
  return null;
};

export default FormikError;
