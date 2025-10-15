import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorAndSuccessUseEffect = ({
  isError,
  error,
  isSuccess,
  data,
  setSnackbar,
  successCustomData,
  resetForm,
  whereToNavigate,
  setOpen,
  setActiveTab,
  successTab,
}) => {
  const navigate = useNavigate();

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
      if (whereToNavigate) {
        setTimeout(() => {
          navigate(whereToNavigate);
        }, 1000);
      }

      setSnackbar({
        open: true,
        message: data?.message || successCustomData,
        severity: "success",
      });

      if (setOpen) setOpen(false);

      if (setActiveTab && successTab) {
        setTimeout(() => {
          setActiveTab(successTab);
        }, 1000);
      }

      if (resetForm) resetForm();
    }
  }, [isError, error, isSuccess, data]);

  return null;
};

export default ErrorAndSuccessUseEffect;
