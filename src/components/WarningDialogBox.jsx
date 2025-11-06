import { Dialog, styled, Snackbar, Alert } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DynamicButton from "./DynamicButton";
import SubmitButtonLoader from "./SubmitButtonLoader";
import ErrorAndSuccessUseEffect from "./ErrorAndSuccessUseEffect";

const WarningDialogBox = ({
  open,
  setOpen,
  isLoading,
  isError,
  isSuccess,
  error,
  data,
  performAction,
  setSnackbar,
  snackbar,
  id,
}) => {
  const handleRemove = async () => {
    console.log("removeId", id);
    try {
      await performAction({ id }).unwrap();
    } catch (err) {
      console.error("Error removing account:", err);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <>
      <Dialog
        PaperProps={{
          sx: {
            width: "450px",
            maxWidth: "90%",
            padding: "30px",
            borderRadius: "30px",
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContentContainer>
          <DialogSectionOne>
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "100px" }}
              color="error"
            />
            <SureText>Are you sure?</SureText>
            <WarnText>
              This action will permanently remove your account and all related
              data.
            </WarnText>
          </DialogSectionOne>

          <DialogSectionTwo>
            <DynamicButton
              text={
                <SubmitButtonLoader
                  isLoading={isLoading}
                  text="Remove"
                  texting="Removing"
                />
              }
              onClick={handleRemove}
              color="#da0d0df3"
            />
            <DynamicButton
              variant="outlined"
              borderColor="#6f6a6aff"
              text="Cancel"
              textColor="#000"
              onClick={() => setOpen(false)}
            />
          </DialogSectionTwo>
        </DialogContentContainer>
      </Dialog>

      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        setSnackbar={setSnackbar}
        data={data}
        setOpen={setOpen}
        whereToNavigate="/saving-accounts"
      />

      <Snackbar
        open={snackbar?.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WarningDialogBox;

// Styled Components
const DialogContentContainer = styled("div")({
  width: "100%",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  alignItems: "center",
  justifyContent: "center",
});

const DialogSectionOne = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
});

const DialogSectionTwo = styled("div")({
  width: "100%",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
});

const SureText = styled("p")({
  font: "600 18px Poppins",
  textAlign: "center",
});

const WarnText = styled("p")({
  font: "300 16px Poppins",
  textAlign: "center",
});
