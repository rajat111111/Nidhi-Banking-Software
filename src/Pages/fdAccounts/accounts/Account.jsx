import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { useGetFdAccountsWithApprovalStatusQuery } from "../../../features/api/fdAccounts";
import { capitalizeFirstLetter } from "../../../helper/helper";

const Account = () => {
  const { data, isLoading } = useGetFdAccountsWithApprovalStatusQuery();

  const fdAccountsList = data?.data?.data || data?.data || [];

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "fdAccountNumber", label: "FD Account No.", minWidth: 160 },
    { id: "memberName", label: "Member Name", minWidth: 180 },
    { id: "branchName", label: "Branch", minWidth: 180 },
    { id: "agentName", label: "Agent Name", minWidth: 160 },
    { id: "accountType", label: "Account Type", minWidth: 130 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 150 },
    { id: "paymentMode", label: "Payment Mode", minWidth: 130 },
    { id: "startDate", label: "Start Date", minWidth: 130 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 130 },
    { id: "approvedBy", label: "Approved By", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Actions", minWidth: 160 },
  ];

  const rows = fdAccountsList.map((account, index) => ({
    id: index + 1,
    fdAccountNumber: account?.fdAccountNumber || "N/A",
    memberName: account?.member?.name || "N/A",
    branchName: account?.branch?.name || "N/A",
    agentName: account?.agent?.name || "N/A",
    accountType: capitalizeFirstLetter(account?.accountType) || "N/A",
    depositAmount: account?.depositAmount
      ? `₹ ${account.depositAmount}`
      : "₹ 0.00",
    paymentMode: capitalizeFirstLetter(account?.paymentMode) || "N/A",
    startDate: account?.startDate || "N/A",
    maturityDate: account?.maturityDate || "N/A",
    approvedBy: account?.approvedBy?.name || "N/A",
    status:
      account?.status === "closed"
        ? "Closed"
        : account?.status === "Closure_Approval"
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
            localStorage.setItem("accountNumber", account?.fdAccountNumber)
          }
          component={NavLink}
          to={`/fd-accounts/${account?.id}/account-details`}
        />
      </ActionButtonContainer>
    ),
  }));

  return (
    <>
      <PageHeader
        title="FD Account Details"
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