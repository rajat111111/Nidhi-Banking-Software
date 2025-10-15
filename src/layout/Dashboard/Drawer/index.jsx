import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import RealEstateAgentIcon from "@mui/icons-material/RealEstateAgent";
import GavelIcon from "@mui/icons-material/Gavel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChatIcon from "@mui/icons-material/Chat";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsIcon from "@mui/icons-material/Settings";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TaskIcon from "@mui/icons-material/Task";
import LogoutIcon from "@mui/icons-material/Logout";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const drawerWidth = 240;
// export const drawerWidth = open ? 240 : 0;

const menuItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Masters", path: "/masters", icon: <AccountBalanceIcon /> },
  {
    label: "Promoters",
    icon: <MonetizationOnIcon />,
    children: [
      { label: "Promoters", path: "/promoters" },
      {
        label: "Share Holdings",
        path: "/promoters/share-holdings",
      },
      { label: "Minors", path: "/promoters/minors" },
      { label: "Share Certificates", path: "/promoters/share-certificates" },
    ],
  },
  {
    label: "Members",
    icon: <PeopleIcon />,
    children: [
      { label: "Member Details", path: "/members" },
      { label: "Approval", path: "/members/approval-details" },
      { label: "Share Holdings", path: "/members/share-holdings" },
      { label: "Minors", path: "/members/minor-details" },
    ],
  },
  {
    label: "Share Holdings",

    icon: <AssessmentIcon />,
    children: [
      { label: "Share Holdings Details", path: "/share-holding" },
      { label: "Transfer", path: "/share-holding/transfer" },
    ],
  },
  { label: "KYC", path: "/kyc", icon: <PersonIcon /> },
  {
    label: "Saving Accounts",
    icon: <SavingsIcon />,
    children: [
      { label: "Accounts", path: "/saving-accounts" },
      { label: "Deposit", path: "/saving-accounts/deposit" },
      { label: "Withdraw", path: "/saving-accounts/withdraw" },
      { label: "Statement", path: "/saving-accounts/statement" },
      // { label: "Passbook", path: "/saving-accounts/passbook" },
      { label: "Enquiry", path: "/saving-accounts/enquiry" },
      { label: "Approval", path: "/saving-accounts/approval" },
      { label: "Closure Approval", path: "/saving-accounts/closure-approval" },
      { label: "Receipt Print", path: "/saving-accounts/receipt-print" },
    ],
  },
  {
    label: "FD Accounts",
    icon: <AccountBalanceWalletIcon />,
    children: [
      { label: "Accounts", path: "/fd-accounts" },
      { label: "Passbook", path: "/fd-accounts/passbook" },
    
      { label: "Enquiry", path: "/fd-accounts/enquiry" },
      { label: "Approval", path: "/fd-accounts/approval" },
      { label: "Closure Approval", path: "/fd-accounts/closure-approval" },
      { label: "Receipt ", path: "/fd-accounts/receipt" },
      { label: "Change Account Type ", path: "/fd-accounts/change-account-type" },
    ],
  },

  { label: "RD Accounts", path: "/rd", icon: <AccountBalanceWalletIcon /> },
  { label: "DD Accounts", path: "/dd", icon: <AccountBalanceWalletIcon /> },
  { label: "MIS Accounts", path: "/mis", icon: <AssessmentIcon /> },

  { label: "Gold Loan", path: "/gold-loan", icon: <AttachMoneyIcon /> },
  { label: "Vehicle Loan", path: "/vehicle-loan", icon: <DirectionsCarIcon /> },
  { label: "Education Loan", path: "/education-loan", icon: <SchoolIcon /> },
  { label: "Group Loan", path: "/group-loan", icon: <GroupIcon /> },
  { label: "Personal Loan", path: "/personal-loan", icon: <PersonIcon /> },
  {
    label: "Loan Against Deposit",
    path: "/loan-against-deposit",
    icon: <RequestQuoteIcon />,
  },
  {
    label: "Property Loan",
    path: "/property-loan",
    icon: <RealEstateAgentIcon />,
  },
  {
    label: "Gold Silver Loan",
    path: "/gold-silver-loan",
    icon: <AttachMoneyIcon />,
  },

  { label: "User", path: "/user", icon: <PersonIcon /> },
  { label: "Accounting", path: "/accounting", icon: <AccountBalanceIcon /> },
  { label: "Employees", path: "/employees", icon: <PeopleIcon /> },
  { label: "Agents", path: "/agents", icon: <RealEstateAgentIcon /> },
  { label: "CSP", path: "/csp", icon: <PaymentIcon /> },
  { label: "Approvals", path: "/approvals", icon: <GavelIcon /> },
  {
    label: "Business Reports",
    path: "/business-reports",
    icon: <AssessmentIcon />,
  },
  { label: "Communication", path: "/communication", icon: <ChatIcon /> },
  { label: "Cashfree", path: "/cashfree", icon: <PaymentIcon /> },
  { label: "Debit Cards", path: "/debit-cards", icon: <CreditCardIcon /> },
  { label: "Prepaid Cards", path: "/prepaid-cards", icon: <CreditCardIcon /> },
  { label: "Setting", path: "/setting", icon: <SettingsIcon /> },
  {
    label: "Collections",
    path: "/collections",
    icon: <CollectionsBookmarkIcon />,
  },
  {
    label: "Support Tickets",
    path: "/support-tickets",
    icon: <SupportAgentIcon />,
  },
  { label: "Task Management", path: "/task-management", icon: <TaskIcon /> },
  { label: "Logout", icon: <LogoutIcon /> },
];
export default function Sidebar({ open, onClose, variant }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // check if submenu contains active path
  const isChildActive = (children) =>
    children.some((child) => location.pathname === child.path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 0, // 👈 collapse when closed
          bgcolor: "#7858C6",
          color: "white",
          transition: "width 0.3s ease", // 👈 smooth animation
          overflowX: "hidden", // 👈 no horizontal scroll
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
        <img src="./assets/images/sidebar/logo.svg" alt="" />
      </Box>

      {/* Menu */}
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {menuItems.map((item) => {
          if (item.label === "Logout") {
            return (
              <ListItemButton key="logout" onClick={handleLogout}>
                <ListItemIcon sx={{ color: "white" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            );
          }

          if (item.children) {
            const childActive = isChildActive(item.children);

            return (
              <>
                <React.Fragment key={item.label}>
                  {/* Parent */}
                  <ListItemButton
                    ListItemButton
                    onClick={() => handleToggle(item.label)}
                  >
                    <ListItemIcon
                      sx={{
                        color: childActive ? "#ffb74d" : "white",
                        minWidth: "35px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: childActive ? "#ffb74d" : "white",
                            fontWeight: childActive ? "bold" : "normal",
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                    {openMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {/* Submenu */}
                  <Collapse
                    in={openMenus[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.label}
                          component={Link}
                          to={child.path}
                          selected={location.pathname === child.path}
                          onClick={
                            variant === "temporary" ? onClose : undefined
                          }
                          sx={{
                            pl: 5,
                            "& .MuiListItemText-primary": {
                              color:
                                location.pathname === child.path
                                  ? "#ffb74d"
                                  : "white",
                              fontWeight:
                                location.pathname === child.path
                                  ? "bold"
                                  : "normal",
                            },
                            "& .MuiListItemIcon-root": {
                              color:
                                location.pathname === child.path
                                  ? "#ffb74d"
                                  : "white",
                            },
                            "&::before": {
                              content: '"–"',
                              marginRight: "8px",
                              color:
                                location.pathname === child.path
                                  ? "#ffb74d"
                                  : "white",
                            },
                          }}
                        >
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
                <Divider
                  key="divider"
                  sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }}
                />
              </>
            );
          }

          return (
            <>
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={variant === "temporary" ? onClose : undefined}
                sx={{
                  "& .MuiListItemText-primary": {
                    color:
                      location.pathname === item.path ? "#ffb74d" : "white",
                    fontWeight: location.pathname === item.path ? "500" : "400",
                  },
                  "& .MuiListItemIcon-root": {
                    color:
                      location.pathname === item.path ? "#ffb74d" : "white",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
              <Divider
                key="divider"
                sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }}
              />
            </>
          );
        })}
      </List>
    </Drawer>
  );
}
