import React from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { useGetFdDepositLogsQuery } from "../../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const FdDocumentLogs = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFdDepositLogsQuery({ id });
  const fdDepositLogs = data?.transactions || [];
 
  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
    { id: "transactionId", label: "Transaction ID", minWidth: 120 },
    { id: "transactionMode", label: "Transaction Mode", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 180, alignItems: "center" },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 100 },
    { id: "balance", label: "Balance", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const rows =
    fdDepositLogs &&
    fdDepositLogs.map((curDeposit, i) => ({
      id: i + 1,
      transactionDate:
        new Date(curDeposit?.transactionDate).toLocaleDateString() || "N/A",
      transactionId: curDeposit?.transactionId || "N/A",
      transactionMode:
        capitalizeFirstLetter(curDeposit?.transactionMode) || "N/A",
      remark: curDeposit?.remark || "N/A",
      depositAmount: `₹ ${curDeposit?.credit || `0`}`,
      balance: `₹ ${curDeposit?.balance || `0`}`,
      status: capitalizeFirstLetter(curDeposit?.status) || "N/A",
    }));

  return (
    <PagesMainContainerStyle>
      <PageHeader onFilter title="FD Bond" paddingBottom="0px" />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </PagesMainContainerStyle>
  );
};

export default FdDocumentLogs;
