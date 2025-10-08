import { styled } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import FormLabel from "../../../../components/FormLabel";
import GroupOfButton from "../../../../components/GroupOfButton";
import DynamicDataTable from "../../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import { useParams } from "react-router-dom";
import { usePrintTransactionDetailsQuery } from "../../../../features/api/savingAccounts";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const PrintPassbook = () => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { id } = useParams();

  const { data, isLoading } = usePrintTransactionDetailsQuery({
    id,
    fromDate,
    toDate,
  });

  const printTransactionDetails = data?.data?.transactions || [];

  const buttonsList = [
    {
      title: "👁 Preview",
      color: "#7858C6",
      textColor: "#FFFFFF",
    },
    {
      title: "🖨 Print Passbook",
      color: "#7858C6",
      textColor: "#FFFFFF",
    },
    {
      title: "⬇  Download PDF",
      color: "#7858C6",
      textColor: "#FFFFFF",
    },
  ];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
    { id: "transactionId", label: "Transaction ID", minWidth: 120 },
    { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 120 },
    { id: "debit", label: "Debit", minWidth: 120 },
    { id: "credit", label: "Credit", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rows = printTransactionDetails.map((curTran, i) => ({
    id: i + 1,
    transactionDate: curTran?.transactionDate || "N/A",
    transactionId: curTran?.transactionId || "N/A",
    payMode: capitalizeFirstLetter( curTran?.payMode) || "N/A",
    remark: curTran?.remark || "N/A",
    debit: `₹ ${curTran?.debit}` || "N/A",
    credit: `₹ ${curTran?.credit}`|| "N/A",
    balance: `₹ ${curTran?.balance}`|| "N/A",
    status: curTran?.status==="success" ? "Success":"Rejected" || "N/A",
  }));
  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Print Passbook" borderBottom=" 1px solid #DDDDEBBF" />
      <FilterByDateSection>
        <FormContent>
          <FormLabel label="From Date" />
          <input
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            type="date"
            name="fromDate"
            id=""
          />
        </FormContent>
        <FormContent>
          <FormLabel label="To Date" />
          <input
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            type="date"
            name="toDate"
            id=""
          />
        </FormContent>
      </FilterByDateSection>
      <GroupOfButton buttonsList={buttonsList} />
      <PageHeader title="Print Transaction Details" />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default PrintPassbook;

const FilterByDateSection = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  alignItems: "center",
});

const FormContent = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});
