// src/Pages/ddAccounts/updateAccountType/UpdateAccountType.jsx
import React, { useState } from "react";
import { Box, Grid, Typography, Divider, Switch, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PageTopContent from "../../../../components/PageTopContent";
import DynamicForm from "../../../../components/DynamicForm";
import DynamicButton from "../../../../components/DynamicButton";
import DynamicDataTable from "../../../../components/DynamicTable";


// page container
const Container = styled("div")({
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
});

// header info row
const AccountHeader = styled("div")({
    width: "100%",
    background: "#F6F7F8",
    padding: "12px 18px",
    borderRadius: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
});

// form block wrapper
const FormBlock = styled("div")({
    width: "100%",
    background: "#F2F3F6BF",
    padding: 20,
    borderRadius: 6,
});

const UpdateAccountType = () => {
    // sample static header details (replace with API data when available)
    const accountInfo = {
        accountNo: "23654896544",
        memberName: "Rahul Sharma",
        branchName: "Kalkaji Branch, New Delhi",
        availableBalance: 25350,
        currentType: "RD",
    };

    const [isJoint, setIsJoint] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // DynamicForm config (simple: only joint member select here)
    const formList = [
        {
            label: "Joint Member ID",
            name: "jointMemberId",
            type: "select",
            options: [
                { label: "Select Member ID", value: "" },
                { label: "Member 101 (Ajay)", value: 101 },
                { label: "Member 102 (Sunita)", value: 102 },
                { label: "Member 103 (Karan)", value: 103 },
            ],
            grid: { xs: 12, sm: 12, md: 12 },
        },
    ];

    const initialValues = { jointMemberId: "" };

    const handleSubmit = async (values, { resetForm }) => {
        setIsLoading(true);
        try {
            // call upgrade API here
            // await upgradeAccountMutation({ accountId, payload }).unwrap()
            await new Promise((r) => setTimeout(r, 700));
            // reset or show toast in your app
            resetForm();
        } catch (err) {
            // handle error if needed
        } finally {
            setIsLoading(false);
        }
    };

    const headerColumns = [
        { id: "accountNo", label: "RD Account No.", minWidth: 140 },
        { id: "memberName", label: "Member Name", minWidth: 200 },
        { id: "branchName", label: "Branch Name", minWidth: 220 },
        {
            id: "availableBalance", label: "Available Balance (₹)", minWidth: 160, align: "right",
            format: (val) => `₹ ${Number(val).toLocaleString()}`
        },
    ];

    const headerRows = [
        {
            id: accountInfo.accountNo || "row-1",
            accountNo: accountInfo.accountNo,
            memberName: accountInfo.memberName,
            branchName: accountInfo.branchName,
            availableBalance: accountInfo.availableBalance ?? 0,
        },
    ];

    return (
        <Container>
            <PageTopContent title="Update Account Type" />
            <Box sx={{ mb: 2 }}>
                <DynamicDataTable
                    columns={headerColumns}
                    rows={headerRows}
                    isLoading={false}
                // hide pagination for single-line header look by passing small rowsPerPage or let component handle it
                />
            </Box>


            <FormBlock>
                <Grid container spacing={2} alignItems="center">

                    <Grid size={{ xs: 12 }}>
                        <Typography sx={{ mb: 1 }}>Joint Account</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Switch checked={isJoint} onChange={() => setIsJoint((s) => !s)} />
                            <Typography>{isJoint ? "enabled" : "disabled"}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <DynamicForm
                            headerTitle={null}
                            formList={formList}
                            initialValues={initialValues}
                            validationSchema={undefined}
                            handleSubmit={handleSubmit}
                            actionButtonText="Upgrade"
                            isLoading={isLoading}
                        />
                    </Grid>

                </Grid>
            </FormBlock>
        </Container>
    );
};

export default UpdateAccountType;
