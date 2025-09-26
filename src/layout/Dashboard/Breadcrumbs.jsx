import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

export default function DynamicBreadcrumbs() {
    const location = useLocation();

    // Break the pathname into parts
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ p: 2 }}>
            {/* Home link */}
            <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/"
            >
                Home
            </Link>

            {/* Dynamic parts */}
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={to}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        underline="hover"
                        color="inherit"
                        to={to}
                        key={to}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
