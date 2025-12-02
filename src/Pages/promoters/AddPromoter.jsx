
// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Button,
//     Container,
//     Grid,
//     IconButton,
//     Typography,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     FormControl,
//     InputLabel,
//     OutlinedInput,
//     Select,
//     MenuItem,
//     useTheme,
//     useMediaQuery,
//     InputAdornment,
//     Snackbar,
//     Alert,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAddPromoterMutation, useGetPromoterByIdQuery, useUpdatePromoterMutation } from "../../features/api/promotersApi";
// import { useForm, Controller } from "react-hook-form";
// import { useGetAllBranchesQuery } from "../../features/api/branchesApi";

// const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
// const genders = ["Male", "Female", "Other"];
// const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];

// export default function AddPromoter() {
//     const { id } = useParams();
//     const isEdit = id && id !== "add";

//     const [addPromoter] = useAddPromoterMutation();
//     const [updatePromoter] = useUpdatePromoterMutation();
//     const { data: promoterData } = useGetPromoterByIdQuery(id, {
//         skip: !isEdit,
//     });
//     const { data: branchResponse, isLoading: isBranchesLoading } = useGetAllBranchesQuery();
//     const branches = branchResponse?.data || [];

//     const navigate = useNavigate();

//     const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
//         defaultValues: {
//             branchId: "",
//             enrollmentDate: "",
//             title: "",
//             firstName: "",
//             middleName: "",
//             lastName: "",
//             gender: "",
//             email: "",
//             dateOfBirth: "",
//             occupation: "",
//             fatherName: "",
//             spouseName: "",
//             mobileNumber: "",
//             maritalStatus: "",
//             aadhaarNumber: "",
//             panNumber: "",
//             meterNumber: "",
//             ciRelation: "",
//             ciNumber: "",
//             voterId: "",
//             rationCardNumber: "",
//             dlNumber: "",
//             nomineeName: "",
//             nomineeRelation: "",
//             nomineeMobileNumber: "",
//             nomineeAadhaarNumber: "",
//             nomineeVoterId: "",
//             nomineePanNumber: "",
//             nomineeAddress: "",
//         }
//     });

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//     const [expanded, setExpanded] = useState(isMobile ? false : "promoter");

//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "",
//     });
//     const handleCloseSnackbar = () =>
//         setSnackbar((prev) => ({ ...prev, open: false }));

//     useEffect(() => {
//         setExpanded(isMobile ? false : "promoter");
//     }, [isMobile]);



//     useEffect(() => {
//         if (isEdit && promoterData) {
//             const mappedData = {
//                 branchId: promoterData.branchId,
//                 enrollmentDate: promoterData.enrollmentDate?.split("T")[0], // ensure date works
//                 title: promoterData.title,
//                 firstName: promoterData.firstName,
//                 middleName: promoterData.middleName,
//                 lastName: promoterData.lastName,
//                 gender: promoterData.gender,
//                 email: promoterData.email,
//                 dateOfBirth: promoterData.dateOfBirth?.split("T")[0],
//                 occupation: promoterData.occupation,
//                 fatherName: promoterData.fatherName,
//                 spouseName: promoterData.spouseName,
//                 mobileNumber: promoterData.mobileNumber,
//                 maritalStatus: promoterData.maritalStatus,
//                 // kyc
//                 aadhaarNumber: promoterData.aadhaarNumber,
//                 panNumber: promoterData.panNumber,
//                 meterNumber: promoterData.meterNumber,
//                 ciRelation: promoterData.ciRelation,
//                 ciNumber: promoterData.ciNumber,
//                 voterId: promoterData.voterId,
//                 rationCardNumber: promoterData.rationCardNumber,
//                 dlNumber: promoterData.dlNumber,
//                 // nominee
//                 nomineeName: promoterData.nomineeName,
//                 nomineeRelation: promoterData.nomineeRelation,
//                 nomineeMobileNumber: promoterData.nomineeMobileNumber,
//                 nomineeAadhaarNumber: promoterData.nomineeAadhaarNumber,
//                 nomineeVoterId: promoterData.nomineeVoterId,
//                 nomineePanNumber: promoterData.nomineePanNumber,
//                 nomineeAddress: promoterData.nomineeAddress,
//             };
//             reset(mappedData);
//         }
//     }, [isEdit, promoterData, reset]);


