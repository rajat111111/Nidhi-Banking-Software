import { Grid, styled } from "@mui/material";
import PageTopContent from "../../../components/PageTopContent";
import DynamicButton from "../../../components/DynamicButton";
import { useState } from "react";
import GroupOfButton from "../../../components/GroupOfButton";

import RdBasicDetails from "./basicDetails/RdBasicDetails";
import ViewRdTransactions from "./viewTransactions/ViewRdTransactions";
import RdNominee from "./nominee/RdNominee";
import RemoveRdAccount from "./removeAccount/RemoveRdAccount";
import UpdateRdAccountType from "./updateAccountType/UpdateRdAccountType";
import RdFdBond from "./fdBond/RdFdBond";
import RdDocuments from "./documents/RdDocuments";

const ViewSingleRdAccountDetails = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const buttonsList = [
    {
      title: "Account Status",
      onClick: () => setActiveTab("accountStatus"),
      color: activeTab === "accountStatus" ? "#F68712" : "#7858C6",
    },
    {
      title: "Application Form",
      onClick: () => setActiveTab("applicationForm"),
      color: activeTab === "applicationForm" ? "#F68712" : "#7858C6",
    },
    {
      title: "Foreclosure Request Letter",
      onClick: () => setActiveTab("closureRequest"),
      color: activeTab === "closureRequest" ? "#F68712" : "#7858C6",
    },
    { title: "Interest Certificate" },
    { title: "Passbook" },
    { title: "Statement" },
    { title: "Welcome Letter" },
    { title: "Bond" },
  ];

  return (
    <ViewSingleAccountDetailsMainContainer>
      <PageTopContent title="Saving Account Information" />

      <GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

      <Grid container spacing={2}>
        {[
          { key: "basic", text: "Basic Details" },
          { key: "viewTransaction", text: "View Transaction" },
          { key: "nominee", text: "Nominee" },
          { key: "removeAccount", text: "Remove Account" },
          { key: "upgradeAccountType", text: "Upgrade Account Type" },
          { key: "fdBond", text: "FD Bond" },

          { key: "documents", text: "Documents" },
        ].map((btn) => (
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

      {activeTab === "basic" && <RdBasicDetails />}
      {activeTab === "viewTransaction" && <ViewRdTransactions />}
      {activeTab === "nominee" && <RdNominee setActiveTab={setActiveTab} />}

      {activeTab === "removeAccount" && (
        <RemoveRdAccount setActiveTab={setActiveTab} />
      )}
      {activeTab === "upgradeAccountType" && (
        <UpdateRdAccountType setActiveTab={setActiveTab} />
      )}

      {activeTab === "fdBond" && <RdFdBond />}

      {activeTab === "documents" && <RdDocuments />}
    </ViewSingleAccountDetailsMainContainer>
  );
};

export default ViewSingleRdAccountDetails;

const ViewSingleAccountDetailsMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
