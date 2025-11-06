import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import { Alert, Snackbar, styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import {
  useApproveSavingAccountMutation,
  useGetApprovalSavingAccountListQuery,
} from "../../../features/api/savingAccounts";
import { capitalizeFirstLetter } from "../../../helper/helper";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { useState } from "react";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";

const RdApproval = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { isLoading, data } = useGetApprovalSavingAccountListQuery();

  const [
    approveSavingAccount,
    {
      data: approveSavingData,
      isLoading: approveSavingLoading,
      isError,
      isSuccess,
      error,
    },
  ] = useApproveSavingAccountMutation();

  const savingAccountApprovalList = data?.data || [];

  const handleApproved = async (id) => {
    try {
      await approveSavingAccount(id);
    } catch (error) {
      console.log(error);
    }
  };

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });
  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "rdAccountNumber", label: "RD Account No.", minWidth: 120 },
    { id: "branchId", label: "Branch ID ", minWidth: 150 },
    { id: "agentId", label: "Agent ID", minWidth: 120 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 120 },
    { id: "interestRate", label: "Interest Rate", minWidth: 120 },
    { id: "tanure", label: "Tenure (Months)", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 120 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
    { id: "approvedDate", label: "Approved Date", minWidth: 120 },
    { id: "approvedBy", label: "Approved By", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
  ];

  const rows =
    savingAccountApprovalList &&
    savingAccountApprovalList.map((curList, i) => ({
      id: i + 1,
      memberId: curList?.id || "N/A",
      branchName: curList?.branchName || "N/A",
      agentName: curList?.agentName || "N/A",
      accountType: capitalizeFirstLetter(curList?.accountType) || "N/A",
      depositAmount: `₹ ${curList?.depositAmount}` || "0",
      openDate: curList?.openDate || "N/A",
      transactionDate: curList?.transactionDate || "N/A",
      paymentMode: capitalizeFirstLetter(curList?.paymentMode) || "N/A",
      approvedDate: curList?.approvedDate || "N/A",
      approvedBy: curList?.approvedBy || "N/A",
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
              to={`/saving-accounts/${curList?.id}/account-details`}
            />

          {curList.status === "pending" && (
            <>
              <DynamicButton
                text={
                  <SubmitButtonLoader
                    isLoading={approveSavingLoading}
                    text="Approved"
                    loaderColor="#0D6A84"
                    texting="Please Wait "
                  />
                }
                variant="outlined"
                textColor="#0D6A84"
                onClick={() => handleApproved(curList?.id)}
                borderColor="#0D6A84"
                borderRadius="5px"
              />
              
            </>
          )}
        </ActionButtonContainer>
      ),
    }));

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      <PageHeader title="Approval" onFilter onDownload />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
      <ErrorAndSuccessUseEffect
        isError={isError}
        error={error}
        data={approveSavingData}
        isSuccess={isSuccess}
        setSnackbar={setSnackbar}
      />
      {snackbar && (
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
      )}
    </PagesMainContainerStyle>
  );
};

export default RdApproval;
