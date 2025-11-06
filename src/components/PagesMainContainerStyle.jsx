import { styled } from "@mui/material";

const PagesMainContainerStyle = ({ height, flexDirection, gap, children }) => {
  return (
    <PagesMainContainer height={height} flexDirection={flexDirection} gap={gap}>
      {children}
    </PagesMainContainer>
  );
};

export default PagesMainContainerStyle;

// Styled component
const PagesMainContainer = styled("div")(({ height, flexDirection, gap }) => ({
  width: "100%",
  height: height || "auto",
  display: "flex",
  flexDirection: flexDirection || "column",
  gap: gap || "20px",
  marginTop: "10px",
}));
