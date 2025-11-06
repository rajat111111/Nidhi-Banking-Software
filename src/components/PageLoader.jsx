import { styled } from "@mui/material";
import { ThreeDot } from "react-loading-indicators";

const PageLoader = ({ height }) => {
  return (
    <PageLoaderMainContainer height={height}>
      <ThreeDot
        variant="bounce"
        color="#6445c2ff"
        size="medium"
        text=""
        textColor=""
      />
    </PageLoaderMainContainer>
  );
};

export default PageLoader;

const PageLoaderMainContainer = styled("div")(({ height }) => ({
  width: "100%",
  height: height || "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
