import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import { Alert, Snackbar, styled } from "@mui/material";
import DynamicButton from "../../../components/DynamicButton";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import SubmitButtonLoader from "../../../components/SubmitButtonLoader";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";

import { useApproveRdAccountMutation, useGetAllRdAccountsQuery } from "../../../features/api/rdAccounts";

const RdApproval = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { isLoading, data } = useGetAllRdAccountsQuery();

  const [
    approveRdAccount,
    {
      data: approveResponse,
      isLoading: approveLoading,
      isError,
      isSuccess,
      error,
    },
  ] = useApproveRdAccountMutation();

  const rdAccountLists = data?.data || [];

  const ActionButtonContainer = styled("div")({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "accountNumber", label: "Account No.", minWidth: 150 },
    { id: "branchName", label: "Branch", minWidth: 150 },
    { id: "agentName", label: "Agent", minWidth: 150 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 150 },
    { id: "interestRate", label: "Interest Rate", minWidth: 120 },
    { id: "tenure", label: "Tenure (Months)", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 130 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 130 },
    { id: "approvedAt", label: "Approved Date", minWidth: 150 },
    { id: "approvedBy", label: "Approved By", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  const rows =
    rdAccountLists.map((item, index) => ({
      id: index + 1,
      accountNumber: item.accountNumber || "N/A",
      branchName: item.branch?.name || "N/A",
      agentName: item.agent?.name || "N/A",
      depositAmount: item.amount ? `₹ ${item.amount}` : "N/A",
      interestRate: item.interestRate || "N/A",
      tenure: item.tenureMonths || "N/A",
      startDate: new Date(item.createdAt).toLocaleString() || "N/A",
      maturityDate: item.maturityDate || "N/A",
      approvedAt: item.approvedAt || "N/A",
      approvedBy: item.approvedBy?.name || "N/A",
      status: item.status
        ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
        : "N/A",

      action: (
        <ActionButtonContainer>
          {/* View BTN */}
          <DynamicButton
            text="View"
            variant="outlined"
            textColor="#7858C6"
            borderColor="#7858C6"
            borderRadius="5px"
            component={NavLink}
            to={`/rd-accounts/${item.id}/account-details`}
          />

          {/* Approve BTN Only when Pending */}
          {item.status === "pending" && (
            <DynamicButton
              text={
                <SubmitButtonLoader
                  isLoading={approveLoading}
                  text="Approve"
                  texting="Please Wait..."
                />
              }
              variant="outlined"
              textColor="#0D6A84"
              borderColor="#0D6A84"
              borderRadius="5px"
              onClick={() => approveRdAccount(item.id)}
            />
          )}
        </ActionButtonContainer>
      ),
    })) || [];

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      <PageHeader title="RD Approval" onFilter onDownload />

      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />

      <ErrorAndSuccessUseEffect
        isError={isError}
        error={error}
        data={approveResponse}
        isSuccess={isSuccess}
        setSnackbar={setSnackbar}
      />

      {snackbar.open && (
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
