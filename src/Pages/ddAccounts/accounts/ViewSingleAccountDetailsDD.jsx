import React, { useState } from "react";
import { Grid, styled, Box } from "@mui/material";
import PageTopContent from "../../../components/PageTopContent";
import DynamicButton from "../../../components/DynamicButton";
import GroupOfButton from "../../../components/GroupOfButton";


import ViewBasicDetails from "./basic/ViewBasicDetails";
import ViewTransactionDetails from "./transaction/ViewTransactionDetails";
import NomineeDetails from "./nominee/NomineeDetails";
import UpdateAccountType from "./updateAccountTYpe/UpdateAccountType";
import RemoveAccount from "./removeAccount/RemoveAccount";

import DDBonds from "./ddbonds/DdBonds";
import Documents from "./documents/Documents";


const ViewSingleAccountDetailsMainContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    paddingBottom: 40,
});

const SecondaryTabsWrapper = styled(Box)({
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 8,
});

const ViewSingleAccountDetailsDD = () => {

    const [activeTab, setActiveTab] = useState("basic");

    const topButtons = [
        { title: "Account Status", onClick: () => setActiveTab("accountStatus") },
        { title: "Application Form", onClick: () => setActiveTab("applicationForm") },
        { title: "Foreclosure Request Letter", onClick: () => setActiveTab("closureRequest") },
        { title: "Interest Certificate", onClick: () => setActiveTab("interestCertificate") },
        { title: "Passbook", onClick: () => setActiveTab("passbook") },
        { title: "Statement", onClick: () => setActiveTab("statement") },
        { title: "Welcome Letter", onClick: () => setActiveTab("welcomeLetter") },
    ];

    const secondaryTabs = [
        { key: "basic", text: "Basic Details" },
        { key: "transaction", text: "View Transaction" },
        { key: "nominee", text: "Nominee" },
        { key: "removeAccount", text: "Remove Account" },
        { key: "updateAccountType", text: "Update Account Type" },
        { key: "ddBond", text: "DD Bond" },
        { key: "documents", text: "Documents" },
    ];

    return (
        <ViewSingleAccountDetailsMainContainer>

            <PageTopContent title="New DD Deposit Information" />

            <SecondaryTabsWrapper>
                <Grid container spacing={2}>
                    {secondaryTabs.map((btn) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={btn.key}>
                            <DynamicButton
                                text={btn.text}
                                onClick={() => setActiveTab(btn.key)}
                                variant={activeTab === btn.key ? "contained" : "outlined"}
                                textColor={activeTab === btn.key ? "#fff" : "#7858C6"}
                                color={activeTab === btn.key ? "#7858C6" : ""}
                                borderColor="#7858C6"
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </SecondaryTabsWrapper>

            {activeTab === "basic" && <ViewBasicDetails />}
            {activeTab === "transaction" && <ViewTransactionDetails />}
            {activeTab === "nominee" && <NomineeDetails setActiveTab={setActiveTab} />}
            {activeTab === "updateAccountType" && <UpdateAccountType />}
            {activeTab === "removeAccount" && <RemoveAccount setActiveTab={setActiveTab} />}
            {activeTab === "ddBond" && <DDBonds setActiveTab={setActiveTab} />}
            {activeTab === "documents" && <Documents />}

        </ViewSingleAccountDetailsMainContainer>

    );
};

export default ViewSingleAccountDetailsDD;
