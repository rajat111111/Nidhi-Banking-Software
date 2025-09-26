import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

/**
 * AddPromoter page — MUI + responsive accordion layout matching provided screenshots.
 * Put this file in ../Pages/promoters/AddPromoter.jsx
 */

const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];

const initialState = {
    branch: "",
    enrollmentDate: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    dob: "",
    occupation: "",
    fatherName: "",
    spouseName: "",
    mobile: "",
    maritalStatus: "",
    // KYC
    aadhar: "",
    pan: "",
    meter: "",
    ciRelation: "",
    ciNumber: "",
    voter: "",
    ration: "",
    dl: "",
    // Nominee
    nomineeName: "",
    nomineeRelation: "",
    nomineeMobile: "",
    nomineeAadhar: "",
    nomineeVoter: "",
    nomineePan: "",
    nomineeAddress: "",
};

export default function AddPromoter() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    // control which accordion is open. default: promoter on desktop, closed on mobile
    const [expanded, setExpanded] = useState(isMobile ? false : "promoter");
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // change default when screen size changes (desktop opens promoter by default)
        setExpanded(isMobile ? false : "promoter");
    }, [isMobile]);

    const handleAccordion = (panel) => (evt, next) => {
        setExpanded(next ? panel : false);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
        setErrors((err) => ({ ...err, [name]: false }));
    };

    const validate = () => {
        const newErr = {};
        if (!form.firstName?.trim()) newErr.firstName = "First name required";
        if (!form.mobile?.trim()) newErr.mobile = "Mobile required";
        // add any other validations you want
        setErrors(newErr);
        return Object.keys(newErr).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            // open the section containing first error
            if (errors.firstName || !form.firstName) setExpanded("promoter");
            else if (errors.aadhar) setExpanded("kyc");
            else setExpanded("promoter");
            return;
        }

        // TODO: replace with supabase/api call
        console.log("Submit promoter:", form);

        // navigate back to promoters list after successful submit
        navigate("/promoters");
    };

    const headerStyle = (panel) => ({
        backgroundColor: expanded === panel ? "#6f42c1" : "#f6eefb",
        color: expanded === panel ? "#fff" : "text.primary",
        "& .MuiAccordionSummary-content": { alignItems: "center" },
        px: 2,
    });

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Top row: Title + Back */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                    Add Promoter
                </Typography>
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon />
                    <Typography variant="button" sx={{ ml: 0.5 }}>
                        Back
                    </Typography>
                </IconButton>
            </Box>

            <form onSubmit={handleSubmit} noValidate>
                {/* Top inputs (Branch & Enrollment Date like screenshot) */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel id="branch-label">Branch</InputLabel>
                            <Select
                                labelId="branch-label"
                                name="branch"
                                label="Branch"
                                value={form.branch}
                                onChange={onChange}
                                displayEmpty
                            >
                                <MenuItem value="">Select Branch</MenuItem>
                                <MenuItem value="main">Main Branch</MenuItem>
                                <MenuItem value="north">North Branch</MenuItem>
                                {/* add real branches */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            name="enrollmentDate"
                            label="Enrollment Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={form.enrollmentDate}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>

                {/* Promoter Information */}
                <Accordion expanded={expanded === "promoter"} onChange={handleAccordion("promoter")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("promoter")}>
                        <Typography fontWeight={600}>Promoter Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="title-label">Title</InputLabel>
                                        <Select
                                            labelId="title-label"
                                            name="title"
                                            label="Title"
                                            value={form.title}
                                            onChange={onChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">Select Title</MenuItem>
                                            {titles.map((t) => (
                                                <MenuItem value={t} key={t}>
                                                    {t}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        name="firstName"
                                        label="First Name"
                                        placeholder="Enter First Name"
                                        value={form.firstName}
                                        onChange={onChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        name="middleName"
                                        label="Middle Name"
                                        placeholder="Enter Middle Name"
                                        value={form.middleName}
                                        onChange={onChange}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="lastName" label="Last Name" placeholder="Enter Last Name" value={form.lastName} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">Gender</InputLabel>
                                        <Select labelId="gender-label" name="gender" label="Gender" value={form.gender} onChange={onChange}>
                                            <MenuItem value="">Select Gender</MenuItem>
                                            {genders.map((g) => (
                                                <MenuItem value={g} key={g}>
                                                    {g}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="email" label="Email" placeholder="Enter Email Address" value={form.email} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth type="date" name="dob" label="Date of Birth" InputLabelProps={{ shrink: true }} value={form.dob} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="occupation" label="Occupation" placeholder="Enter Occupation" value={form.occupation} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="fatherName" label="Father Name" placeholder="Enter Father Name" value={form.fatherName} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="spouseName" label="Husband / Spouse Name" placeholder="Enter Husband/Spouse Name" value={form.spouseName} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="mobile" label="Mobile Number" placeholder="Enter Mobile Number" value={form.mobile} onChange={onChange} error={!!errors.mobile} helperText={errors.mobile} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="marital-label">Marital Status</InputLabel>
                                        <Select labelId="marital-label" name="maritalStatus" label="Marital Status" value={form.maritalStatus} onChange={onChange}>
                                            <MenuItem value="">Select Marital Status</MenuItem>
                                            {maritalStatuses.map((m) => (
                                                <MenuItem value={m} key={m}>
                                                    {m}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Promoter's KYC */}
                <Accordion expanded={expanded === "kyc"} onChange={handleAccordion("kyc")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("kyc")}>
                        <Typography fontWeight={600}>Promoter's KYC</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="aadhar" label="Aadhar Number" placeholder="Enter Aadhar Number" value={form.aadhar} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="pan" label="PAN Number" placeholder="Enter PAN Number" value={form.pan} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="meter" label="Meter Number" placeholder="Enter Meter Number" value={form.meter} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="ciRelation" label="CI Relation" placeholder="Enter CI Relation" value={form.ciRelation} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="voter" label="Voter ID" placeholder="Enter Voter ID" value={form.voter} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="ration" label="Ration Card Number" placeholder="Enter Ration Card Number" value={form.ration} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="dl" label="DL Number" placeholder="Enter DL Number" value={form.dl} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="ciNumber" label="CI Number" placeholder="Enter CI Number" value={form.ciNumber} onChange={onChange} />
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Nominee Information */}
                <Accordion expanded={expanded === "nominee"} onChange={handleAccordion("nominee")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("nominee")}>
                        <Typography fontWeight={600}>Nominee Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineeName" label="Nominee Name" placeholder="Enter Nominee Name" value={form.nomineeName} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineeRelation" label="Nominee Relation" placeholder="Enter Nominee Relation" value={form.nomineeRelation} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineeMobile" label="Mobile Number" placeholder="Enter Mobile Number" value={form.nomineeMobile} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineeAadhar" label="Nominee Aadhar Number" placeholder="Enter Nominee Aadhar Number" value={form.nomineeAadhar} onChange={onChange} />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineeVoter" label="Nominee Voter ID Number" placeholder="Enter Nominee Voter ID Number" value={form.nomineeVoter} onChange={onChange} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField fullWidth name="nomineePan" label="Nominee Pan Number" placeholder="Enter Nominee Pan Number" value={form.nomineePan} onChange={onChange} />
                                </Grid>

                                <Grid item size={{ xs: 12 }}>
                                    <TextField fullWidth multiline rows={2} name="nomineeAddress" label="Nominee Address" placeholder="Enter Nominee Address" value={form.nomineeAddress} onChange={onChange} />
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ px: 4 }}>
                        Add Promoter
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/promoters")} sx={{ px: 3 }}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Container >
    );
}
