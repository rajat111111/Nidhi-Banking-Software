import React from "react";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helper/helper";
import { useGetAllRdAccountsQuery, useGetAllRdAccountsWithoutPendingStatusQuery } from "../../../features/api/rdAccounts";

const RdAccounts = () => {
  const { data, isLoading } = useGetAllRdAccountsWithoutPendingStatusQuery();
  const rdAccountsList = data?.data || [];

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "rdNo", label: "RD A/c No", minWidth: 120 },
    { id: "memberNo", label: "Member No", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 160 },
    { id: "accountType", label: "Account Type", minWidth: 120 },
    { id: "branch", label: "Branch", minWidth: 180 },
    { id: "agentName", label: "Agent Name", minWidth: 160 },
    { id: "planName", label: "Plan Name", minWidth: 160 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "txnDate", label: "Txn.Date", minWidth: 120 },
    { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "openDate", label: "Open Date", minWidth: 120 },
    { id: "interestPayout", label: "Int. Payout", minWidth: 140 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 160 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Actions", minWidth: 140 },
  ];

  const rows = rdAccountsList.map((curList, i) => ({
    id: i + 1,
    rdNo: curList?.accountNumber || "N/A",
    memberNo: curList?.member?.id || "N/A",
    memberName:curList?.memberName || "N/A",
    accountType: curList?.member?.accountType || "N/A",
    branch: curList?.branchName || "N/A",
    agentName: curList?.agentName || "N/A",
    planName: curList?.planName || "N/A",
    amount: curList?.amount ? `₹ ${curList?.amount}` : "₹ 0",
    txnDate: curList?.txnDate || "N/A",
    payMode: capitalizeFirstLetter(curList?.paymentMode) || "N/A",
    openDate: curList?.openDate
      ? new Date(curList?.openDate).toLocaleDateString()
      : "N/A",
    maturityDate: curList?.maturityDate
      ? new Date(curList?.maturityDate).toLocaleDateString()
      : "N/A",
    interestPayout: curList?.interestPayout || "N/A",
    status: capitalizeFirstLetter(curList?.status) || "N/A",

    action: (
      <ActionButtonContainer>
        <DynamicButton
          text="View"
          variant="outlined"
          textColor="#0D6A84"
          borderColor="#0D6A84"
          borderRadius="5px"
          onClick={() =>
            localStorage.setItem("accountNumber", curList?.accountNumber)
          }
          component={NavLink}
          to={`/rd-accounts/${curList?.id}/account-details`}
        />
      </ActionButtonContainer>
    ),
  }));

  return (
    <>
      <PageHeader
        title="RD Account Details"
        onDownload
        onFilter
        primaryButton={{
          label: "Add New",
          variant: "contained",
          component: { NavLink },
          to: "/rd-accounts/add-new-account",
          color: "secondary",
        }}
      />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default RdAccounts;
