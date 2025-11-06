import React, { useState } from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import GetSavingDetailsByAcnt from "../../../components/GetSavingDetailsByAcnt";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { styled } from "@mui/material";
import FormLabel from "../../../components/FormLabel";
import { useGetBankStatementByAccountNumberQuery } from "../../../features/api/savingAccounts";
import { capitalizeFirstLetter } from "../../../helper/helper";

const RdStatement = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const accountNumber=localStorage.getItem("accountNumber")
  const { data, isLoading } = useGetBankStatementByAccountNumberQuery({fromDate,toDate,accountNumber});
  const bankStatementList = data?.data?.transactions || [];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "rdAccountNumber", label: "RD A/c No", minWidth: 120 },
    { id: "transactionDate", label: "Member No", minWidth: 120 },
    { id: "transactionDate", label: "Member Name", minWidth: 120 },
    { id: "transactionType", label: "Transaction Type", minWidth: 120 },
    { id: "txnDate", label: "Txn. Date", minWidth: 120 },
    { id: "transactionMode", label: "Transaction Mode", minWidth: 150 },
    // { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "credit", label: "Credit", minWidth: 120 },
    { id: "debit", label: "Debit", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rows = bankStatementList && bankStatementList.map((curStatement,i)=>({
    id:i+1,
    transactionDate:curStatement?.transactionDate || 'N/A',
    transactionID:curStatement?.transactionId || 'N/A',
    transactionType:capitalizeFirstLetter(curStatement?.transactionType) || 'N/A',
    remark:curStatement?.remark || 'N/A',
    debit:`₹ ${curStatement?.debit}` || 'N/A',
    credit:`₹ ${curStatement?.credit}`|| 'N/A',
    balance:`₹ ${curStatement?.balance}`|| 'N/A',
    status:capitalizeFirstLetter(curStatement?.status) || 'N/A',
  }));

  return (
    <PagesMainContainerStyle>
      <GetSavingDetailsByAcnt
        title="Statement Details"
        accntNumberLabel="RD Account No."
        showDetails={showDetails}
        AccountNumberFormLabel="RD Account Number"
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
          <DynamicDataTable
            isLoading={isLoading}
            rows={rows}
            columns={columns}
          />
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
