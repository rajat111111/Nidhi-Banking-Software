import React, { useState } from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { Alert, Snackbar, styled } from "@mui/material";
import FormLabel from "../../../components/FormLabel";
import { capitalizeFirstLetter } from "../../../helper/helper";
import FetchRdAccountDetails from "../../../components/rdAccount/FetchRdAccountDetails";
import DynamicButton from "../../../components/DynamicButton";
import {
  useLazyFetchRdAccontStatementsByFdAccountQuery,
} from "../../../features/api/rdAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";

const RdStatement = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [triggerGetFdDetails, { data, isLoading, isError, isSuccess, error }] =
    useLazyFetchRdAccontStatementsByFdAccountQuery({ fromDate, toDate });

  const bankStatementList = data?.data?.transactions || [];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "rdAccountNumber", label: "RD A/c No", minWidth: 120 },
    { id: "memberNo", label: "Member No", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "transactionType", label: "Transaction Type", minWidth: 120 },
    { id: "txnDate", label: "Txn. Date", minWidth: 120 },
    { id: "transactionMode", label: "Transaction Mode", minWidth: 150 },
    // { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "credit", label: "Credit", minWidth: 120 },
    { id: "debit", label: "Debit", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rows =
    bankStatementList &&
    bankStatementList.map((curStatement, i) => ({
      id: i + 1,
      rdAccountNumber: curStatement?.accountNumber ||  data?.data?.accountNumber || "N/A",
      memberNo: curStatement?.membeNo|| "N/A",
transactionType:curStatement?.transactionType,
txnDate:new Date(curStatement?.transactionDate).toLocaleString(),
      memberName:  data?.data?.memberName|| "N/A",
        transactionMode: capitalizeFirstLetter( curStatement?.mode)|| "N/A",
      debit: `₹ ${curStatement?.debit}` || "N/A",
      credit: `₹ ${curStatement?.credit}` || "N/A",
      balance: `₹ ${curStatement?.balance}` || "N/A",
      status: capitalizeFirstLetter(curStatement?.status) || "N/A",
    }));

  const handleFetchStatements = async () => {
    try {
      await triggerGetFdDetails({ fromDate, toDate });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      <FetchRdAccountDetails
        title="Statement Details"
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      {showDetails && (
        <>
          <FilterByDate>
            <FormContent>
              <FormLabel label="From Date" />
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                id="fromDate"
     
              />
            </FormContent>
            <FormContent>
              <FormLabel label="To Date" />
              <input
                type="date"
                name="toDate"
                id="toDate"
  
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </FormContent>
            <DynamicButton
              onClick={handleFetchStatements}
              text={
                <SubmitButtonLoader text="Show" texting="Showing" isLoading={isLoading}  />
              }
              color="#7858C6"
              textColor="#FFFFFF"
              sx={{ marginTop: "35px" }}
            />
          </FilterByDate>
          <PageHeader
            title="Account Details"
            borderBottom="1px solid #DDDDEBBF"
            extraButtons={[
              {
                label: "🖨 Print Passbook",
              },
              {
                label: "⬇  Download PDF",
              },
            ]}
          />
          <DynamicDataTable rows={rows} columns={columns} />
          <ErrorAndSuccessUseEffect
            isError={isError}
            isSuccess={isSuccess}
            data={data}
            error={error}
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
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default RdStatement;

const FilterByDate = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
});
const FormContent = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
