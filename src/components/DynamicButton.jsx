import { Button, styled } from "@mui/material";

const DynamicButton = ({
  text,
  color,
  textColor,
  startIcon,
  endIcon,
  variant,
  borderColor,
  component,
  onClick,
  type,
  sx,
  to,
  borderRadius
}) => {
  return (
    <DepartmentalUsesButtonMainContainer
      variant={variant}
      startIcon={startIcon}
      borderColor={borderColor}
      endIcon={endIcon}
      customcolor={color}
      textColor={textColor}
      onClick={onClick}
      to={to}
      sx={sx}
      type={type}
      component={component}
      borderRadius={borderRadius}
    >
      {text}
    </DepartmentalUsesButtonMainContainer>
  );
};

export default DynamicButton;

const DepartmentalUsesButtonMainContainer = styled(Button)(
  ({ customcolor, textColor, borderColor,borderRadius }) => ({
    borderRadius: `${borderRadius}`,
    width: "auto",
    height: "auto",
    padding: "8px 12px",
    backgroundColor: customcolor,
    fontSize: "15px",
    fontWeight: 400,
    fontFamily: "Roboto",
    textTransform: "capitalize",
    color: textColor || "#fff",
    transition: "transform 1s ease",
    border: `1px solid ${borderColor}`,
    "&:hover": {
      transform: "scale(1.1)",
    },
  })
);
