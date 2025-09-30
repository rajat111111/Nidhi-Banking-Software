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
        justifyContent: "flex-start",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: "40px",
        mb: 2,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="600">
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
          <DynamicButton text={btn?.label} textColor="#fff" color="#7858C6" />
        ))}
      </Stack>
    </Box>
  );
}
