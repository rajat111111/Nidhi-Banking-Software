import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    Avatar,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalculateIcon from "@mui/icons-material/Calculate";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Header({ toggleSidebar }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuType, setMenuType] = React.useState("");

    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuType("");
    };

    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{
                borderBottom: "2px solid #6c63ff", // purple bottom border
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconButton edge="start" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>

                    {/* Dropdown Menus */}
                    {["Payables", "Receivables", "Day Book", "HR"].map((item) => (
                        <Box key={item}>
                            <Button
                                endIcon={<ArrowDropDownIcon />}
                                onClick={(e) => handleMenuOpen(e, item)}
                                sx={{ textTransform: "none", color: "black" }}
                            >
                                {item}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={menuType === item}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>{item} Option 1</MenuItem>
                                <MenuItem onClick={handleMenuClose}>{item} Option 2</MenuItem>
                            </Menu>
                        </Box>
                    ))}
                </Box>

                {/* Right Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CalculateIcon />}
                        sx={{ textTransform: "none" }}
                    >
                        Calculator
                    </Button>

                    {/* User Profile */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar />
                        <Box>
                            <Typography variant="body2">@admin</Typography>
                            <Typography variant="caption" color="text.secondary">
                                admin@scriza.in
                            </Typography>
                        </Box>
                        <ArrowDropDownIcon fontSize="small" />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
