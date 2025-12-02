

// // src/Pages/ddAccount/enquiry/EnquiryDetailsPage.jsx
// import React, { useState, useMemo } from "react";
// import {
//     Box,
//     Grid,
//     Typography,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import DynamicDataTable from "../../../components/DynamicTable";
// import InformationPage from "../../../components/InformationPage";
// import DynamicForm from "../../../components/DynamicForm";

// /**
//  * EnquiryDetailsPage
//  * - shows enquiry table (dynamic table)
//  * - "View" opens a modal that shows enquiry details using InformationPage
//  * - "Assign" opens a dialog with DynamicForm to assign the enquiry
//  *
//  * This is a self-contained example using static sample data.
//  * Replace sample data and callbacks with real API hooks where needed.
//  */

// const sampleEnquiries = [
//     {
//         id: "ENQ00123",
//         customerName: "Rahul Sharma",
//         ddAccountNo: "1234567890",
//         enquiryType: "Update KYC",
//         priority: "High",
//         dateCreated: "05-Feb-2025",
//         assignedTo: "",
//         status: "Open",
//     },
//     {
//         id: "ENQ00124",
//         customerName: "Aman Singh",
//         ddAccountNo: "1234567891",
//         enquiryType: "Change Address",
//         priority: "Medium",
//         dateCreated: "03-Feb-2025",
//         assignedTo: "Officer A",
//         status: "In Progress",
//     },
//     // add more rows as needed
// ];

// const EnquiryDetailsPage = () => {
//     const [rows, setRows] = useState(sampleEnquiries);

//     // modal state
//     const [viewOpen, setViewOpen] = useState(false);
//     const [assignOpen, setAssignOpen] = useState(false);
//     const [activeRow, setActiveRow] = useState(null);

//     // table columns
//     const columns = useMemo(
//         () => [
//             { id: "id", label: "Enquiry ID", minWidth: 120 },
//             { id: "customerName", label: "Customer Name", minWidth: 160 },
//             { id: "ddAccountNo", label: "DD Account No.", minWidth: 140 },
//             { id: "enquiryType", label: "Enquiry Type", minWidth: 140 },
//             { id: "priority", label: "Priority", minWidth: 100 },
//             { id: "dateCreated", label: "Date Created", minWidth: 120 },
//             { id: "assignedTo", label: "Assign", minWidth: 120 },
//             { id: "status", label: "Status", minWidth: 100 },
//         ],
//         []
//     );

//     // map rows for table component (include actions rendered via DynamicDataTable actions prop)
//     const tableRows = rows.map((r) => ({
//         ...r,
//         // keep plain strings — table will render them
//     }));

//     const handleView = (row) => {
//         setActiveRow(row);
//         setViewOpen(true);
//     };

//     const handleAssign = (row) => {
//         setActiveRow(row);
//         setAssignOpen(true);
//     };

//     const closeView = () => {
//         setViewOpen(false);
//         setActiveRow(null);
//     };

//     const closeAssign = () => {
//         setAssignOpen(false);
//         setActiveRow(null);
//     };

//     const onAssignSubmit = async (values, { resetForm }) => {
//         // minimal: update local rows to reflect assignment
//         // values will contain assignedOfficer, priorityLevel, status, dueDate
//         const updated = rows.map((r) =>
//             r.id === activeRow.id
//                 ? {
//                     ...r,
//                     assignedTo: values.assignedOfficer || r.assignedTo,
//                     priority: values.priorityLevel || r.priority,
//                     status: values.status || r.status,
//                     // you may want to store dueDate if needed
//                 }
//                 : r
//         );
//         setRows(updated);
//         resetForm();
//         closeAssign();
//         // in real app, call API then refetch / optimistic update
//     };

//     // DynamicForm config for assign dialog
//     const assignFormList = [
//         {
//             label: "Assigned Officer",
//             name: "assignedOfficer",
//             type: "select",
//             options: [
//                 { label: "Select Officer", value: "" },
//                 { label: "Officer A", value: "Officer A" },
//                 { label: "Officer B", value: "Officer B" },
//             ],
//         },
//         {
//             label: "Priority Level",
//             name: "priorityLevel",
//             type: "select",
//             options: [
//                 { label: "Select Priority", value: "" },
//                 { label: "High", value: "High" },
//                 { label: "Medium", value: "Medium" },
//                 { label: "Low", value: "Low" },
//             ],
//         },
//         {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//                 { label: "Select Status", value: "" },
//                 { label: "Open", value: "Open" },
//                 { label: "In Progress", value: "In Progress" },
//                 { label: "Pending", value: "Pending" },
//                 { label: "Close", value: "Close" },
//             ],
//         },
//         {
//             label: "Assigned Date",
//             name: "assignedDate",
//             type: "date",
//         },
//         {
//             label: "Due Date",
//             name: "dueDate",
//             type: "date",
//         },
//     ];