//     const handleAccordion = (panel) => (evt, next) => {
//         setExpanded(next ? panel : false);
//     };

//     const onSubmit = async (data) => {
//         try {
//             if (isEdit) {
//                 response = await updatePromoter({ id, body: data }).unwrap();
//             } else {
//                 response = await addPromoter(data).unwrap();
//             }

//             if (response?.success === true) {
//                 setSnackbar({
//                     open: true,
//                     message: response.message || (isEdit ? "Promoter updated!" : "Promoter added!"),
//                     severity: "success",
//                 });
//                 setTimeout(() => navigate("/promoters"), 500);
//             }
//             else {
//                 setSnackbar({ open: true, message: response?.message || 'Error occurred', severity: 'error' });
//             }
//         } catch (err) {
//             setSnackbar({
//                 open: true,
//                 message: err?.message || "Error occurred",
//                 severity: "error",
//             });
//         }
//     };

//     const headerStyle = (panel) => ({
//         backgroundColor: expanded === panel ? "#6f42c1" : "#f6eefb",
//         color: expanded === panel ? "#fff" : "text.primary",
//         "& .MuiAccordionSummary-content": { alignItems: "center" },
//         px: 2,
//     });

//     return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     mb: 3,
//                 }}
//             >
//                 <Typography variant="h5" fontWeight={600}>
//                     {isEdit ? "Edit Promoter" : "Add Promoter"}
//                 </Typography>
//                 <IconButton aria-label="back" onClick={() => navigate(-1)}>
//                     <ArrowBackIosNewIcon />
//                     <Typography variant="button" sx={{ ml: 0.5 }}>
//                         Back
//                     </Typography>
//                 </IconButton>
//             </Box>

//             <form onSubmit={handleSubmit(onSubmit)} noValidate>
//                 {/* Top inputs: Branch & Enrollment Date */}
//                 <Grid container spacing={2} sx={{ mb: 2 }}>
//                     <Grid size={{ xs: 12, md: 6 }}>

//                         <FormControl fullWidth error={!!errors.branch}>
//                             <InputLabel id="branch-label">Branch</InputLabel>
//                             <Controller
//                                 name="branchId"
//                                 control={control}
//                                 defaultValue=""
//                                 rules={{ required: "Branch is required" }}
//                                 render={({ field }) => (
//                                     <Select
//                                         labelId="branch-label"
//                                         label="Branch"
//                                         {...field}
//                                         displayEmpty
//                                         disabled={isBranchesLoading}
//                                     >
//                                         <MenuItem value="">Select Branch</MenuItem>
//                                         {branches.map((branch) => (
//                                             <MenuItem key={branch.id} value={branch.id}>
//                                                 {branch.name} ({branch.location})
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 )}
//                             />
//                             {errors.branchId && (
//                                 <Typography color="error" variant="caption">
//                                     {errors.branchId.message}
//                                 </Typography>
//                             )}
//                         </FormControl>
//                     </Grid>

//                     <Grid size={{ xs: 12, md: 6 }}>
//                         <FormControl fullWidth error={!!errors.enrollmentDate}>
//                             <InputLabel htmlFor="enrollmentDate">Enrollment Date</InputLabel>
//                             <OutlinedInput
//                                 id="enrollmentDate"
//                                 type="date"
//                                 label="Enrollment Date"
//                                 {...register("enrollmentDate", {
//                                     required: "Enrollment Date is required",
//                                 })}
//                                 labelWidth={110}
//                             />
//                             {errors.enrollmentDate && (
//                                 <Typography color="error" variant="caption">
//                                     {errors.enrollmentDate.message}
//                                 </Typography>
//                             )}
//                         </FormControl>
//                     </Grid>
//                 </Grid>

