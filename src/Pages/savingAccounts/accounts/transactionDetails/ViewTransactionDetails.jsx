import { capitalize, styled } from "@mui/material";
import React from "react";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import { useGetAllAccountTransactionsQuery } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";

const ViewTransactionDetails = () => {
  const { id } = useParams();

  console.log("id", id)

  const { data, isLoading } = useGetAllAccountTransactionsQuery({ id });

  const allTransactionList = data?.data || [];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
    { id: "transactionId", label: "Transaction ID", minWidth: 120 },
    { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 180 },
    { id: "debit", label: "Debit", minWidth: 100 },
    { id: "credit", label: "Credit", minWidth: 100 },
    { id: "balance", label: "Balance", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const rows = allTransactionList.map((curList, i) => ({
    id: i + 1,
    transactionDate: curList?.transactionDate || "N/A",
    transactionId: curList?.transactionId || "N/A",
    payMode: capitalize(curList?.payMode) || "N/A",
    remark: curList?.remark || "N/A",
    debit: `₹ ${curList?.debit}` || "N/A",
    credit: `₹ ${curList?.credit}` || "N/A",
    balance: `₹ ${curList?.cumulativeBalance}` || "N/A",
    status: curList?.status === "success" ? "Sucess" : "Rejected" || "N/A",
  }));
  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Transaction Details" onDownload onFilter />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default ViewTransactionDetails;
