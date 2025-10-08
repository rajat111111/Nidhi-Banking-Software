import { styled } from "@mui/material";
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



  const buttonsList=[
    {
      title:"Account Status",
      onClick:(()=>setActiveTab("accountStatus")),
      color:activeTab==="accountStatus" ? "#F68712":"#7858C6"
    },
    {
      title:"Application Form",
       onClick:(()=>setActiveTab("applicationForm")),
      color:activeTab==="applicationForm" ? "#F68712":"#7858C6"
    },
    {
      title:"Foreclosure Request Letter",
       onClick:(()=>setActiveTab("closureRequest")),
      color:activeTab==="closureRequest" ? "#F68712":"#7858C6"
    },
    {
      title:"Interest Certificate"
    },
    {
      title:"Passbook"
    },
    {
      title:"Statement"
    },
    {
      title:"Welcome Letter"
    },
  ]

  return (
    <ViewSingleAccountDetailsMainContainer>
      <PageTopContent title="Saving Account Information" />

      {/* Header Buttons */}
<GroupOfButton buttonsList={buttonsList} borderColor="#DDDDEBBF" />

      {/* Action Buttons */}
      <ButtonContainer>
        {/* Left Group */}
        <GroupButton>
          <DynamicButton
            onClick={() => setActiveTab("basic")}
            text="Basic Details"
            variant={activeTab === "basic" ? "contained" : "outlined"}
            textColor={activeTab === "basic" ? "#fff" : "#7858C6"}
            color={activeTab === "basic" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />

          <DynamicButton
            text="Transaction Details"
            onClick={() => setActiveTab("transaction")}
            variant={activeTab === "transaction" ? "contained" : "outlined"}
            textColor={activeTab === "transaction" ? "#fff" : "#7858C6"}
            color={activeTab === "transaction" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />

          <DynamicButton
            onClick={() => setActiveTab("nominee")}
            text="Nominee"
            variant={activeTab === "nominee" ? "contained" : "outlined"}
            textColor={activeTab === "nominee" ? "#fff" : "#7858C6"}
            color={activeTab === "nominee" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />

          <DynamicButton
            text="Debit Other Charges"
            onClick={() => setActiveTab("debitOtherCharges")}
            variant={
              activeTab === "debitOtherCharges" ? "contained" : "outlined"
            }
            textColor={activeTab === "debitOtherCharges" ? "#fff" : "#7858C6"}
            color={activeTab === "debitOtherCharges" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Credit Interest Charges"
            onClick={() => setActiveTab("creditInterestsCharges")}
            variant={
              activeTab === "creditInterestsCharges" ? "contained" : "outlined"
            }
            textColor={
              activeTab === "creditInterestsCharges" ? "#fff" : "#7858C6"
            }
            color={activeTab === "creditInterestsCharges" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Upgrade Account Plan"
            onClick={() => setActiveTab("upgradeAccountPlan")}
            variant={
              activeTab === "upgradeAccountPlan" ? "contained" : "outlined"
            }
            textColor={activeTab === "upgradeAccountPlan" ? "#fff" : "#7858C6"}
            color={activeTab === "upgradeAccountPlan" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Upgrade Account Type"
            onClick={() => setActiveTab("upgradeAccountType")}
            variant={
              activeTab === "upgradeAccountType" ? "contained" : "outlined"
            }
            textColor={activeTab === "upgradeAccountType" ? "#fff" : "#7858C6"}
            color={activeTab === "upgradeAccountType" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
        </GroupButton>

        {/* Right Group */}
        <GroupButton>
          <DynamicButton
            text="Close Account"
            onClick={() => setActiveTab("closeAccount")}
            variant={activeTab === "closeAccount" ? "contained" : "outlined"}
            textColor={activeTab === "closeAccount" ? "#fff" : "#7858C6"}
            color={activeTab === "closeAccount" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Deposit/Withdrawal Money"
            onClick={() => setActiveTab("widthrawalMoney")}
            variant={activeTab === "widthrawalMoney" ? "contained" : "outlined"}
            textColor={activeTab === "widthrawalMoney" ? "#fff" : "#7858C6"}
            color={activeTab === "widthrawalMoney" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Remove Account"
            onClick={() => setActiveTab("removeAccount")}
            variant={activeTab === "removeAccount" ? "contained" : "outlined"}
            textColor={activeTab === "removeAccount" ? "#fff" : "#7858C6"}
            color={activeTab === "removeAccount" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Print Passbook"
            onClick={() => setActiveTab("printPassbook")}
            variant={activeTab === "printPassbook" ? "contained" : "outlined"}
            textColor={activeTab === "printPassbook" ? "#fff" : "#7858C6"}
            color={activeTab === "printPassbook" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Documents"
            onClick={() => setActiveTab("document")}
            variant={activeTab === "document" ? "contained" : "outlined"}
            textColor={activeTab === "document" ? "#fff" : "#7858C6"}
            color={activeTab === "document" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
          <DynamicButton
            text="Deposit Logs"
            onClick={() => setActiveTab("documentLogs")}
            variant={activeTab === "documentLogs" ? "contained" : "outlined"}
            textColor={activeTab === "documentLogs" ? "#fff" : "#7858C6"}
            color={activeTab === "documentLogs" ? "#7858C6" : ""}
            borderColor="#7858C6"
          />
        </GroupButton>
      </ButtonContainer>

      {activeTab === "basic" && <ViewBasicDetails />}
      {activeTab === "transaction" && <ViewTransactionDetails />}
      {activeTab === "nominee" && <Nominee setActiveTab={setActiveTab}  />}
      {activeTab === "debitOtherCharges" && <DebitOtherCharges setActiveTab={setActiveTab} />}
      {activeTab === "creditInterestsCharges" && <CreditInterestsCharges  setActiveTab={setActiveTab} />}
      {activeTab === "upgradeAccountPlan" && <UpgradeAccountPlan />}
      {activeTab === "upgradeAccountType" && <UpgradeAccountType />}
      {activeTab === "closeAccount" && <CloseAccount setActiveTab={setActiveTab} />}
      {activeTab === "removeAccount" && <RemoveAccount setActiveTab={setActiveTab} />}
      {activeTab === "widthrawalMoney" && <WidthrawalAmount setActiveTab={setActiveTab} />}
      {activeTab === "printPassbook" && <PrintPassbook />}
      {activeTab === "document" && <Document />}
      {activeTab === "documentLogs" && <DocumentLogs />}

      {activeTab==="accountStatus" && <AccountStatus/>}
      {activeTab==="applicationForm" && <ApplicationForm/>}
      {activeTab==="closureRequest" && <ForClosureRequrestLater/>}
    </ViewSingleAccountDetailsMainContainer>
  );
};

export default ViewSingleAccountDetails;

/* ---------- STYLES ---------- */
const ViewSingleAccountDetailsMainContainer = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderTop: "1px solid #DDDDEBBF",
  paddingTop: "20px",
});

const GroupButton = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