//                 {/* Promoter Information */}
//                 <Accordion
//                     expanded={expanded === "promoter"}
//                     onChange={handleAccordion("promoter")}
//                 >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("promoter")}>
//                         <Typography fontWeight={600}>Promoter Information</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box sx={{ p: 1 }}>
//                             <Grid container spacing={2}>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.title}>
//                                         <InputLabel id="title-label">Title</InputLabel>
//                                         <Controller
//                                             name="title"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: "Title is required" }}
//                                             render={({ field }) => (
//                                                 <Select labelId="title-label" label="Title" {...field}>
//                                                     <MenuItem value="">Select Title</MenuItem>
//                                                     {titles.map((t) => (
//                                                         <MenuItem key={t} value={t}>
//                                                             {t}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             )}
//                                         />
//                                         {errors.title && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.title.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.firstName}>
//                                         <InputLabel htmlFor="firstName">First Name</InputLabel>
//                                         <OutlinedInput
//                                             id="firstName"
//                                             placeholder="Enter First Name"
//                                             {...register("firstName", {
//                                                 required: "First Name is required",
//                                             })}
//                                             defaultValue=""
//                                         />
//                                         {errors.firstName && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.firstName.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="middleName">Middle Name</InputLabel>
//                                         <OutlinedInput
//                                             id="middleName"
//                                             placeholder="Enter Middle Name"
//                                             {...register("middleName")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="lastName">Last Name</InputLabel>
//                                         <OutlinedInput
//                                             id="lastName"
//                                             placeholder="Enter Last Name"
//                                             {...register("lastName")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.gender}>
//                                         <InputLabel id="gender-label">Gender</InputLabel>
//                                         <Controller
//                                             name="gender"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: "Gender is required" }}
//                                             render={({ field }) => (
//                                                 <Select labelId="gender-label" label="Gender" {...field}>
//                                                     <MenuItem value="">Select Gender</MenuItem>
//                                                     {genders.map((g) => (
//                                                         <MenuItem key={g} value={g}>
//                                                             {g}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             )}
//                                         />
//                                         {errors.gender && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.gender.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.email}>
//                                         <InputLabel htmlFor="email">Email</InputLabel>
//                                         <OutlinedInput
//                                             id="email"
//                                             placeholder="Enter Email Address"
//                                             {...register("email", {
//                                                 pattern: {
//                                                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                                     message: "Enter a valid email address",
//                                                 },
//                                             })}
//                                         />
//                                         {errors.email && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.email.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.dob}>
//                                         <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel>
//                                         <OutlinedInput
//                                             id="dateOfBirth"
//                                             type="date"
//                                             label="Date of Birth"
//                                             {...register("dateOfBirth", { required: "Date of Birth is required" })}
//                                             labelWidth={95}
//                                         />
//                                         {errors.dateOfBirth && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.dateOfBirth.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="occupation">Occupation</InputLabel>
//                                         <OutlinedInput
//                                             id="occupation"
//                                             placeholder="Enter Occupation"
//                                             {...register("occupation")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="fatherName">Father Name</InputLabel>
//                                         <OutlinedInput
//                                             id="fatherName"
//                                             placeholder="Enter Father Name"
//                                             {...register("fatherName")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="spouseName">Husband / Spouse Name</InputLabel>
//                                         <OutlinedInput
//                                             id="spouseName"
//                                             placeholder="Enter Husband/Spouse Name"
//                                             {...register("spouseName")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.mobile}>
//                                         <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
//                                         <OutlinedInput
//                                             id="mobileNumber"
//                                             placeholder="Enter Mobile Number"
//                                             startAdornment={
//                                                 <InputAdornment position="start">📞</InputAdornment>
//                                             }
//                                             {...register("mobileNumber", {
//                                                 required: "Mobile number is required",
//                                                 pattern: {
//                                                     value: /^[0-9]{10}$/,
//                                                     message: "Enter a valid 10-digit mobile number",
//                                                 },
//                                             })}
//                                         />
//                                         {errors.mobileNumber && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.mobileNumber.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth error={!!errors.maritalStatus}>
//                                         <InputLabel id="marital-label">Marital Status</InputLabel>
//                                         <Controller
//                                             name="maritalStatus"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: "Marital Status is required" }}
//                                             render={({ field }) => (
//                                                 <Select
//                                                     labelId="marital-label"
//                                                     label="Marital Status"
//                                                     {...field}
//                                                 >
//                                                     <MenuItem value="">Select Marital Status</MenuItem>
//                                                     {maritalStatuses.map((m) => (
//                                                         <MenuItem key={m} value={m}>
//                                                             {m}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             )}
//                                         />
//                                         {errors.maritalStatus && (
//                                             <Typography color="error" variant="caption">
//                                                 {errors.maritalStatus.message}
//                                             </Typography>
//                                         )}
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>

