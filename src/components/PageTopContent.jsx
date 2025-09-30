import { styled } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DynamicButton from "./DynamicButton";
import { useNavigate } from "react-router-dom";

const PageTopContent = ({ title }) => {
  const navigate = useNavigate();
  return (
    <FirstContainer>
      <ContainerTitle>{title}</ContainerTitle>
      <DynamicButton
        text="Back"
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        borderColor="#000000"
        textColor="#000000"
        onClick={() => navigate(-1)}
      />
    </FirstContainer>
  );
};

export default PageTopContent;

const FirstContainer = styled("div")({
  width: "100%",
  height: "auto",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  gap: "20px",
});

const ContainerTitle = styled("p")({
  font: "500 20px Poppins",
  color: "#2C2C2C",
});
