import React from "react";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { Button, styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { useGetAllSavingAccountsListQuery } from "../../../features/api/savingAccounts";

const Account = () => {


  const { data, isLoading } = useGetAllSavingAccountsListQuery();

  const savingAccountsList = data?.data || [];


  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "fdNo", label: "FD No", minWidth: 120 },
    { id: "memberNo", label: "Member No", minWidth: 120 },
    // { id: "planName", label: "Plan Name", minWidth: 150 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "branch", label: "Branch", minWidth: 180 },
    { id: "agentName", label: "Agent Name", minWidth: 180 },
    { id: "planName", label: "Plan Name", minWidth: 180 },
    { id: "amount", label: "Amount", minWidth: 180 },
    { id: "payMode", label: "Pay Mode", minWidth: 180 },
    { id: "openDate", label: "Open Date", minWidth: 180 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 180 },
    { id: "IntPayout", label: "Int. Payout", minWidth: 180 },
    { id: "status", label: "Staus", minWidth: 180 },
    { id: "action", label: "Actions", minWidth: 180 },
  ];

  const rows = savingAccountsList.map((curList, i) => ({
    id: i + 1,
    fdNo: curList?.branch?.name || "N/A",
    memberNo: curList?.agent?.name || "N/A",
    memberName: curList?.agent?.name || "N/A",
    branch: curList?.accountNumber || "N/A",
    agentName: curList?.member?.firstName || "N/A",
    memberNo: curList?.member?.applicationNumber || "N/A",
    planName: curList?.openDate || "N/A",
    amount: curList?.member.nomineeInfo ? "Yes" : "No",
    payMode: curList?.nomineeName || "N/A",
    openDate: `₹ ${curList?.depositAmount}` || "N/A",
    maturityDate: curList?.lockinAmount || "N/A",
    IntPayout: curList?.passbookNumber || "N/A",
    status: curList?.status === "closed" ? "Closed" : "Approved",
    action: (
      <ActionButtonContainer>
        <DynamicButton
          text="View"
          variant="outlined"
          textColor="#0D6A84"
          borderColor="#0D6A84"
          borderRadius="5px"
          onClick={() => localStorage.setItem("accountNumber", curList?.accountNumber)}
          component={NavLink}
          to={`/saving-accounts/${curList?.member?.id}/account-details`}
        />

      </ActionButtonContainer>
    ),
  }));

  return (
    <>
      <PageHeader
        title="Account Details"
        onDownload
        onFilter
        primaryButton={{
          label: "Add New",
          variant: "contained",
          component: { NavLink },

          to: "/saving-accounts/add-new-account",
          color: "secondary",

        }}
      />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default Account;