//                 {/* Promoter's KYC */}
//                 <Accordion
//                     expanded={expanded === "kyc"}
//                     onChange={handleAccordion("kyc")}
//                 >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("kyc")}>
//                         <Typography fontWeight={600}>Promoter's KYC</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box sx={{ p: 1 }}>
//                             <Grid container spacing={2}>
//                                 {[
//                                     { name: "aadhaarNumber", label: "Aadhar Number" },
//                                     { name: "panNumber", label: "PAN Number" },
//                                     { name: "meterNumber", label: "Meter Number" },
//                                     { name: "ciRelation", label: "CI Relation" },
//                                     { name: "ciNumber", label: "CI Number" },
//                                     { name: "voterId", label: "Voter ID" },
//                                     { name: "rationCardNumber", label: "Ration Card Number" },
//                                     { name: "dlNumber", label: "DL Number" },
//                                 ].map(({ name, label }) => (
//                                     <Grid size={{ xs: 12, sm: 6, md: 3 }} key={name}>
//                                         <FormControl fullWidth>
//                                             <InputLabel htmlFor={name}>{label}</InputLabel>
//                                             <OutlinedInput
//                                                 id={name}
//                                                 placeholder={`Enter ${label}`}
//                                                 {...register(name)}
//                                             />
//                                         </FormControl>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>

//                 {/* Nominee Information */}
//                 <Accordion
//                     expanded={expanded === "nominee"}
//                     onChange={handleAccordion("nominee")}
//                 >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={headerStyle("nominee")}>
//                         <Typography fontWeight={600}>Nominee Information</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box sx={{ p: 1 }}>
//                             <Grid container spacing={2}>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeName">Nominee Name</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeName"
//                                             placeholder="Enter Nominee Name"
//                                             {...register("nomineeName")}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeRelation">Nominee Relation</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeRelation"
//                                             placeholder="Enter Nominee Relation"
//                                             {...register("nomineeRelation")}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeMobileNumber">Mobile Number</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeMobileNumber"
//                                             placeholder="Enter Mobile Number"
//                                             {...register("nomineeMobileNumber")}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeAadhaarNumber">Nominee Aadhar Number</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeAadhaarNumber"
//                                             placeholder="Enter Nominee Aadhar Number"
//                                             {...register("nomineeAadhaarNumber")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeVoterId">Nominee Voter ID Number</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeVoterId"
//                                             placeholder="Enter Nominee Voter ID Number"
//                                             {...register("nomineeVoterId")}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineePanNumber">Nominee Pan Number</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineePanNumber"
//                                             placeholder="Enter Nominee Pan Number"
//                                             {...register("nomineePanNumber")}
//                                         />
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                     <FormControl fullWidth>
//                                         <InputLabel htmlFor="nomineeAddress">Nominee Address</InputLabel>
//                                         <OutlinedInput
//                                             id="nomineeAddress"
//                                             placeholder="Enter Nominee Address"
//                                             multiline
//                                             rows={2}
//                                             {...register("nomineeAddress")}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>

//                 {/* Action Buttons */}
//                 <Box
//                     sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
//                 >
//                     <Button variant="contained" color="primary" type="submit" sx={{ px: 4 }}>
//                         {isEdit ? "Update Promoter" : "Add Promoter"}
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         onClick={() => navigate("/promoters")}
//                         sx={{ px: 3 }}
//                     >
//                         Cancel
//                     </Button>
//                 </Box>
//             </form>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// }

import React, { useMemo, useState } from "react";
import {
    Box,
    Container,
    IconButton,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import {
    useAddPromoterMutation,
    useGetPromoterByIdQuery,
    useUpdatePromoterMutation,
} from "../../features/api/promotersApi";
import { useGetAllBranchesQuery } from "../../features/api/branchesApi";
import * as Yup from "yup";
import DynamicForm from "../../components/DynamicForm";

const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];

