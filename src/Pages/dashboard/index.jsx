// src/pages/DashboardPage.jsx
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { People, AccountBalance, DirectionsCar, School, Home } from "@mui/icons-material";
import StatCard from "./StatCard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SavingsIcon from "@mui/icons-material/Savings";
import RepeatIcon from "@mui/icons-material/Repeat";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StoreIcon from "@mui/icons-material/Store";
import WorkIcon from "@mui/icons-material/Work";
import ShowChartIcon from "@mui/icons-material/ShowChart";


const cards = [
    {
        icon: PeopleIcon,
        bgcolor: "#E8EAF6",
        title: "Members",
        count: 10,
        actionLabel: "Add Member",
        onAction: () => alert("Add Member clicked"),
    },
    {
        icon: AccountBalanceIcon,
        bgcolor: "#FFF3E0",
        title: "Saving Accounts",
        count: 7,
        actionLabel: "View More",
        onAction: () => alert("Saving Accounts clicked"),
    },
    {
        icon: DirectionsCarIcon,
        bgcolor: "#E3F2FD",
        title: "Vehicle Loan",
        count: 3,
        actionLabel: "View More",
        onAction: () => alert("Vehicle Loan clicked"),
    },
    {
        icon: SavingsIcon,
        bgcolor: "#F3E5F5",
        title: "Fixed Deposit",
        count: 5,
        actionLabel: "View More",
        onAction: () => alert("Fixed Deposit clicked"),
    },
    {
        icon: RepeatIcon,
        bgcolor: "#E0F7FA",
        title: "Recurring Deposit",
        count: 4,
        actionLabel: "View More",
        onAction: () => alert("Recurring Deposit clicked"),
    },
    {
        icon: SecurityIcon,
        bgcolor: "#FBE9E7",
        title: "Loan Against Deposit",
        count: 2,
        actionLabel: "View More",
        onAction: () => alert("Loan Against Deposit clicked"),
    },
    {
        icon: EmojiEventsIcon,
        bgcolor: "#E8F5E9",
        title: "Gold Loan",
        count: 6,
        actionLabel: "View More",
        onAction: () => alert("Gold Loan clicked"),
    },
    {
        icon: PersonIcon,
        bgcolor: "#FFF8E1",
        title: "Personal Loan",
        count: 8,
        actionLabel: "View More",
        onAction: () => alert("Personal Loan clicked"),
    },
    {
        icon: BusinessIcon,
        bgcolor: "#E1F5FE",
        title: "Business Loan",
        count: 9,
        actionLabel: "View More",
        onAction: () => alert("Business Loan clicked"),
    },
    {
        icon: HomeWorkIcon,
        bgcolor: "#F9FBE7",
        title: "Property Loan",
        count: 4,
        actionLabel: "View More",
        onAction: () => alert("Property Loan clicked"),
    },
    {
        icon: AssessmentIcon,
        bgcolor: "#ECEFF1",
        title: "Reports",
        count: 12,
        actionLabel: "View More",
        onAction: () => alert("Reports clicked"),
    },
    {
        icon: CreditCardIcon,
        bgcolor: "#FFFDE7",
        title: "Credit Loan",
        count: 2,
        actionLabel: "View More",
        onAction: () => alert("Credit Loan clicked"),
    },
    {
        icon: LocalAtmIcon,
        bgcolor: "#E0F2F1",
        title: "Cash Credit",
        count: 3,
        actionLabel: "View More",
        onAction: () => alert("Cash Credit clicked"),
    },
    {
        icon: StoreIcon,
        bgcolor: "#F1F8E9",
        title: "Shop Loan",
        count: 1,
        actionLabel: "View More",
        onAction: () => alert("Shop Loan clicked"),
    },
    {
        icon: WorkIcon,
        bgcolor: "#FCE4EC",
        title: "Employment Loan",
        count: 5,
        actionLabel: "View More",
        onAction: () => alert("Employment Loan clicked"),
    },
    {
        icon: ShowChartIcon,
        bgcolor: "#EDE7F6",
        title: "Investment Accounts",
        count: 11,
        actionLabel: "View More",
        onAction: () => alert("Investment Accounts clicked"),
    },
];



export default function DashboardPage() {
    return (
        <Box sx={{ p: 2 }}>
            {/* Welcome + Last Login Section */}
            <Grid container spacing={2} mb={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: "100%", borderRadius: "15px" }}>
                        <CardContent sx={{ display: "flex", p: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly", flexDirection: "column" }}>
                                <Typography sx={{ color: "#2C2C2C", fontWeight: 700, fontSize: "24px" }}>
                                    Welcome Nidhi Software
                                </Typography>
                                <Button sx={{ bgcolor: "#FF9959", color: "#FFFFFF", borderRadius: "20px", px: .5 }}>
                                    View Profile
                                </Button>
                            </Box>
                            <Box>
                                <img src="./assets/images/dashboard/welcome.svg" alt="" />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ display: "flex" }}>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Last Login Info
                                </Typography>
                                <Typography variant="body2">Last Sign at 11/08/2025 12:11 PM IST</Typography>
                                <Typography variant="body2">Last Sign IP 122.161.87.74</Typography>
                            </Box>
                            <img src="" alt="" />
                            <Box>
                                <img src="./assets/images/dashboard/login.svg" alt="" />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ borderRadius: "12px" }}>
                    <img src="./assets/images/dashboard/credit.svg" alt="" />
                </Grid>
            </Grid>

            {/* Stats Grid */}


            <Grid container spacing={2}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>
            <Outlet />
        </Box>
    );
}
