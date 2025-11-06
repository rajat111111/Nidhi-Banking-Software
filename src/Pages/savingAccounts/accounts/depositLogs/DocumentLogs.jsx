import React from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { useGetAllDepositeLogsOfSingleMemberQuery } from "../../../../features/api/savingAccounts";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const DocumentLogs = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAllDepositeLogsOfSingleMemberQuery({ id });
  const depositLogsList = data?.transactions || [];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
    { id: "transactionId", label: "Transaction ID", minWidth: 120 },
    { id: "transactionMode", label: "Transaction Mode", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 120, },
    { id: "credit", label: "Credit", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rows = depositLogsList.map((curDeposit, i) => ({
    id: i + 1,
    transactionDate: curDeposit?.transactionDate || "N/A",
    transactionId: curDeposit?.transactionId || "N/A",
    transactionMode: capitalizeFirstLetter(curDeposit?.transactionMode || "N/A"),
    remark: curDeposit?.remark || "N/A",
    credit: `₹ ${curDeposit?.credit ?? 0}`,
    balance: `₹ ${curDeposit?.balance ?? 0}`,
    status: curDeposit?.status
      ? capitalizeFirstLetter(curDeposit.status)
      : "N/A",
  }));

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Deposit Logs" />
      <DynamicDataTable
        isLoading={isLoading}
        rows={rows}
        columns={columns}
      />
    </>
  );
};

export default DocumentLogs;
