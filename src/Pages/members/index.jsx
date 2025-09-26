import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MembersLayout = () => {
    return (
        <Box>
            {/* Optional header or tabs for Members */}
            <Outlet /> {/* Nested routes will render here */}
        </Box>
    );
};

export default MembersLayout;
