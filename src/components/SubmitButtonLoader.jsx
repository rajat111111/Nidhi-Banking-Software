import { CircularProgress } from "@mui/material";

const SubmitButtonLoader = ({ isLoading, text, texting, loaderColor }) => {
  return isLoading ? (
    <div className="submitBotton">
      <CircularProgress
        size={20}
        sx={{ color: loaderColor ? loaderColor : "#fff" }}
      />{" "}
      {texting} ....
    </div>
  ) : (
    text
  );
};

export default SubmitButtonLoader;
