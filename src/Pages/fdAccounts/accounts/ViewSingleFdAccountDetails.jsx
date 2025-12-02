import { Grid, styled } from "@mui/material";
import PageTopContent from "../../../components/PageTopContent";
import DynamicButton from "../../../components/DynamicButton";
import { useState } from "react";
import GroupOfButton from "../../../components/GroupOfButton";
import FdBasics from "./basicDetails/FdBasics";
import ViewInterestPayouts from "./interestPayout/ViewInterestPayouts";
import ViewFdTransactionDetails from "./viewTransactions/ViewFdTransactionDetails";
import FdNominee from "./nominee/FdNominee";
import FdForClose from "./forClose/FdForClose";
import FdRemoveAccount from "./removeAccount/FdRemoveAccount";
import FdUpgradeAccountType from "./FdUpgradeAccountType";
import FdCreditInterest from "./credit-debit-interest/FdCreditInterest";
import FdReverseTds from "./reverseTds/FdReverseTds";
import FdBond from "./fdBond/FdBond";
import FdDocuments from "./fdDocuments/FdDocuments";
import FdDocumentLogs from "./depositeLogs/FdDocumentLogs";
import FdUpgradeAccountPlan from "./upgradeAccountPlan/FdUpgradeAccountPlan";


const ViewSingleFdAccountDetails = () => {

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
      <PageTopContent title="FD Account Information" />

      <GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

      <Grid container spacing={2}>
        {[
          { key: "basic", text: "Basic Details" },
          { key: "interestPayouts", text: "Interest Payouts" },
          { key: "viewTransaction", text: "View Transaction" },
          { key: "nominee", text: "Nominee" },
          { key: "forClose", text: "For Close" },
          { key: "removeAccount", text: "Remove Account" },
{ key: "upgradeAccountPlan", text: "Upgrade Account Plan" },
          { key: "upgradeAccountType", text: "Upgrade Account Type" },
          { key: "creditInterest", text: "Credit/Debit Interest" },
          { key: "reverseTds", text: "Deduct/Reverse TDS" },
          { key: "fdBond", text: "FD Bond" },

          { key: "documents", text: "Documents" },
          { key: "documentLogs", text: "Deposit Logs" },
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

      {activeTab === "basic" && <FdBasics />}
      {activeTab === "interestPayouts" && <ViewInterestPayouts />}
      {activeTab === "viewTransaction" && <ViewFdTransactionDetails  />}
      {activeTab === "nominee" && <FdNominee setActiveTab={setActiveTab}  />}
      {activeTab === "forClose" && (
        <FdForClose setActiveTab={setActiveTab} />
      )}
     
      {activeTab === "removeAccount" && (
        <FdRemoveAccount setActiveTab={setActiveTab} />
      )}
      {activeTab === "upgradeAccountType" && (
        <FdUpgradeAccountType setActiveTab={setActiveTab} />
      )}
      {activeTab === "upgradeAccountPlan" && (
        <FdUpgradeAccountPlan setActiveTab={setActiveTab} />
      )}
      {activeTab === "creditInterest" && <FdCreditInterest  setActiveTab={setActiveTab} />}
      {activeTab === "reverseTds" && <FdReverseTds setActiveTab={setActiveTab}  />}
      {activeTab === "fdBond" && <FdBond />}

      {activeTab === "documents" && <FdDocuments />}
      {activeTab === "documentLogs" && <FdDocumentLogs />}
    </ViewSingleAccountDetailsMainContainer>
  );
};

export default ViewSingleFdAccountDetails;

const ViewSingleAccountDetailsMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
