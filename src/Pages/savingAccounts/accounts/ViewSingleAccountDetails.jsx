import { Grid, styled } from "@mui/material";
import PageTopContent from "../../../components/PageTopContent";
import DynamicButton from "../../../components/DynamicButton";
import { useState } from "react";

import ViewTransactionDetails from "./transactionDetails/ViewTransactionDetails";
import Nominee from "./nominee/Nominee";
import CreditInterestsCharges from "./creditInterestsCharges/CreditInterestsCharges";
import UpgradeAccountPlan from "./upgradeAccountPlan/UpgradeAccountPlan";
import CloseAccount from "./closeAccount/CloseAccount";
import WidthrawalAmount from "./widthrawalMoney/WidthrawalAmount";
import RemoveAccount from "./removeAccount/RemoveAccount";
import Document from "./documents/Document";
import ViewBasicDetails from "./basicDetails/ViewBasicDetails";
import DebitOtherCharges from "./debitOtherCharges/DebitOtherCharges";
import UpgradeAccountType from "./upgradeAccountType/UpgradeAccountType";
import PrintPassbook from "./printPassbook/PrintPassbook";
import GroupOfButton from "../../../components/GroupOfButton";
import DocumentLogs from "./depositLogs/DocumentLogs";
import AccountStatus from "./accountStatus/AccountStatus";
import ApplicationForm from "./applicationForm/ApplicationForm";
import ForClosureRequrestLater from "./closeRequestLater/ForClosureRequrestLater";

const ViewSingleAccountDetails = () => {
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
  ];

  return (
    <ViewSingleAccountDetailsMainContainer>
      <PageTopContent title="Saving Account Information" />

      <GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

      <Grid container spacing={2}>
        {[
          { key: "basic", text: "Basic Details" },
          { key: "transaction", text: "Transaction Details" },
          { key: "nominee", text: "Nominee" },
          { key: "debitOtherCharges", text: "Debit Other Charges" },
          { key: "creditInterestsCharges", text: "Credit Interest Charges" },
          { key: "upgradeAccountPlan", text: "Upgrade Account Plan" },
          { key: "upgradeAccountType", text: "Upgrade Account Type" },
          { key: "closeAccount", text: "Close Account" },
          { key: "widthrawalMoney", text: "Deposit/Withdrawal Money" },
          { key: "removeAccount", text: "Remove Account" },
          { key: "printPassbook", text: "Print Passbook" },
          { key: "document", text: "Documents" },
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

      {activeTab === "basic" && <ViewBasicDetails />}
      {activeTab === "transaction" && <ViewTransactionDetails />}
      {activeTab === "nominee" && <Nominee setActiveTab={setActiveTab} />}
      {activeTab === "debitOtherCharges" && (
        <DebitOtherCharges setActiveTab={setActiveTab} />
      )}
      {activeTab === "creditInterestsCharges" && (
        <CreditInterestsCharges setActiveTab={setActiveTab} />
      )}
      {activeTab === "upgradeAccountPlan" && <UpgradeAccountPlan />}
      {activeTab === "upgradeAccountType" && <UpgradeAccountType />}
      {activeTab === "closeAccount" && (
        <CloseAccount setActiveTab={setActiveTab} />
      )}
      {activeTab === "removeAccount" && (
        <RemoveAccount setActiveTab={setActiveTab} />
      )}
      {activeTab === "widthrawalMoney" && (
        <WidthrawalAmount setActiveTab={setActiveTab} />
      )}
      {activeTab === "printPassbook" && <PrintPassbook />}
      {activeTab === "document" && <Document />}
      {activeTab === "documentLogs" && <DocumentLogs />}

      {activeTab === "accountStatus" && <AccountStatus />}
      {activeTab === "applicationForm" && <ApplicationForm />}
      {activeTab === "closureRequest" && <ForClosureRequrestLater />}
    </ViewSingleAccountDetailsMainContainer>
  );
};

export default ViewSingleAccountDetails;

const ViewSingleAccountDetailsMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