//     const assignInitialValues = {
//         assignedOfficer: activeRow?.assignedTo || "",
//         priorityLevel: activeRow?.priority || "",
//         status: activeRow?.status || "",
//         assignedDate: "",
//         dueDate: "",
//     };

//     return (
//         <Box sx={{ width: "100%", p: 2 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//                 Enquiry Details
//             </Typography>

//             <DynamicDataTable
//                 columns={columns}
//                 rows={tableRows}
//                 actions={{
//                     view: (row) => handleView(row),
//                     edit: null,
//                     delete: null,
//                     // We'll render assign as a custom action by mapping rows and passing a fake action below
//                 }}
//             // The DynamicDataTable component in your project shows actions via the `actions` prop.
//             // To render the assign button we can also pass a custom actions object with a handler - but
//             // if DynamicDataTable only supports view/edit/delete icons, we'll create a wrapper:
//             />

//             {/* If your DynamicDataTable doesn't show the extra "Assign" icon, render a lightweight list
//           of action buttons below the table rows using the same rows data. For completeness we add
//           an alternate actions bar (small, not intrusive). */}

//             <Box sx={{ mt: 2 }}>
//                 {tableRows.map((r, idx) => (
//                     <Box
//                         key={r.id}
//                         sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             p: 1,
//                             bgcolor: idx % 2 === 0 ? "transparent" : "#FAFAFB",
//                             borderRadius: 1,
//                             mb: 0.5,
//                         }}
//                     >
//                         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//                             <Typography sx={{ color: "#8F8F8F" }}>{r.id}</Typography>
//                             <Typography sx={{ fontWeight: 600 }}>{r.customerName}</Typography>
//                             <Typography sx={{ color: "#8F8F8F" }}>{r.enquiryType}</Typography>
//                             <Typography sx={{ color: "#8F8F8F" }}>{r.status}</Typography>
//                         </Box>

//                         <Box>
//                             <IconButton size="small" onClick={() => handleView(r)} title="View">
//                                 <VisibilityIcon />
//                             </IconButton>
//                             <IconButton size="small" onClick={() => handleAssign(r)} title="Assign">
//                                 <AssignmentTurnedInIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>
//                 ))}
//             </Box>

//             {/* View Modal */}
//             <Dialog open={viewOpen} onClose={closeView} maxWidth="md" fullWidth>
//                 <DialogTitle>Enquiry View Details</DialogTitle>
//                 <DialogContent dividers>
//                     {activeRow ? (
//                         <Box sx={{ mt: 1 }}>
//                             <InformationPage
//                                 key1={["Enquiry ID", "Account No.", "Priority", "Status", "Date Created"]}
//                                 pair1={[activeRow.id, activeRow.ddAccountNo, activeRow.priority, activeRow.status, activeRow.dateCreated]}
//                                 key2={["Customer Name", "Enquiry Type", "Assigned To", "Actions"]}
//                                 pair2={[activeRow.customerName, activeRow.enquiryType, activeRow.assignedTo || "-", ""]}
//                             />
//                         </Box>
//                     ) : (
//                         <Typography>Loading...</Typography>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeView}>Close</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Assign Dialog */}
//             <Dialog open={assignOpen} onClose={closeAssign} maxWidth="sm" fullWidth>
//                 <DialogTitle>Assign Enquiry</DialogTitle>
//                 <DialogContent dividers>
//                     <Typography sx={{ mb: 2 }}>
//                         Enquiry: {activeRow?.id} — {activeRow?.customerName}
//                     </Typography>

