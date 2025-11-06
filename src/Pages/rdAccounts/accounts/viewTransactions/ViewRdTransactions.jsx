import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import { useParams } from "react-router-dom";
import { useGetRdTransactionsQuery } from "../../../../features/api/rdAccounts";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const ViewRdTransactions = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetRdTransactionsQuery( id );

  const allTransactionList = data?.data || [];


  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "Transaction Date", minWidth: 120 },
    { id: "transactionId", label: "Transaction ID", minWidth: 120 },
    { id: "rdAccountNumber", label: "RD Account No.", minWidth: 120 },
    { id: "installmentNumber", label: "Installment No", minWidth: 120 },
    { id: "txnType", label: "Txn Type", minWidth: 100 },
    { id: "credit", label: "Credit", minWidth: 100 },
    { id: "debit", label: "Debit", minWidth: 100 },
    { id: "balance", label: "Balance", minWidth: 100 },
    { id: "paymentMode", label: "Payment Mode", minWidth: 100 },
    { id: "remark", label: "Remark", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const rows = allTransactionList.map((curList, i) => ({
    id: i + 1,
    transactionDate: new Date(curList?.transactionDate).toDateString() || "N/A",
    transactionId: curList?.id || "N/A",
    rdAccountNumber:curList?.rdAccountNumber || "N/A",
    installmentNumber:curList?.installmentNumber || "N/A",
    txnType:curList?.type || "N/A",
     credit: `₹ ${curList?.credit}` || "N/A",
         debit: `₹ ${curList?.debit}` || "N/A",
         balance: `₹ ${curList?.balance}` || "N/A",
    paymentMode:capitalizeFirstLetter(curList?.mode ) || "N/A",
    remark: curList?.remark || "N/A",

   

    status: curList?.status === "Success" ? "Sucess" : "Rejected" || "N/A",
  }));
  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Transaction Details" onDownload onFilter />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </>
  );
};

export default ViewRdTransactions;