export default function AddPromoter() {
    const { id } = useParams();
    const isEdit = id && id !== "add";
    const navigate = useNavigate();

    const [addPromoter, { isLoading: isAdding }] = useAddPromoterMutation();
    const [updatePromoter, { isLoading: isUpdating }] = useUpdatePromoterMutation();

    const { data: promoterData } = useGetPromoterByIdQuery(id, {
        skip: !isEdit,
    });
    const {
        data: branchResponse,
        isLoading: isBranchesLoading,
    } = useGetAllBranchesQuery();

    const branches = branchResponse?.data || [];

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () =>
        setSnackbar((prev) => ({ ...prev, open: false }));

    // ---------- INITIAL VALUES ----------

    const defaultValues = {
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
    };

    const initialValues = useMemo(() => {
        if (isEdit && promoterData) {
            return {
                branchId: promoterData.branchId || "",
                enrollmentDate: promoterData.enrollmentDate
                    ? promoterData.enrollmentDate.split("T")[0]
                    : "",
                title: promoterData.title || "",
                firstName: promoterData.firstName || "",
                middleName: promoterData.middleName || "",
                lastName: promoterData.lastName || "",
                gender: promoterData.gender || "",
                email: promoterData.email || "",
                dateOfBirth: promoterData.dateOfBirth
                    ? promoterData.dateOfBirth.split("T")[0]
                    : "",
                occupation: promoterData.occupation || "",
                fatherName: promoterData.fatherName || "",
                spouseName: promoterData.spouseName || "",
                mobileNumber: promoterData.mobileNumber || "",
                maritalStatus: promoterData.maritalStatus || "",
                aadhaarNumber: promoterData.aadhaarNumber || "",
                panNumber: promoterData.panNumber || "",
                meterNumber: promoterData.meterNumber || "",
                ciRelation: promoterData.ciRelation || "",
                ciNumber: promoterData.ciNumber || "",
                voterId: promoterData.voterId || "",
                rationCardNumber: promoterData.rationCardNumber || "",
                dlNumber: promoterData.dlNumber || "",
                nomineeName: promoterData.nomineeName || "",
                nomineeRelation: promoterData.nomineeRelation || "",
                nomineeMobileNumber: promoterData.nomineeMobileNumber || "",
                nomineeAadhaarNumber: promoterData.nomineeAadhaarNumber || "",
                nomineeVoterId: promoterData.nomineeVoterId || "",
                nomineePanNumber: promoterData.nomineePanNumber || "",
                nomineeAddress: promoterData.nomineeAddress || "",
            };
        }
        return defaultValues;
    }, [isEdit, promoterData]);

    // ---------- VALIDATION SCHEMA ----------

    const validationSchema = Yup.object({
        branchId: Yup.string().required("Branch is required"),
        enrollmentDate: Yup.string().required("Enrollment Date is required"),
        title: Yup.string().required("Title is required"),
        firstName: Yup.string().required("First Name is required"),
        gender: Yup.string().required("Gender is required"),
        dateOfBirth: Yup.string().required("Date of Birth is required"),
        maritalStatus: Yup.string().required("Marital Status is required"),
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile number is required"),
        email: Yup.string()
            .email("Enter a valid email address")
            .nullable()
            .notRequired(),
        // other fields optional
    });

    // ---------- FORM LIST (for DynamicForm) ----------

    const formList = [
        // Top: branch + enrollment date
        {
            label: "Branch",
            name: "branchId",
            id: "branchId",
            type: "select",
            grid: { xs: 12, sm: 6, md: 3 },
            disabled: isBranchesLoading,
            options: [
                { label: "Select Branch", value: "" },
                ...branches.map((b) => ({
                    label: `${b.name} (${b.location})`,
                    value: b.id,
                })),
            ],
        },
        {
            label: "Enrollment Date",
            name: "enrollmentDate",
            id: "enrollmentDate",
            type: "date",
            grid: { xs: 12, sm: 6, md: 3 },
        },

        // Promoter Information
        {
            label: "Title",
            name: "title",
            id: "title",
            type: "select",
            grid: { xs: 12, sm: 6, md: 3 },
            options: [
                { label: "Select Title", value: "" },
                ...titles.map((t) => ({ label: t, value: t })),
            ],
        },
        {
            label: "First Name",
            name: "firstName",
            id: "firstName",
            placeholder: "Enter First Name",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Middle Name",
            name: "middleName",
            id: "middleName",
            placeholder: "Enter Middle Name",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Last Name",
            name: "lastName",
            id: "lastName",
            placeholder: "Enter Last Name",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Gender",
            name: "gender",
            id: "gender",
            type: "select",
            grid: { xs: 12, sm: 6, md: 3 },
            options: [
                { label: "Select Gender", value: "" },
                ...genders.map((g) => ({ label: g, value: g })),
            ],
        },
        {
            label: "Email",
            name: "email",
            id: "email",
            placeholder: "Enter Email Address",
            type: "email",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Date of Birth",
            name: "dateOfBirth",
            id: "dateOfBirth",
            type: "date",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Occupation",
            name: "occupation",
            id: "occupation",
            placeholder: "Enter Occupation",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Father Name",
            name: "fatherName",
            id: "fatherName",
            placeholder: "Enter Father Name",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Husband / Spouse Name",
            name: "spouseName",
            id: "spouseName",
            placeholder: "Enter Husband/Spouse Name",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Mobile Number",
            name: "mobileNumber",
            id: "mobileNumber",
            placeholder: "Enter Mobile Number",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Marital Status",
            name: "maritalStatus",
            id: "maritalStatus",
            type: "select",
            grid: { xs: 12, sm: 6, md: 3 },
            options: [
                { label: "Select Marital Status", value: "" },
                ...maritalStatuses.map((m) => ({ label: m, value: m })),
            ],
        },

        // Promoter's KYC
        { label: "Aadhar Number", name: "aadhaarNumber", id: "aadhaarNumber", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        { label: "PAN Number", name: "panNumber", id: "panNumber", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        { label: "Meter Number", name: "meterNumber", id: "meterNumber", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        { label: "CI Relation", name: "ciRelation", id: "ciRelation", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        { label: "CI Number", name: "ciNumber", id: "ciNumber", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        { label: "Voter ID", name: "voterId", id: "voterId", type: "text", grid: { xs: 12, sm: 6, md: 3 } },
        {
            label: "Ration Card Number",
            name: "rationCardNumber",
            id: "rationCardNumber",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        { label: "DL Number", name: "dlNumber", id: "dlNumber", type: "text", grid: { xs: 12, sm: 6, md: 3 } },

        // Nominee Info
        {
            label: "Nominee Name",
            name: "nomineeName",
            id: "nomineeName",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee Relation",
            name: "nomineeRelation",
            id: "nomineeRelation",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee Mobile Number",
            name: "nomineeMobileNumber",
            id: "nomineeMobileNumber",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee Aadhar Number",
            name: "nomineeAadhaarNumber",
            id: "nomineeAadhaarNumber",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee Voter ID Number",
            name: "nomineeVoterId",
            id: "nomineeVoterId",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee PAN Number",
            name: "nomineePanNumber",
            id: "nomineePanNumber",
            type: "text",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Nominee Address",
            name: "nomineeAddress",
            id: "nomineeAddress",
            type: "textarea",
            placeholder: "Enter Nominee Address",
            grid: { xs: 12, sm: 12, md: 12 },
        },
    ];

    // ---------- HANDLE SUBMIT (for DynamicForm) ----------

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            let response;
            if (isEdit) {
                response = await updatePromoter({ id, body: values }).unwrap();
            } else {
                response = await addPromoter(values).unwrap();
            }

            if (response?.success === true) {
                setSnackbar({
                    open: true,
                    message:
                        response.message ||
                        (isEdit ? "Promoter updated!" : "Promoter added!"),
                    severity: "success",
                });
                if (!isEdit) {
                    resetForm();
                }
                setTimeout(() => navigate("/promoters"), 500);
            } else {
                setSnackbar({
                    open: true,
                    message: response?.message || "Error occurred",
                    severity: "error",
                });
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: err?.message || "Error occurred",
                severity: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const isLoading = isAdding || isUpdating;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Top header with back button */}
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

            {/* Dynamic Form */}
            <DynamicForm
                headerTitle={isEdit ? "Edit Promoter" : "Add Promoter"}
                formList={formList}
                actionButtonText={isEdit ? "Update Promoter" : "Add Promoter"}
                isLoading={isLoading}
                texting={isEdit ? "Updating..." : "Saving..."}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleFormSubmit}
                md={3}
            />

            {/* Snackbar */}
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