//                     <DynamicForm
//                         headerTitle={null}
//                         formList={assignFormList}
//                         initialValues={assignInitialValues}
//                         validationSchema={undefined}
//                         handleSubmit={onAssignSubmit}
//                         actionButtonText="Assign Enquiry"
//                         isLoading={false}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeAssign}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default EnquiryDetailsPage;
// src/Pages/ddAccount/enquiry/EnquiryDetailsPage.jsx
import React, { useMemo, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import DynamicDataTable from "../../../components/DynamicTable";
import DynamicForm from "../../../components/DynamicForm";
import InformationPage from "../../../components/InformationPage";

/**
 * EnquiryDetailsPage
 * - search form (DynamicForm). on submit filters table rows.
 * - Dynamic table shows filtered enquiries.
 * - "View" opens modal showing enquiry details via InformationPage.
 * - "Assign" opens modal with DynamicForm to assign enquiry.
 *
 * This uses local static sample data. Replace sample data / update handlers with real API calls.
 */

const sampleEnquiries = [
    {
        id: "ENQ00123",
        customerName: "Rahul Sharma",
        ddAccountNo: "1234567890",
        enquiryType: "Update KYC",
        priority: "High",
        dateCreated: "05-Feb-2025",
        assignedTo: "",
        status: "Open",
    },
    {
        id: "ENQ00124",
        customerName: "Aman Khan",
        ddAccountNo: "1234567891",
        enquiryType: "Change Address",
        priority: "Medium",
        dateCreated: "03-Feb-2025",
        assignedTo: "Officer A",
        status: "In Progress",
    },
    {
        id: "ENQ00125",
        customerName: "Rakesh Sharma",
        ddAccountNo: "1234567892",
        enquiryType: "Update KYC",
        priority: "Low",
        dateCreated: "01-Feb-2025",
        assignedTo: "",
        status: "Pending",
    },
    // add more if needed
];

const EnquiryDetails = () => {
    const [allRows] = useState(sampleEnquiries);
    const [rows, setRows] = useState(sampleEnquiries);

    // selected row for modals
    const [activeRow, setActiveRow] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);

    const columns = useMemo(
        () => [
            { id: "id", label: "Enquiry ID", minWidth: 110 },
            { id: "customerName", label: "Customer Name", minWidth: 160 },
            { id: "ddAccountNo", label: "DD Account No.", minWidth: 140 },
            { id: "enquiryType", label: "Enquiry Type", minWidth: 140 },
            { id: "priority", label: "Priority", minWidth: 100 },
            { id: "dateCreated", label: "Date Created", minWidth: 120 },
            { id: "assignedTo", label: "Assign", minWidth: 110 },
            { id: "status", label: "Status", minWidth: 100 },
            { id: "actions", label: "Actions", minWidth: 120, align: "right" },
        ],
        []
    );

    // build table rows (inject actions JSX into row.actions)
    const buildTableRows = (sourceRows) =>
        sourceRows.map((r) => ({
            ...r,
            actions: (
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <IconButton size="small" title="Assign" onClick={() => handleAssignClick(r)}>
                        <AssignmentTurnedInIcon />
                    </IconButton>
                    <IconButton size="small" title="View" onClick={() => handleViewClick(r)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" title="Update" onClick={() => handleUpdateClick(r)}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton size="small" color="error" title="Close" onClick={() => handleCloseClick(r)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            ),
        }));

    const tableRows = buildTableRows(rows);

    // DynamicForm (search) config
    const searchFormList = [
        { label: "Enquiry ID", name: "enquiryId", type: "text", grid: { xs: 12, sm: 4 } },
        { label: "Member Name", name: "memberName", type: "text", grid: { xs: 12, sm: 4 } },
        { label: "DD Account Number", name: "ddAccountNo", type: "text", grid: { xs: 12, sm: 4 } },
    ];

    const searchInitialValues = { enquiryId: "", memberName: "", ddAccountNo: "" };

    const handleSearchSubmit = (values) => {
        const qId = (values.enquiryId || "").trim().toLowerCase();
        const qName = (values.memberName || "").trim().toLowerCase();
        const qAcc = (values.ddAccountNo || "").trim().toLowerCase();

        const filtered = allRows.filter((r) => {
            const matchId = qId ? String(r.id).toLowerCase().includes(qId) : true;
            const matchName = qName ? String(r.customerName).toLowerCase().includes(qName) : true;
            const matchAcc = qAcc ? String(r.ddAccountNo).toLowerCase().includes(qAcc) : true;
            return matchId && matchName && matchAcc;
        });

        setRows(filtered);
    };

    const handleViewClick = (row) => {
        setActiveRow(row);
        setViewOpen(true);
    };

    const handleAssignClick = (row) => {
        setActiveRow(row);
        setAssignOpen(true);
    };

    const handleUpdateClick = (row) => {
        // minimal placeholder: toggle status to "In Progress"
        setRows((prev) => prev.map((p) => (p.id === row.id ? { ...p, status: "In Progress" } : p)));
    };

    const handleCloseClick = (row) => {
        setRows((prev) => prev.map((p) => (p.id === row.id ? { ...p, status: "Close" } : p)));
    };

    const closeView = () => {
        setViewOpen(false);
        setActiveRow(null);
    };

    const closeAssign = () => {
        setAssignOpen(false);
        setActiveRow(null);
    };

    // assign form (DynamicForm) config
    const assignFormList = [
        {
            label: "Assigned Officer",
            name: "assignedOfficer",
            type: "select",
            options: [
                { label: "Select Officer", value: "" },
                { label: "Officer A", value: "Officer A" },
                { label: "Officer B", value: "Officer B" },
            ],
        },
        {
            label: "Priority Level",
            name: "priorityLevel",
            type: "select",
            options: [
                { label: "Select Priority", value: "" },
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
            ],
        },
        {
            label: "Status",
            name: "status",
            type: "select",
            options: [
                { label: "Select Status", value: "" },
                { label: "Open", value: "Open" },
                { label: "In Progress", value: "In Progress" },
                { label: "Pending", value: "Pending" },
                { label: "Close", value: "Close" },
            ],
        },
        { label: "Assigned Date", name: "assignedDate", type: "date" },
        { label: "Due Date", name: "dueDate", type: "date" },
    ];

    const assignInitialValues = {
        assignedOfficer: activeRow?.assignedTo || "",
        priorityLevel: activeRow?.priority || "",
        status: activeRow?.status || "",
        assignedDate: "",
        dueDate: "",
    };

    const handleAssignSubmit = (values, { resetForm }) => {
        // update local rows to reflect assignment
        setRows((prev) =>
            prev.map((r) =>
                r.id === activeRow.id
                    ? {
                        ...r,
                        assignedTo: values.assignedOfficer || r.assignedTo,
                        priority: values.priorityLevel || r.priority,
                        status: values.status || r.status,
                    }
                    : r
            )
        );
        resetForm();
        closeAssign();
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Enquiry Details
            </Typography>

            <DynamicForm
                headerTitle={null}
                formList={searchFormList}
                initialValues={searchInitialValues}
                validationSchema={undefined}
                handleSubmit={(values) => handleSearchSubmit(values)}
                actionButtonText="Show Details"
                isLoading={false}
            />

            <Box sx={{ mt: 3 }}>
                <DynamicDataTable columns={columns} rows={tableRows} isLoading={false} />
            </Box>

            {/* View modal */}
            <Dialog open={viewOpen} onClose={closeView} maxWidth="md" fullWidth>
                <DialogTitle>Enquiry View Details</DialogTitle>
                <DialogContent dividers>
                    {activeRow ? (
                        <InformationPage
                            key1={["Enquiry ID", "Account No.", "Priority", "Status", "Date Created"]}
                            pair1={[activeRow.id, activeRow.ddAccountNo, activeRow.priority, activeRow.status, activeRow.dateCreated]}
                            key2={["Customer Name", "Enquiry Type", "Assigned To", ""]}
                            pair2={[activeRow.customerName, activeRow.enquiryType, activeRow.assignedTo || "-", ""]}
                        />
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeView}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Assign modal */}
            <Dialog open={assignOpen} onClose={closeAssign} maxWidth="sm" fullWidth>
                <DialogTitle>Assign Enquiry</DialogTitle>
                <DialogContent dividers>
                    <Typography sx={{ mb: 2 }}>
                        Enquiry: {activeRow?.id} — {activeRow?.customerName}
                    </Typography>

                    <DynamicForm
                        headerTitle={null}
                        formList={assignFormList}
                        initialValues={assignInitialValues}
                        validationSchema={undefined}
                        handleSubmit={handleAssignSubmit}
                        actionButtonText="Assign Enquiry"
                        isLoading={false}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAssign}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EnquiryDetails;
