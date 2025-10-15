
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
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
    InputAdornment,
    Snackbar,
    Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPromoterMutation, useGetPromoterByIdQuery, useUpdatePromoterMutation } from "../../features/api/promotersApi";
import { useForm, Controller } from "react-hook-form";
import { useGetAllBranchesQuery } from "../../features/api/branchesApi";

const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];

export default function AddPromoter() {
    const { id } = useParams();
    const isEdit = id && id !== "add";

    const [addPromoter] = useAddPromoterMutation();
    const [updatePromoter] = useUpdatePromoterMutation();
    const { data: promoterData } = useGetPromoterByIdQuery(id, {
        skip: !isEdit,
    });
    const { data: branchResponse, isLoading: isBranchesLoading } = useGetAllBranchesQuery();
    const branches = branchResponse?.data || [];

    const navigate = useNavigate();



    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            branchId: "",
            enrollmentDate: "",
            title: "",
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "",
            email: "",
            dateOfBirth: "",
            occupation: "",
            fatherName: "",
            spouseName: "",
            mobileNumber: "",
            maritalStatus: "",
            aadhaarNumber: "",
            panNumber: "",
            meterNumber: "",
            ciRelation: "",
            ciNumber: "",
            voterId: "",
            rationCardNumber: "",
            dlNumber: "",
            nomineeName: "",
            nomineeRelation: "",
            nomineeMobileNumber: "",
            nomineeAadhaarNumber: "",
            nomineeVoterId: "",
            nomineePanNumber: "",
            nomineeAddress: "",
        }
    });


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [expanded, setExpanded] = useState(isMobile ? false : "promoter");

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "",
    });
    const handleCloseSnackbar = () =>
        setSnackbar((prev) => ({ ...prev, open: false }));

    useEffect(() => {
        setExpanded(isMobile ? false : "promoter");
    }, [isMobile]);



    useEffect(() => {
        if (isEdit && promoterData) {
            const mappedData = {
                branchId: promoterData.branchId,
                enrollmentDate: promoterData.enrollmentDate?.split("T")[0], // ensure date works
                title: promoterData.title,
                firstName: promoterData.firstName,
                middleName: promoterData.middleName,
                lastName: promoterData.lastName,
                gender: promoterData.gender,
                email: promoterData.email,
                dateOfBirth: promoterData.dateOfBirth?.split("T")[0],
                occupation: promoterData.occupation,
                fatherName: promoterData.fatherName,
                spouseName: promoterData.spouseName,
                mobileNumber: promoterData.mobileNumber,
                maritalStatus: promoterData.maritalStatus,
                // kyc
                aadhaarNumber: promoterData.aadhaarNumber,
                panNumber: promoterData.panNumber,
                meterNumber: promoterData.meterNumber,
                ciRelation: promoterData.ciRelation,
                ciNumber: promoterData.ciNumber,
                voterId: promoterData.voterId,
                rationCardNumber: promoterData.rationCardNumber,
                dlNumber: promoterData.dlNumber,
                // nominee
                nomineeName: promoterData.nomineeName,
                nomineeRelation: promoterData.nomineeRelation,
                nomineeMobileNumber: promoterData.nomineeMobileNumber,
                nomineeAadhaarNumber: promoterData.nomineeAadhaarNumber,
                nomineeVoterId: promoterData.nomineeVoterId,
                nomineePanNumber: promoterData.nomineePanNumber,
                nomineeAddress: promoterData.nomineeAddress,
            };
            reset(mappedData);
        }
    }, [isEdit, promoterData, reset]);


    const handleAccordion = (panel) => (evt, next) => {
        setExpanded(next ? panel : false);
    };

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                response = await updatePromoter({ id, body: data }).unwrap();
            } else {
                response = await addPromoter(data).unwrap();
            }

            if (response?.success === true) {
                setSnackbar({
                    open: true,
                    message: response.message || (isEdit ? "Promoter updated!" : "Promoter added!"),
                    severity: "success",
                });
                setTimeout(() => navigate("/promoters"), 500);
            }
            else {
                setSnackbar({ open: true, message: response?.message || 'Error occurred', severity: 'error' });
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: err?.message || "Error occurred",
                severity: "error",
            });
        }
    };

    const headerStyle = (panel) => ({
        backgroundColor: expanded === panel ? "#6f42c1" : "#f6eefb",
        color: expanded === panel ? "#fff" : "text.primary",
        "& .MuiAccordionSummary-content": { alignItems: "center" },
        px: 2,
    });

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    {isEdit ? "Edit Promoter" : "Add Promoter"}
                </Typography>
                <IconButton aria-label="back" onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon />
                    <Typography variant="button" sx={{ ml: 0.5 }}>
                        Back
                    </Typography>
                </IconButton>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Top inputs: Branch & Enrollment Date */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>

                        <FormControl fullWidth error={!!errors.branch}>
                            <InputLabel id="branch-label">Branch</InputLabel>
                            <Controller
                                name="branchId"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Branch is required" }}
                                render={({ field }) => (
                                    <Select
                                        labelId="branch-label"
                                        label="Branch"
                                        {...field}
                                        displayEmpty
                                        disabled={isBranchesLoading}
                                    >
                                        <MenuItem value="">Select Branch</MenuItem>
                                        {branches.map((branch) => (
                                            <MenuItem key={branch.id} value={branch.id}>
                                                {branch.name} ({branch.location})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.branchId && (
                                <Typography color="error" variant="caption">
                                    {errors.branchId.message}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth error={!!errors.enrollmentDate}>
                            <InputLabel htmlFor="enrollmentDate">Enrollment Date</InputLabel>
                            <OutlinedInput
                                id="enrollmentDate"
                                type="date"
                                label="Enrollment Date"
                                {...register("enrollmentDate", {
                                    required: "Enrollment Date is required",
                                })}
                                labelWidth={110}
                            />
                            {errors.enrollmentDate && (
                                <Typography color="error" variant="caption">
                                    {errors.enrollmentDate.message}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Promoter Information */}
                <Accordion
                    expanded={expanded === "promoter"}
                    onChange={handleAccordion("promoter")}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("promoter")}>
                        <Typography fontWeight={600}>Promoter Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.title}>
                                        <InputLabel id="title-label">Title</InputLabel>
                                        <Controller
                                            name="title"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "Title is required" }}
                                            render={({ field }) => (
                                                <Select labelId="title-label" label="Title" {...field}>
                                                    <MenuItem value="">Select Title</MenuItem>
                                                    {titles.map((t) => (
                                                        <MenuItem key={t} value={t}>
                                                            {t}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                        {errors.title && (
                                            <Typography color="error" variant="caption">
                                                {errors.title.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.firstName}>
                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                        <OutlinedInput
                                            id="firstName"
                                            placeholder="Enter First Name"
                                            {...register("firstName", {
                                                required: "First Name is required",
                                            })}
                                            defaultValue=""
                                        />
                                        {errors.firstName && (
                                            <Typography color="error" variant="caption">
                                                {errors.firstName.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="middleName">Middle Name</InputLabel>
                                        <OutlinedInput
                                            id="middleName"
                                            placeholder="Enter Middle Name"
                                            {...register("middleName")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                        <OutlinedInput
                                            id="lastName"
                                            placeholder="Enter Last Name"
                                            {...register("lastName")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.gender}>
                                        <InputLabel id="gender-label">Gender</InputLabel>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "Gender is required" }}
                                            render={({ field }) => (
                                                <Select labelId="gender-label" label="Gender" {...field}>
                                                    <MenuItem value="">Select Gender</MenuItem>
                                                    {genders.map((g) => (
                                                        <MenuItem key={g} value={g}>
                                                            {g}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                        {errors.gender && (
                                            <Typography color="error" variant="caption">
                                                {errors.gender.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.email}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <OutlinedInput
                                            id="email"
                                            placeholder="Enter Email Address"
                                            {...register("email", {
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter a valid email address",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <Typography color="error" variant="caption">
                                                {errors.email.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.dob}>
                                        <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel>
                                        <OutlinedInput
                                            id="dateOfBirth"
                                            type="date"
                                            label="Date of Birth"
                                            {...register("dateOfBirth", { required: "Date of Birth is required" })}
                                            labelWidth={95}
                                        />
                                        {errors.dateOfBirth && (
                                            <Typography color="error" variant="caption">
                                                {errors.dateOfBirth.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="occupation">Occupation</InputLabel>
                                        <OutlinedInput
                                            id="occupation"
                                            placeholder="Enter Occupation"
                                            {...register("occupation")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="fatherName">Father Name</InputLabel>
                                        <OutlinedInput
                                            id="fatherName"
                                            placeholder="Enter Father Name"
                                            {...register("fatherName")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="spouseName">Husband / Spouse Name</InputLabel>
                                        <OutlinedInput
                                            id="spouseName"
                                            placeholder="Enter Husband/Spouse Name"
                                            {...register("spouseName")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.mobile}>
                                        <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                                        <OutlinedInput
                                            id="mobileNumber"
                                            placeholder="Enter Mobile Number"
                                            startAdornment={
                                                <InputAdornment position="start">📞</InputAdornment>
                                            }
                                            {...register("mobileNumber", {
                                                required: "Mobile number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Enter a valid 10-digit mobile number",
                                                },
                                            })}
                                        />
                                        {errors.mobileNumber && (
                                            <Typography color="error" variant="caption">
                                                {errors.mobileNumber.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth error={!!errors.maritalStatus}>
                                        <InputLabel id="marital-label">Marital Status</InputLabel>
                                        <Controller
                                            name="maritalStatus"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "Marital Status is required" }}
                                            render={({ field }) => (
                                                <Select
                                                    labelId="marital-label"
                                                    label="Marital Status"
                                                    {...field}
                                                >
                                                    <MenuItem value="">Select Marital Status</MenuItem>
                                                    {maritalStatuses.map((m) => (
                                                        <MenuItem key={m} value={m}>
                                                            {m}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                        {errors.maritalStatus && (
                                            <Typography color="error" variant="caption">
                                                {errors.maritalStatus.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Promoter's KYC */}
                <Accordion
                    expanded={expanded === "kyc"}
                    onChange={handleAccordion("kyc")}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("kyc")}>
                        <Typography fontWeight={600}>Promoter's KYC</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                {[
                                    { name: "aadhaarNumber", label: "Aadhar Number" },
                                    { name: "panNumber", label: "PAN Number" },
                                    { name: "meterNumber", label: "Meter Number" },
                                    { name: "ciRelation", label: "CI Relation" },
                                    { name: "ciNumber", label: "CI Number" },
                                    { name: "voterId", label: "Voter ID" },
                                    { name: "rationCardNumber", label: "Ration Card Number" },
                                    { name: "dlNumber", label: "DL Number" },
                                ].map(({ name, label }) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={name}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor={name}>{label}</InputLabel>
                                            <OutlinedInput
                                                id={name}
                                                placeholder={`Enter ${label}`}
                                                {...register(name)}
                                            />
                                        </FormControl>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Nominee Information */}
                <Accordion
                    expanded={expanded === "nominee"}
                    onChange={handleAccordion("nominee")}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("nominee")}>
                        <Typography fontWeight={600}>Nominee Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeName">Nominee Name</InputLabel>
                                        <OutlinedInput
                                            id="nomineeName"
                                            placeholder="Enter Nominee Name"
                                            {...register("nomineeName")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeRelation">Nominee Relation</InputLabel>
                                        <OutlinedInput
                                            id="nomineeRelation"
                                            placeholder="Enter Nominee Relation"
                                            {...register("nomineeRelation")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeMobileNumber">Mobile Number</InputLabel>
                                        <OutlinedInput
                                            id="nomineeMobileNumber"
                                            placeholder="Enter Mobile Number"
                                            {...register("nomineeMobileNumber")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeAadhaarNumber">Nominee Aadhar Number</InputLabel>
                                        <OutlinedInput
                                            id="nomineeAadhaarNumber"
                                            placeholder="Enter Nominee Aadhar Number"
                                            {...register("nomineeAadhaarNumber")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeVoterId">Nominee Voter ID Number</InputLabel>
                                        <OutlinedInput
                                            id="nomineeVoterId"
                                            placeholder="Enter Nominee Voter ID Number"
                                            {...register("nomineeVoterId")}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineePanNumber">Nominee Pan Number</InputLabel>
                                        <OutlinedInput
                                            id="nomineePanNumber"
                                            placeholder="Enter Nominee Pan Number"
                                            {...register("nomineePanNumber")}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="nomineeAddress">Nominee Address</InputLabel>
                                        <OutlinedInput
                                            id="nomineeAddress"
                                            placeholder="Enter Nominee Address"
                                            multiline
                                            rows={2}
                                            {...register("nomineeAddress")}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Action Buttons */}
                <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
                >
                    <Button variant="contained" color="primary" type="submit" sx={{ px: 4 }}>
                        {isEdit ? "Update Promoter" : "Add Promoter"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/promoters")}
                        sx={{ px: 3 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

