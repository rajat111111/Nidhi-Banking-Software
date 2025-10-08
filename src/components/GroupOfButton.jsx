import { Grid, styled } from "@mui/material";
import DynamicButton from "./DynamicButton";

const GroupOfButton = ({ buttonsList = [], colorOfBorder = "#ECEBF3", md = 3 }) => {
  return (
    <GroupOfButtonMainContainer colorOfBorder={colorOfBorder}>
      <Grid container spacing={2}>
        {buttonsList?.map((curList, i) => (
          <Grid item xs={12} sm={6} md={md} key={i}>
            <DynamicButton
              text={curList?.title}
              component={curList?.component}
              variant={curList?.variant}
              color={curList?.color || "#7858C6"}
              textColor={curList?.textColor || "#FFFFFF"}
              borderColor={curList?.borderColor}
              to={curList?.to}
              type={curList?.type}
              startIcon={curList?.startIcon}
              endIcon={curList?.endIcon}
              onClick={curList?.onClick}
              sx={curList?.sx}
              borderRadius={curList?.borderRadius}
            />
          </Grid>
        ))}
      </Grid>
    </GroupOfButtonMainContainer>
  );
};

export default GroupOfButton;

const GroupOfButtonMainContainer = styled("div")(({ colorOfBorder }) => ({
  width: "100%",
  height: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "20px",
  borderBottom: `1px solid ${colorOfBorder}`,
  paddingBottom: "12px",
}));
