import React, { useState, useEffect } from "react";
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
    OutlinedInput,
    Snackbar,
    Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm, Controller } from "react-hook-form";
import { useGetAllAgentsQuery } from "../../features/api/agentsApi";
import { useGetAllEmployeesQuery } from "../../features/api/employeesApi";
import { useGetAllCspsQuery } from "../../features/api/cspsApi";
import { useGetAllBranchesQuery } from "../../features/api/branchesApi";
import { useCreateMemberMutation } from "../../features/api/membersApi";


const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];

export default function AddMember() {
    const [category, setCategory] = useState(""); // Selected category
    const [items, setItems] = useState([]);

    const { data: agentsData, isLoading: agentsLoading } = useGetAllAgentsQuery();
    const { data: employeesData, isLoading: employeesLoading } = useGetAllEmployeesQuery();
    const { data: cspsData, isLoading: cspsLoading } = useGetAllCspsQuery();
    const { data: branchesData, isLoading: isBranchesLoading } = useGetAllBranchesQuery();

    const [createMember, { isLoading: isCreating }] = useCreateMemberMutation();

    console.log(agentsData)
    console.log(employeesData)
    console.log(cspsData)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }, reset
    } = useForm();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const handleCloseSnackbar = () =>
        setSnackbar((prev) => ({ ...prev, open: false }));

    // const onSubmit = async (data) => {
    //     try {
    //         const response = await createMember(data).unwrap();
    //         console.log(response)
    //         if (response.success) {
    //             setSnackbar({ open: true, message: response.message || "Member added!", severity: "success" });
    //             setTimeout(() => navigate("/members"), 500);
    //         } else {
    //             setSnackbar({ open: true, message: response.message || "Error occurred", severity: "error" });
    //         }
    //     } catch (err) {
    //         setSnackbar({ open: true, message: err.message || "Error occurred", severity: "error" });
    //     }
    // };


    const onSubmit = async (formData) => {
        try {
            // Transform the form data to match the API structure
            const transformedData = {
                branchId: parseInt(formData.branchId),
                // Conditionally include agentId, employeeId, or cspId based on category
                ...(category === "Agent" && { agentId: parseInt(formData.personId) }),
                ...(category === "Employee" && { employeeId: parseInt(formData.personId) }),
                ...(category === "CSP" && { cspId: parseInt(formData.personId) }),
                title: formData.title,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                emails: [
                    {
                        email: formData.email,
                        active: true // You'll need to capture this from your form
                    }
                ],
                dob: formData.dob,
                occupation: formData.occupation,
                annualIncomeRange: formData.annualIncomeRange, // You'll need to add this field to your form
                monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                spouseName: formData.spouseName || "N/A",
                maritalStatus: formData.maritalStatus, // You'll need to add this field to your form
                enrollmentDate: formData.enrollmentDate,
                exServicePerson: formData.exServicePerson ? "active" : "inactive", // You'll need to capture the switch value
                mobileNumbers: [
                    {
                        number: formData.mobileNumber, // You'll need to add mobile number fields
                        active: true
                    }
                ],
                kycInfo: {
                    aadharNumber: formData.aadharNumber,
                    panNumber: formData.panNumber,
                    meterNumber: formData.meterNumber,
                    ciRelation: formData.ciRelation,
                    voterId: formData.voterId,
                    rationCardNumber: formData.rationCardNumber,
                    dcNumber: formData.dcNumber,
                    ciNumber: formData.ciNumber
                },
                bankAccountDetails: {
                    bankName: formData.bankName,
                    bankCode: formData.bankCode,
                    accountType: formData.accountType,
                    accountNumber: formData.accountNumber
                },
                correspondenceAddress: {
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    landmark: formData.landmark,
                    city: formData.city,
                    state: formData.state,
                    pinCode: formData.pinCode,
                    country: formData.country
                },
                permanentAddress: {
                    address: formData.address,
                    city: formData.permanentCity || formData.city, // You might want separate fields
                    state: formData.permanentState || formData.state,
                    pinCode: formData.permanentPinCode || formData.pinCode
                },
                gpsLocation: {
                    latitude: formData.latitude,
                    longitude: formData.longitude
                },
                nomineeInfo: {
                    nomineeName: formData.nomineeName,
                    relation: formData.nomineeRelation, // You'll need to add this field
                    mobileNumber: formData.nomineeMobileNumber, // You'll need to add this field
                    aadharCard: formData.aadharCard,
                    voterId: formData.nomineeVoterId || formData.voterId,
                    pan: formData.pan,
                    rationCard: formData.rationCard,
                    address: formData.nomineeAddress || formData.address
                }
            };

            console.log("Transformed Data:", transformedData);

            // Use the createMember function with transformed data
            const response = await createMember(transformedData).unwrap();

            if (response.success) {
                setSnackbar({ open: true, message: response.message || "Member added!", severity: "success" });
                setTimeout(() => navigate("/members"), 500);
            } else {
                setSnackbar({ open: true, message: response.message || "Error occurred", severity: "error" });
            }
        } catch (err) {
            setSnackbar({ open: true, message: err.data?.message || err.message || "Error occurred", severity: "error" });
        }
    };
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        switch (category) {
            case "Agent":
                setItems(agentsData?.data || []);
                break;
            case "Employee":
                setItems(employeesData?.data || []);
                break;
            case "CSP":
                setItems(cspsData?.data || []);
                break;
            default:
                setItems([]);
        }
        setValue("personId", ""); // reset selected person when category changes
    }, [category, agentsData, employeesData, cspsData]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add Member
            </Typography>

            {/* Top Selects */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <Grid container spacing={2} mb={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Category"
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                <MenuItem value="Agent">Agent</MenuItem>
                                <MenuItem value="Employee">Employee</MenuItem>
                                <MenuItem value="CSP">CSP</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Person</InputLabel>
                            <Controller
                                name="personId"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select {...field} label="Person">
                                        <MenuItem value="">Select One</MenuItem>
                                        {items.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name || item.fullName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth error={!!errors.branchId}>
                            <InputLabel id="branch-label">Branch</InputLabel>
                            <Controller
                                name="branchId"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Branch is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="branch-label"
                                        label="Branch"
                                        displayEmpty
                                        disabled={isBranchesLoading}
                                    >
                                        <MenuItem value="">Select Branch</MenuItem>
                                        {branchesData?.data?.map((branch) => (
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
                    <AccordionDetails sx={{ mt: 1 }}>
                        <Grid container spacing={2}>

                            {/* Application Number */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="applicationNumber">Application Number</InputLabel>
                                <OutlinedInput
                                    id="applicationNumber"
                                    label="applicationNumber"
                                    {...register("applicationNumber", {
                                        required: "application number is required",
                                    })}
                                />
                            </Grid>

                            {/* Title */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth error={!!errors.title}>
                                    <InputLabel htmlFor="title-label">Title</InputLabel>
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

                            {/* First Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                            </Grid>

                            {/* Last Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <OutlinedInput
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <Typography color="error" variant="caption">
                                        {errors.lastName.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Gender */}
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

                            {/* Email */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    id="email"
                                    placeholder="Enter Email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <Typography color="error" variant="caption">
                                        {errors.email.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/*DOB */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="dob">Date Of Birth</InputLabel>
                                <OutlinedInput
                                    id="dob"
                                    type="date"
                                    placeholder="Enter DOB"
                                    {...register("dob")}
                                />
                                {errors.dob && (
                                    <Typography color="error" variant="caption">
                                        {errors.dob.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/*Occupation */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="dob">Occupation</InputLabel>
                                <OutlinedInput
                                    id="occupation"
                                    placeholder="Enter Occupation"
                                    {...register("occupation")}
                                />
                                {errors.occupation && (
                                    <Typography color="error" variant="caption">
                                        {errors.occupation.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Annual Income Range */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="income-range-label">Annual Income Range</InputLabel>
                                    <Select
                                        labelId="income-range-label"
                                        label="Annual Income Range"
                                        defaultValue=""
                                    >
                                        <MenuItem value="">Select One</MenuItem>
                                        <MenuItem value="Below ₹1 Lakh">Below ₹1 Lakh</MenuItem>
                                        <MenuItem value="₹1 Lakh - ₹2.5 Lakh">₹1 Lakh - ₹2.5 Lakh</MenuItem>
                                        <MenuItem value="₹2.5 Lakh - ₹5 Lakh">₹2.5 Lakh - ₹5 Lakh</MenuItem>
                                        <MenuItem value="₹5 Lakh - ₹10 Lakh">₹5 Lakh - ₹10 Lakh</MenuItem>
                                        <MenuItem value="₹10 Lakh - ₹25 Lakh">₹10 Lakh - ₹25 Lakh</MenuItem>
                                        <MenuItem value="₹25 Lakh - ₹50 Lakh">₹25 Lakh - ₹50 Lakh</MenuItem>
                                        <MenuItem value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</MenuItem>
                                        <MenuItem value="Above ₹1 Crore">Above ₹1 Crore</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Monthly income */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="monthlyIncome">Monthly income</InputLabel>
                                <OutlinedInput
                                    id="monthlyIncome"
                                    placeholder="Enter Monthly Income"
                                    {...register("monthlyIncome")}
                                />
                                {errors.monthlyIncome && (
                                    <Typography color="error" variant="caption">
                                        {errors.monthlyIncome.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Father Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="fatherName">Father Name</InputLabel>
                                <OutlinedInput
                                    id="fatherName"
                                    placeholder="Enter Father Name"
                                    {...register("fatherName")}
                                />
                                {errors.fatherName && (
                                    <Typography color="error" variant="caption">
                                        {errors.fatherName.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Mother Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="motherName">Mother Name</InputLabel>
                                <OutlinedInput
                                    id="motherName"
                                    placeholder="Enter Mother Name"
                                    {...register("montherName")}
                                />
                                {errors.motherName && (
                                    <Typography color="error" variant="caption">
                                        {errors.motherName.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Spouse Name */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="spouseName">Spouse Name</InputLabel>
                                <OutlinedInput
                                    id="spouseName"
                                    placeholder="Enter Spouse Name"
                                    {...register("spouseName")}
                                />
                                {errors.spouseName && (
                                    <Typography color="error" variant="caption">
                                        {errors.spouseName.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Marital Status */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
                                    <Select
                                        labelId="marital-status-label"
                                        label="Marital Status"
                                        defaultValue=""
                                    >
                                        <MenuItem value="">Select Marital Status</MenuItem>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                        <MenuItem value="Widowed">Widowed</MenuItem>
                                        <MenuItem value="Separated">Separated</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Enrollment Date */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="spouseName">Enrollment Date</InputLabel>
                                <OutlinedInput
                                    id="enrollmentDate"
                                    type="date"
                                    placeholder="Enter Enrollment Date"
                                    {...register("enrollmentDate")}
                                />
                                {errors.enrollmentDate && (
                                    <Typography color="error" variant="caption">
                                        {errors.enrollmentDate.message}
                                    </Typography>
                                )}
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
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    id="email"
                                    placeholder="Enter Email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <Typography color="error" variant="caption">
                                        {errors.email.message}
                                    </Typography>
                                )}
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
                                <InputLabel htmlFor="aadharNumber">Aadhar Number</InputLabel>
                                <OutlinedInput
                                    id="aadharNumber"
                                    placeholder="Enter Aadhar Number"
                                    {...register("aadharNumber")}
                                />
                                {errors.aadharNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.aadharNumber.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="panNumber">PAN Number</InputLabel>
                                <OutlinedInput
                                    id="panNumber"
                                    placeholder="Enter PAN Number"
                                    {...register("panNumber")}
                                />
                                {errors.panNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.panNumber.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="voterId">Voter ID</InputLabel>
                                <OutlinedInput
                                    id="voterId"
                                    placeholder="Enter Voter ID"
                                    {...register("voterId")}
                                />
                                {errors.voterId && (
                                    <Typography color="error" variant="caption">
                                        {errors.voterId.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="voterId">Ration Card Number</InputLabel>
                                <OutlinedInput
                                    id="rationCardNumber"
                                    placeholder="Enter Ration Card Number"
                                    {...register("rationCardNumber")}
                                />
                                {errors.rationCardNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.rationCardNumber.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="dcNumber">Driving License Number</InputLabel>
                                <OutlinedInput
                                    id="dcNumber"
                                    placeholder="Enter Driving License Number"
                                    {...register("dcNumber")}
                                />
                                {errors.dcNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.dcNumber.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="ciRelation">CI Relation</InputLabel>
                                <OutlinedInput
                                    id="ciRelation"
                                    placeholder="Enter CI Relation"
                                    {...register("ciRelation")}
                                />
                                {errors.ciRelation && (
                                    <Typography color="error" variant="caption">
                                        {errors.ciRelation.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="ciNumber">CI Number</InputLabel>
                                <OutlinedInput
                                    id="ciNumber"
                                    placeholder="Enter CI Number"
                                    {...register("ciNumber")}
                                />
                                {errors.ciNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.ciNumber.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="meterNumber">Meter Number</InputLabel>
                                <OutlinedInput
                                    id="meterNumber"
                                    placeholder="Enter Meter Number"
                                    {...register("meterNumber")}
                                />
                                {errors.meterNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.meterNumber.message}
                                    </Typography>
                                )}
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

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="bankName">Bank Name</InputLabel>
                                <OutlinedInput
                                    id="bankName"
                                    placeholder="Enter Bank Name"
                                    {...register("bankName")}
                                />
                                {errors.bankName && (
                                    <Typography color="error" variant="caption">
                                        {errors.bankName.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="bankCode">IFSC CODE</InputLabel>
                                <OutlinedInput
                                    id="bankCode"
                                    placeholder="Enter IFSC code"
                                    {...register("bankCode")}
                                />
                                {errors.bankCode && (
                                    <Typography color="error" variant="caption">
                                        {errors.bankCode.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="accountType">Account Type</InputLabel>
                                <OutlinedInput
                                    id="accountType"
                                    placeholder="Account Type"
                                    {...register("accountType")}
                                />
                                {errors.accountType && (
                                    <Typography color="error" variant="caption">
                                        {errors.accountType.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
                                <OutlinedInput
                                    id="accountNumber"
                                    placeholder="Enter Account Number"
                                    {...register("accountNumber")}
                                />
                                {errors.accountNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.accountNumber.message}
                                    </Typography>
                                )}
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


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="addressLine1">Address Line 1</InputLabel>
                                <OutlinedInput
                                    id="addressLine1"
                                    placeholder="Enter Address Line 1"
                                    {...register("addressLine1")}
                                />
                                {errors.addressLine1 && (
                                    <Typography color="error" variant="caption">
                                        {errors.addressLine1.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="addressLine2">Address Line 2</InputLabel>
                                <OutlinedInput
                                    id="addressLine2"
                                    placeholder="Enter Address Line 2"
                                    {...register("addressLine2")}
                                />
                                {errors.addressLine2 && (
                                    <Typography color="error" variant="caption">
                                        {errors.addressLine2.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="landmark">Landmark</InputLabel>
                                <OutlinedInput
                                    id="landmark"
                                    placeholder="Enter Landmark"
                                    {...register("landmark")}
                                />
                                {errors.landmark && (
                                    <Typography color="error" variant="caption">
                                        {errors.landmark.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <OutlinedInput
                                    id="city"
                                    placeholder="Enter City"
                                    {...register("city")}
                                />
                                {errors.city && (
                                    <Typography color="error" variant="caption">
                                        {errors.city.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="state">State</InputLabel>
                                <OutlinedInput
                                    id="state"
                                    placeholder="Enter State"
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && (
                                    <Typography color="error" variant="caption">
                                        {errors.state.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="pinCode">Pin Code</InputLabel>
                                <OutlinedInput
                                    id="pinCode"
                                    placeholder="Enter Pin Code"
                                    type="number"
                                    {...register("pinCode", {
                                        required: "Pin Code is required",
                                        pattern: {
                                            value: /^[1-9][0-9]{5}$/,
                                            message: "Enter a valid 6-digit Pin Code",
                                        },
                                    })}
                                />
                                {errors.pinCode && (
                                    <Typography color="error" variant="caption">
                                        {errors.pinCode.message}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Country */}
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="country">Country</InputLabel>
                                <OutlinedInput
                                    id="country"
                                    placeholder="Enter Country"
                                    {...register("country", { required: "Country is required" })}
                                />
                                {errors.country && (
                                    <Typography color="error" variant="caption">
                                        {errors.country.message}
                                    </Typography>
                                )}
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

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <OutlinedInput
                                    id="address"
                                    placeholder="Enter Address"
                                    {...register("address")}
                                />
                                {errors.address && (
                                    <Typography color="error" variant="caption">
                                        {errors.address.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <OutlinedInput
                                    id="city"
                                    placeholder="Enter City"
                                    {...register("city")}
                                />
                                {errors.city && (
                                    <Typography color="error" variant="caption">
                                        {errors.city.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="state">State</InputLabel>
                                <OutlinedInput
                                    id="state"
                                    placeholder="Enter State"
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && (
                                    <Typography color="error" variant="caption">
                                        {errors.state.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="pinCode">Pin Code</InputLabel>
                                <OutlinedInput
                                    id="pinCode"
                                    placeholder="Enter Pin Code"
                                    type="number"
                                    {...register("pinCode", {
                                        required: "Pin Code is required",
                                        pattern: {
                                            value: /^[1-9][0-9]{5}$/,
                                            message: "Enter a valid 6-digit Pin Code",
                                        },
                                    })}
                                />
                                {errors.pinCode && (
                                    <Typography color="error" variant="caption">
                                        {errors.pinCode.message}
                                    </Typography>
                                )}
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
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InputLabel htmlFor="latitude">Latitude</InputLabel>
                            <OutlinedInput
                                id="latitude"
                                placeholder="Enter Latitude"
                                {...register("latitude")}
                            />
                            {errors.latitude && (
                                <Typography color="error" variant="caption">
                                    {errors.latitude.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Longitude */}
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InputLabel htmlFor="longitude">Longitude</InputLabel>
                            <OutlinedInput
                                id="longitude"
                                placeholder="Enter Longitude"
                                {...register("longitude")}
                            />
                            {errors.longitude && (
                                <Typography color="error" variant="caption">
                                    {errors.longitude.message}
                                </Typography>
                            )}
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

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="nomineeName">Nominee Name</InputLabel>
                                <OutlinedInput
                                    id="nomineeName"
                                    placeholder="Enter Nominee Name"
                                    {...register("nomineeName")}
                                />
                                {errors.nomineeName && (
                                    <Typography color="error" variant="caption">
                                        {errors.nomineeName.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid item xs={12} sm={6} md={3}>
                                <TextField fullWidth label="Nominee Relation" placeholder="Enter Nominee Relation" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                                <OutlinedInput
                                    id="mobileNumber"
                                    placeholder="Enter Mobile Number"
                                    {...register("mobileNumber")}
                                />
                                {errors.mobileNumber && (
                                    <Typography color="error" variant="caption">
                                        {errors.mobileNumber.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="aadharCard">Aadhar Card</InputLabel>
                                <OutlinedInput
                                    id="aadharCard"
                                    placeholder="Enter Aadhar Card Number"
                                    {...register("aadharCard")}
                                />
                                {errors.aadharCard && (
                                    <Typography color="error" variant="caption">
                                        {errors.aadharCard.message}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="voterId">Voter ID</InputLabel>
                                <OutlinedInput
                                    id="voterId"
                                    placeholder="Enter Voter ID"
                                    {...register("voterId")}
                                />
                                {errors.voterId && (
                                    <Typography color="error" variant="caption">
                                        {errors.voterId.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="pan">PAN</InputLabel>
                                <OutlinedInput
                                    id="pan"
                                    placeholder="Enter PAN Number"
                                    {...register("pan")}
                                />
                                {errors.pan && (
                                    <Typography color="error" variant="caption">
                                        {errors.pan.message}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <InputLabel htmlFor="rationCard">Ration Card</InputLabel>
                                <OutlinedInput
                                    id="rationCard"
                                    placeholder="Enter Ration Card Number"
                                    {...register("rationCard")}
                                />
                                {errors.rationCard && (
                                    <Typography color="error" variant="caption">
                                        {errors.rationCard.message}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <OutlinedInput
                                    id="address"
                                    placeholder="Enter Full Address"
                                    {...register("address")}
                                />
                                {errors.address && (
                                    <Typography color="error" variant="caption">
                                        {errors.address.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* Buttons */}
                <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" sx={{ bgcolor: "#7858C6" }} type="submit">
                        Add Member
                    </Button>
                    <Button variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </Box>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

            </form>

        </Box >
    );
};


