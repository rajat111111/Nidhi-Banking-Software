

import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    Button,
    Tabs,
    Tab,
    TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPromoterByIdQuery } from "../../features/api/promotersApi";
import CircularLoader from "../../components/skeleton/CircularLoader";

const PromoterDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const { data, isLoading, isError } = useGetPromoterByIdQuery(id);
    if (isLoading) return <CircularLoader />;
    if (isError) return <p>Error loading promoter details</p>;

    console.log(data);
    const promoter = data?.data;

    const renderRow = (label, value) => (
        <Grid container spacing={2} sx={{ py: 1 }}>
            <Grid item xs={12} sm={3}>
                <Typography variant="body2" fontWeight="bold">
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Typography variant="body2">{value || "-"}</Typography>
            </Grid>
        </Grid>
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={2}>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    Back
                </Button>
                <Typography variant="h6" fontWeight="bold">
                    Promoter Details
                </Typography>
            </Box>

            {/* Tabs */}
            <Tabs
                value={tab}
                onChange={(e, newVal) => setTab(newVal)}
                sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
                <Tab label="Promoter Details" />
                <Tab label="Documents" />
            </Tabs>

            {/* Tab Panels */}
            {tab === 0 && (
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Branch", promoter.branch)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Promoter Number", promoter.promoterNumber)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("First Name", promoter.firstName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Middle Name", promoter.middleName)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Last Name", promoter.lastName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Email", promoter.email)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Mobile Number", promoter.mobile)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Occupation", promoter.occupation)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Marital Status", promoter.maritalStatus)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Enrollment Date", promoter.enrollmentDate)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Title", promoter.title)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Gender", promoter.gender)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Date of Birth", promoter.dob)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Father’s Name", promoter.fatherName)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Spouse/Husband Name", promoter.spouseName)}
                        </Grid>

                        {/* Address spans full width */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {renderRow("Address", promoter.address)}
                        </Grid>
                    </Grid>
                </Paper>
            )}


            {tab === 1 && (
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        {[
                            "Pan Card",
                            "Aadhar Card",
                            "Voter ID",
                            "Bank Statement",
                            "Signature",
                            "Driving License",
                            "Photo",
                        ].map((label, idx) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                                <Typography variant="body2" fontWeight="bold" gutterBottom>
                                    {label}
                                </Typography>
                                <TextField type="file" fullWidth size="small" />
                            </Grid>
                        ))}

                        {/* Other Document Name + File */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Other
                            </Typography>
                            <TextField placeholder="Enter Other Document Name" fullWidth size="small" sx={{ mb: 1 }} />
                            <TextField type="file" fullWidth size="small" />
                        </Grid>
                    </Grid>

                    {/* Save / Cancel */}
                    <Box mt={3} display="flex" gap={2}>
                        <Button variant="contained" sx={{ bgcolor: "#7858C6" }}>
                            Save
                        </Button>
                        <Button variant="outlined">Cancel</Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default PromoterDetails;
