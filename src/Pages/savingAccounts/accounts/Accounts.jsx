
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { useGetAllSavingAccountsListQuery } from "../../../features/api/savingAccounts";

const Accounts = () => {
  const { data, isLoading } = useGetAllSavingAccountsListQuery();

  const savingAccountsList = data?.data || [];

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "branchName", label: "Branch Name", minWidth: 120 },
    { id: "agentName", label: "Agent Name", minWidth: 120 },
    // { id: "planName", label: "Plan Name", minWidth: 150 },
    { id: "savingAccountNo", label: "Saving Account No.", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 180 },
    { id: "memberNo", label: "Member No.", minWidth: 180 },
    { id: "openingDate", label: "Opening Date", minWidth: 180 },
    { id: "nominee", label: "Nominee (Y/N)", minWidth: 180 },
    { id: "nomineeName", label: "Nominee Name", minWidth: 180 },
    { id: "availableBalance", label: "Available Balance (₹)", minWidth: 180 },
    { id: "lockinAmount", label: "Lockin Amount (₹)", minWidth: 180 },
    { id: "passbookNumber", label: "Passbook Number", minWidth: 180 },
    { id: "status", label: "Staus", minWidth: 180 },
    { id: "action", label: "Actions", minWidth: 180 },
  ];

  const rows = savingAccountsList.map((curList, i) => ({
    id: i + 1,
    branchName: curList?.branch?.name || "N/A",
    agentName: curList?.agent?.name || "N/A",
    planName: curList?.agent?.name || "N/A",
    savingAccountNo: curList?.accountNumber || "N/A",
    memberName: curList?.member?.firstName || "N/A",
    memberNo: curList?.member?.applicationNumber || "N/A",
    openingDate: curList?.openDate || "N/A",
    nominee: curList?.member.nomineeInfo ? "Yes" : "No",
    nomineeName: curList?.nomineeName || "N/A",
    availableBalance: `₹ ${curList?.depositAmount}` || "N/A",
    lockinAmount: curList?.lockinAmount || "N/A",
    passbookNumber: curList?.passbookNumber || "N/A",
    status:
      curList?.status === "closed"
        ? "Closed"
        : curList?.status === "Closure_Approval"
        ? "Closure Request"
        : "Approved",
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
          to={`/saving-accounts/${curList?.id}/account-details`}
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

export default Accounts;
