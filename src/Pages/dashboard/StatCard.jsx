// // DashboardCard.jsx
// import React from "react";
// import { Card, CardContent, Typography, Box, Button } from "@mui/material";

// const StatCard = ({ icon: Icon, bgcolor = "#f5f5f5", title, count, actionLabel, onAction }) => {
//     return (
//         <Card
//             sx={{
//                 bgcolor,
//                 borderRadius: "16px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                 textAlign: "center",
//                 p: 2,
//                 maxWidth: 150,
//                 minHeight: 220
//             }}
//         >
//             <CardContent>
//                 {/* Icon */}
//                 <Box
//                     sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         mb: 1,
//                         color: "#7e57c2",
//                         fontSize: 40,
//                     }}
//                 >
//                     <Icon fontSize="inherit" />
//                 </Box>

//                 {/* Title */}
//                 <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                     {title}
//                 </Typography>

//                 {/* Count */}
//                 <Typography variant="h6" sx={{ fontWeight: "bold", my: 1 }}>
//                     {count}
//                 </Typography>

//                 {/* Action */}
//                 <Button
//                     size="small"
//                     onClick={onAction}
//                     sx={{
//                         color: "#3f51b5",
//                         textTransform: "none",
//                         fontWeight: 500,
//                         fontSize: "0.85rem",
//                     }}
//                 >
//                     {actionLabel}
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// };

// export default StatCard;
// DashboardCard.jsx


// DashboardCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const StatCard = ({
    icon: Icon,
    bgcolor = "#f5f5f5",
    title,
    count,
    actionLabel,
    onAction,
}) => {
    return (
        <Card
            sx={{
                bgcolor,
                borderRadius: "16px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                p: 2,
                width: 200, // ✅ fixed consistent width
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 0,
                    "&:last-child": { pb: 0 },
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1.5,
                        color: "#7e57c2",
                        fontSize: 40,
                    }}
                >
                    <Icon fontSize="inherit" />
                </Box>

                {/* Title */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 500,
                        textAlign: "center",
                        whiteSpace: "nowrap", // ✅ keeps titles in one line
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                >
                    {title}
                </Typography>

                {/* Count */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", my: 1, textAlign: "center" }}
                >
                    {count}
                </Typography>

                {/* Action */}
                <Button
                    size="small"
                    onClick={onAction}
                    sx={{
                        color: "#3f51b5",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                    }}
                >
                    {actionLabel}
                </Button>
            </CardContent>
        </Card>
    );
};

export default StatCard;
