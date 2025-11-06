import React from "react";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { Button, styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { useGetAllFdAccountsListQuery } from "../../../features/api/fdAccounts";
import { capitalizeFirstLetter } from "../../../helper/helper";

const Account = () => {
  const { data, isLoading } = useGetAllFdAccountsListQuery();

  const fdAccountsList = data?.data || [];

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

  const rows = fdAccountsList.map((curList, i) => ({
    id: i + 1,
    fdNo: curList?.id || "N/A",
    memberNo: curList?.member?.id || "N/A",
    memberName: curList?.member?.name || "N/A",
    branch: curList?.branch?.name || "N/A",
    agentName: curList?.agent?.name || "N/A",
    planName: curList?.openDate || "N/A",
    amount: curList?.depositAmount ? `₹ ${curList?.depositAmount}` : `₹ ${0}`,
    payMode: capitalizeFirstLetter(curList?.paymentMode) || "N/A",
    openDate: curList?.startDate || "N/A",
    maturityDate: curList?.maturityDate || "N/A",
    IntPayout: curList?.netAmountToRelease
      ? `₹ ${curList?.netAmountToRelease}`
      : `₹ ${0}` || "N/A",
    status: curList?.status === "closed" ? "Closed" : "Approved",
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
          to={`/fd-accounts/${curList?.member?.id}/account-details`}
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

          to: "/fd-accounts/add-new-account",
          color: "secondary",
        }}
      />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default Account;
