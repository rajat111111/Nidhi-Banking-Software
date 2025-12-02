// src/Pages/ddAccount/ddDocuments/Documents.jsx
import React, { useState, useMemo } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import PageTopContent from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import DynamicDataTable from "../../../../components/DynamicTable";
import * as Yup from "yup";

const Container = styled("div")({
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
});

const Section = styled(Paper)({
    padding: 16,
    marginTop: 12,
    background: "transparent",
    boxShadow: "none",
});

const Documents = () => {
    // existing documents (static/sample)
    const [documents, setDocuments] = useState([
        { id: 1, name: "Pan Card", fileName: "pan.pdf" },
    ]);

    // table columns for DynamicDataTable
    const columns = useMemo(
        () => [
            { id: "idx", label: "#", minWidth: 50 },
            { id: "name", label: "Document Name", minWidth: 200 },
            { id: "fileName", label: "File Name", minWidth: 200 },
            { id: "actions", label: "Action", minWidth: 160, align: "right" },
        ],
        []
    );

    // map docs to rows expected by DynamicDataTable
    const rows = documents.map((d, i) => ({
        id: d.id,
        idx: `${i + 1}.`,
        name: d.name,
        fileName: d.fileName,
        actions: "", // DynamicDataTable will show action buttons via actions prop
    }));

    // handlers used by table actions
    const handleDownload = (row) => {
        // placeholder: replace with real download logic
        alert(`download ${row.fileName}`);
    };

    const handleDelete = (row) => {
        setDocuments((prev) => prev.filter((d) => d.id !== row.id));
    };

    // DynamicForm: validation + initial values
    const validationSchema = Yup.object().shape({
        panCard: Yup.mixed().nullable(),
        aadharCard: Yup.mixed().nullable(),
        voterId: Yup.mixed().nullable(),
        bankStatement: Yup.mixed().nullable(),
        signature: Yup.mixed().nullable(),
        drivingLicense: Yup.mixed().nullable(),
        photo: Yup.mixed().nullable(),
        otherName: Yup.string().nullable(),
        otherFile: Yup.mixed().nullable(),
    });

    const initialValues = {
        panCard: "",
        aadharCard: "",
        voterId: "",
        bankStatement: "",
        signature: "",
        drivingLicense: "",
        photo: "",
        otherName: "",
        otherFile: "",
    };

    // formList: use onChange to set file into formik via setFieldValue
    const formList = [
        {
            label: "Pan Card",
            name: "panCard",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("panCard", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Aadhar Card",
            name: "aadharCard",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("aadharCard", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Voter ID",
            name: "voterId",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("voterId", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Bank Statement",
            name: "bankStatement",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("bankStatement", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },

        {
            label: "Signature",
            name: "signature",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("signature", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Driving License",
            name: "drivingLicense",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("drivingLicense", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Photo",
            name: "photo",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("photo", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },

        {
            label: "Other",
            name: "otherName",
            type: "text",
            placeholder: "Enter Other Document Name",
            grid: { xs: 12, sm: 6, md: 3 },
        },
        {
            label: "Other File",
            name: "otherFile",
            type: "file",
            onChange: (e, handleChange, values, setFieldValue) => {
                setFieldValue("otherFile", e.target.files?.[0] ?? "");
            },
            grid: { xs: 12, sm: 6, md: 3 },
        },
    ];

    // handle submit: add selected files to documents list (client-side)
    const handleSubmit = (values, { resetForm }) => {
        const mapping = {
            panCard: "Pan Card",
            aadharCard: "Aadhar Card",
            voterId: "Voter ID",
            bankStatement: "Bank Statement",
            signature: "Signature",
            drivingLicense: "Driving License",
            photo: "Photo",
            otherFile: values.otherName || "Other",
        };

        const newDocs = Object.keys(mapping).reduce((acc, key) => {
            const file = values[key];
            if (file) {
                acc.push({
                    id: Date.now() + Math.random(),
                    name: mapping[key],
                    fileName: file.name || String(file),
                });
            }
            return acc;
        }, []);

        if (newDocs.length) {
            setDocuments((p) => [...p, ...newDocs]);
        }

        // reset form
        resetForm();
    };

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            <Container>
                <PageTopContent title="DD Account Information" />

                <Section elevation={0}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Document Details
                    </Typography>

                    <DynamicDataTable
                        columns={columns}
                        rows={rows}
                        isLoading={false}
                        actions={{
                            view: handleDownload,
                            delete: handleDelete,
                        }}
                    />
                </Section>

                <Section elevation={0}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Upload Documents
                    </Typography>

                    <DynamicForm
                        headerTitle={null}
                        formList={formList}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        handleSubmit={handleSubmit}
                        actionButtonText="Save"
                        isLoading={false}
                    />
                </Section>

                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => setDocuments([])}>
                        Clear all (demo)
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Documents;
