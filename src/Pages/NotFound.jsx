import { styled } from "@mui/material";
import notFoundImage from "../../public/assets/images/notFound/9264822 1.svg";
import DynamicButton from "../components/DynamicButton";
import { Navigate, NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <NotFoundMainContainer>
      <img src={notFoundImage} alt="notFound" />
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }} >
        <DynamicButton
          component={NavLink}
          to="/saving-accounts/create-receipt"
          text="Create Receipt"
          color="#7858C6"
          textColor="#fff"
          borderColor="#ECEBF3"
        />
        <DynamicButton
          component={NavLink}
          onClick={() => Navigate(-1)}
          text="Back"
          variant="outlined"
          textColor="#000"
          borderColor="#5c5c5fff"
        />
      </div>
    </NotFoundMainContainer>
  );
};

export default NotFound;

const NotFoundMainContainer = styled("div")({
  width: "100%",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
});
