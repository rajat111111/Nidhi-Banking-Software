import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Typography, Stack, Button } from "@mui/material";
import DynamicButton from "./DynamicButton";
import { NavLink } from "react-router-dom";

export default function PageHeader({
  title,
  primaryButton,
  extraButtons = [],
  onFilter,
  borderBottom,

  onDownload,
}) {
  const buttonSx = {
    borderRadius: "24px", // pill shaped
    textTransform: "none",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: "40px",

        borderBottom: { borderBottom },
        paddingBottom: "10px",
      }}
    >
      {/* Title */}
      <Typography
        sx={{ fontWeight: "500", fontSize: "18px", fontFamily: "Poppins" }}
      >
        {title}
      </Typography>

      {/* Actions */}
      <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
        {onFilter && (
          <DynamicButton
            text="filter"
            variant="outlined"
            borderRadius="20px"
            startIcon={<FilterListIcon />}
            textColor="#8F8F8F"
            borderColor="#E1E1EE"
          />
        )}

        {onDownload && (
          <DynamicButton
            text="Download"
            variant="outlined"
            borderRadius="20px"
            startIcon={<DownloadIcon />}
            textColor="#8F8F8F"
            borderColor="#E1E1EE"
          />
        )}

        {primaryButton && (
          <DynamicButton
            text={primaryButton?.label}
            textColor="#fff"
            color="#7858C6"
            component={NavLink}
            to={primaryButton.to}
  
          />
        )}

        {extraButtons.map((btn, idx) => (
          <DynamicButton
            text={btn?.label}
            variant={btn?.variant || "contained"}
            startIcon={btn?.startIcon}
            endIcon={btn?.endIcon}
            textColor={btn?.textColor || !btn?.variant  && "#fff"}
            color={btn?.color || !btn?.variant  && "#7858C6"}
          />
        ))}
      </Stack>
    </Box>
  );
}
