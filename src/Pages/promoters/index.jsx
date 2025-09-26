import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PromotersLayout = () => {
    return (
        <Box>
            {/* Optional header or tabs for Promoters */}
            <Outlet /> {/* Nested routes will render here */}
        </Box>
    );
};

export default PromotersLayout;
