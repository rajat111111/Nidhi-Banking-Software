
import * as React from "react";
import {
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AddMember = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add Member
            </Typography>

            {/* Top Selects */}
            <Grid container spacing={2} mb={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                        <InputLabel>Advisor/ Agent / Employee / CSP</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="">Select One</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                        <InputLabel>Branch</InputLabel>
                        <Select defaultValue="">
                            <MenuItem value="">Select One</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Member Information */}
            <Accordion expanded={expanded === "memberInfo"}
                onChange={handleChange("memberInfo")}
                sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary
                    sx={{
                        bgcolor: expanded === "memberInfo" ? "#7858C6" : "#F2EFFA", // header bg changes
                        color: expanded === "memberInfo" ? "white" : "black"
                    }}
                >
                    <Typography sx={{ fontWeight: "bold" }}>Member Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* Fields inside member info */}
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Application Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Title</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="">Select Title</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="First Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Last Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="">Select Gender</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Email" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Occupation" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Annual Income Range</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="">Select One</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Monthly Income" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Father Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Mother Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Husband / Spouse Name" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Marital Status</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="">Select Marital Status</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Enrollment Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} display="flex" alignItems="center">
                            <FormControlLabel control={<Switch />} label="Ex - Service Person?" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Other Accordions (separately) */}
            <Accordion expanded={expanded === "email"} onChange={handleChange("email")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "email" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "email" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Email Address</Typography>
                </AccordionSummary>

                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ display: "flex", p: 1 }}>

                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label="Email Address" placeholder="Enter Email Address" />
                        </Grid>
                        <FormControlLabel control={<Switch />} label="Active" />

                    </Grid>
                    <Button variant="contained" sx={{ bgcolor: "#7858C6", color: "white", mt: 1, p: 1 }}>Add More Email</Button>
                </Box>
            </Accordion >

            <Accordion expanded={expanded === "mobile"} onChange={handleChange("mobile")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "mobile" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "mobile" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Mobile Number</Typography>
                </AccordionSummary>
                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ display: "flex", p: 1 }}>

                        <Grid size={{ xs: 6 }}>
                            <TextField fullWidth label=" Enter Mobile Number" placeholder="Enter Mobile Number" />
                        </Grid>
                        <FormControlLabel control={<Switch />} label="Active" />

                    </Grid>
                    <Button variant="contained" sx={{ bgcolor: "#7858C6", color: "white", mt: 1, p: 1 }}>Add More Mobile Number</Button>
                </Box>
            </Accordion>

            <Accordion expanded={expanded === "kyc"} onChange={handleChange("kyc")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "kyc" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "kyc" ? "white" : "black"
                }} >
                    <Typography sx={{ fontWeight: "bold" }}>KYC Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Aadhar Number" placeholder="Enter Aadhar Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="PAN Number" placeholder="Enter PAN Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Voter ID" placeholder="Enter Voter ID" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Ration Card Number" placeholder="Enter Ration Card Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Driving License Number" placeholder="Enter DL Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="CI Relation" placeholder="Enter CI Relation" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="CI Number" placeholder="Enter CI Number" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField fullWidth label="Meter Number" placeholder="Enter Meter Number" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === "bank"} onChange={handleChange("bank")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "bank" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "bank" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Bank Account Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Bank Name" placeholder="Enter Bank Name" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="IFSC Code" placeholder="Enter IFSC Code" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Account Type" placeholder="Enter Account Type (Savings/Current)" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Account Number" placeholder="Enter Account Number" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === "correspondence"} onChange={handleChange("correspondence")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "correspondence" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "correspondence" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Correspondence Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Address Line 1" placeholder="Enter Address Line 1" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Address Line 2" placeholder="Enter Address Line 2" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Landmark" placeholder="Enter Landmark" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="City" placeholder="Enter City" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="State" placeholder="Enter State" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Pin Code" placeholder="Enter Pin Code" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Country" placeholder="Enter Country" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === "permanent"} onChange={handleChange("permanent")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "permanent" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "permanent" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Permanent Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Address Line 1" placeholder="Enter Address Line 1" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Address Line 2" placeholder="Enter Address Line 2" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Landmark" placeholder="Enter Landmark" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="City" placeholder="Enter City" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="State" placeholder="Enter State" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Pin Code" placeholder="Enter Pin Code" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Country" placeholder="Enter Country" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === "gps"} onChange={handleChange("gps")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "gps" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "gps" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Address GPS Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Latitude" placeholder="Enter Latitude" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Longitude" placeholder="Enter Longitude" />
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === "nominee"} onChange={handleChange("nominee")} sx={{ mt: 1, bgcolor: "#F2EFFA" }}>
                <AccordionSummary sx={{
                    bgcolor: expanded === "nominee" ? "#7858C6" : "#F2EFFA", // header bg changes
                    color: expanded === "nominee" ? "white" : "black"
                }}>
                    <Typography sx={{ fontWeight: "bold" }}>Nominee Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Name" placeholder="Enter Nominee Name" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Relation" placeholder="Enter Nominee Relation" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Mobile Number" placeholder="Enter Nominee Mobile Number" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Aadhar Number" placeholder="Enter Nominee Aadhar Number" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Voter ID" placeholder="Enter Nominee Voter ID" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee PAN Number" placeholder="Enter Nominee PAN Number" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Ration Card Number" placeholder="Enter Nominee Ration Card Number" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Nominee Address" placeholder="Enter Nominee Address" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            {/* Buttons */}
            <Box mt={3} display="flex" justifyContent="center" gap={2}>
                <Button variant="contained" sx={{ bgcolor: "#7858C6" }}>
                    Add Member
                </Button>
                <Button variant="outlined" color="secondary">
                    Cancel
                </Button>
            </Box>
        </Box >
    );
};

export default AddMember;
