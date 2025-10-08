import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ snackbar, setSnackbar }) => {
  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));
  return (
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
  );
};

export default CustomSnackbar;
