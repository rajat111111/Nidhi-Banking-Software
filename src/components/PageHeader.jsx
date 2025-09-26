// import React from "react";
// import { Box, Typography, Button, Stack } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import DownloadIcon from "@mui/icons-material/Download";

// export default function PageHeader({
//     title,
//     primaryButton, // { label: string, onClick: func, color?: string }
//     extraButtons = [], // array of { label, onClick, variant?, color?, icon? }
//     onFilter,
//     onDownload,
// }) {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 justifyContent: "space-between",
//                 alignItems: { xs: "flex-start", sm: "center" },
//                 gap: 2,
//                 mb: 2,
//             }}
//         >
//             {/* Title */}
//             <Typography variant="h6" fontWeight="600">
//                 {title}
//             </Typography>

//             {/* Actions */}
//             <Stack direction="row" spacing={1} flexWrap="wrap">
//                 {/* Filter */}
//                 {onFilter && (
//                     <Button
//                         variant="outlined"
//                         startIcon={<FilterListIcon />}
//                         onClick={onFilter}
//                     >
//                         Filter
//                     </Button>
//                 )}

//                 {/* Download */}
//                 {onDownload && (
//                     <Button
//                         variant="outlined"
//                         startIcon={<DownloadIcon />}
//                         onClick={onDownload}
//                     >
//                         Download
//                     </Button>
//                 )}

//                 {/* Extra Buttons */}
//                 {extraButtons.map((btn, idx) => (
//                     <Button
//                         key={idx}
//                         variant={btn.variant || "outlined"}
//                         color={btn.color || "primary"}
//                         startIcon={btn.icon || null}
//                         onClick={btn.onClick}
//                     >
//                         {btn.label}
//                     </Button>
//                 ))}

//                 {/* Primary Action Button */}
//                 {primaryButton && (
//                     <Button
//                         variant="contained"
//                         color={primaryButton.color || "secondary"}
//                         onClick={primaryButton.onClick}
//                     >
//                         {primaryButton.label}
//                     </Button>
//                 )}
//             </Stack>
//         </Box>
//     );
// }


import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Typography, Stack, Button } from "@mui/material";

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
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                mb: 2,
            }}
        >
            {/* Title */}
            <Typography variant="h6" fontWeight="600">
                {title}
            </Typography>

            {/* Actions */}
            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                {onFilter && (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<FilterListIcon />}
                        onClick={onFilter}
                        sx={buttonSx}
                    >
                        Filter
                    </Button>
                )}

                {onDownload && (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DownloadIcon />}
                        onClick={onDownload}
                        sx={buttonSx}
                    >
                        Download
                    </Button>
                )}

                {primaryButton && (
                    <Button
                        variant={primaryButton.variant || "contained"}
                        color={primaryButton.color || "secondary"}
                        onClick={primaryButton.onClick}
                        sx={buttonSx}
                    >
                        {primaryButton.label}
                    </Button>
                )}

                {extraButtons.map((btn, idx) => (
                    <Button
                        key={idx}
                        variant={btn.variant || "contained"}
                        color={btn.color || "secondary"}
                        startIcon={btn.icon || null}
                        onClick={btn.onClick}
                        sx={buttonSx}
                    >
                        {btn.label}
                    </Button>
                ))}


            </Stack>
        </Box>
    );
}
