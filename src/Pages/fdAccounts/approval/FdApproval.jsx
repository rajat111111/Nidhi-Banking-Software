import { useState } from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import DynamicButton from "../../../components/DynamicButton";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";
import { Alert, Snackbar, styled } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helper/helper";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import {
  useApproveFdAccountMutation,
  useGetAllFdAccountsListQuery,
} from "../../../features/api/fdAccounts";

const FdApproval = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { id } = useParams();
  const { isLoading, data } = useGetAllFdAccountsListQuery(id);

  const [
    approveFdAccount,
    {
      data: approveFdAccountData,
      isLoading: approveFdLoading,
      isError,
      isSuccess,
      error,
    },
  ] = useApproveFdAccountMutation();

  const savingAccountApprovalList = data?.data?.data || [];

  // handle approval button click
  const handleApproved = async (id) => {
    try {
      await approveFdAccount(id).unwrap();
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  // Table columns
  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "accountNumber", label: "Account No.", minWidth: 180 },
    { id: "memberName", label: "Member Name", minWidth: 150 },
    { id: "branchName", label: "Branch Name", minWidth: 180 },
    { id: "agentName", label: "Agent Name", minWidth: 150 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 120 },
    { id: "openDate", label: "Open Date", minWidth: 120 },
    { id: "paymentMode", label: "Payment Mode", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 200 },
  ];

  // Table rows
  const rows = savingAccountApprovalList.map((curList, i) => ({
    id: i + 1,
    accountNumber: curList?.fdAccountNumber || "N/A",
    memberName: curList?.member?.name || "N/A",
    branchName: curList?.branch?.name || "N/A",
    agentName: curList?.agent?.name || "N/A",
    depositAmount: curList?.depositAmount
      ? `₹ ${curList.depositAmount}`
      : "₹ 0",
    openDate: curList?.startDate || "N/A",
    paymentMode: capitalizeFirstLetter(curList?.paymentMode) || "N/A",
    balance: curList?.balance ? `₹ ${curList.balance}` : "₹ 0",
    status: capitalizeFirstLetter(curList?.status) || "N/A",
    action: (
      <ActionButtonContainer>
        <DynamicButton
          text="View"
          variant="outlined"
          textColor="#7858C6"
          borderColor="#7858C6"
          borderRadius="5px"
          component={NavLink}
          to={`/fd-accounts/${curList?.id}/account-details`}
        />

        {curList.status === "pending" && (
          <DynamicButton
            text={
              <SubmitButtonLoader
                isLoading={approveFdLoading}
                text="Approve"
                loaderColor="#0D6A84"
                texting="Please Wait"
              />
            }
            variant="outlined"
            textColor="#0D6A84"
            onClick={() => handleApproved(curList?.id)}
            borderColor="#0D6A84"
            borderRadius="5px"
          />
        )}
      </ActionButtonContainer>
    ),
  }));

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Saving Account Approvals" onFilter onDownload />

      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />

      <ErrorAndSuccessUseEffect
        isError={isError}
        error={error}
        data={approveFdAccountData}
        isSuccess={isSuccess}
        setSnackbar={setSnackbar}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbar.severity}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PagesMainContainerStyle>
  );
};

export default FdApproval;
