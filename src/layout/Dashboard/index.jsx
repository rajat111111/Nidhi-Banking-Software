import React, { useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Drawer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import DynamicBreadcrumbs from "./Breadcrumbs";
import { drawerWidth } from "../Dashboard/Drawer/index.jsx"


export default function Layout() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    React.useEffect(() => {
        setSidebarOpen(!isSmallScreen);
    }, [isSmallScreen]);

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                variant={isSmallScreen ? "temporary" : "persistent"}
            />
            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    overflow: "hidden",
                    transition: " 0.3s",  // smooth transition when toggling
                    // marginLeft: sidebarOpen && !isSmallScreen ? `${drawerWidth}px` : 0,
                    marginLeft: 0,
                }}
            >
                <Header toggleSidebar={toggleSidebar} />
                <DynamicBreadcrumbs />
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        bgcolor: "#f8f8fa",
                        p: 2,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
