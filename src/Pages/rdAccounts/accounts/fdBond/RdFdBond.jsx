import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { useParams } from "react-router-dom";
import { useFetchRdBondsQuery } from "../../../../features/api/rdAccounts";
import DynamicButton from "../../../../components/DynamicButton";

const RdFdBond = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchRdBondsQuery(id);

  const rdBonds = data?.data || [];

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "rdBondId", label: "RD Bond ID", minWidth: 120 },
    { id: "bondNumber", label: "Bond Number", minWidth: 150 },
    { id: "memberName", label: "Member Name", minWidth: 150 },
    { id: "branchName", label: "Branch Name", minWidth: 150 },
    { id: "issueDate", label: "Issue Date", minWidth: 120 },
    { id: "depositAmount", label: "Deposit Amount", minWidth: 120 },
    { id: "tenureMonths", label: "Tenure (Months)", minWidth: 120 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
    { id: "maturityAmount", label: "Maturity Amount", minWidth: 120 },
    { id: "interestRate", label: "Interest Rate (%)", minWidth: 120 },
    { id: "payoutMode", label: "Payout Mode", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "actions", label: "Action", minWidth: 120 },
  ];

  const rows = rdBonds.map((bond, index) => ({
    id: index + 1,
    rdBondId: bond?.rdBondId || "N/A",
    bondNumber: bond?.bondNumber || "N/A",
    memberName: bond?.memberName || "N/A",
    branchName: bond?.branchName || "N/A",
    issueDate: bond?.issueDate
      ? new Date(bond.issueDate).toLocaleDateString()
      : "N/A",
    depositAmount: bond?.depositAmount || "0.00",
    tenureMonths: bond?.tenureMonths || "0",
    maturityDate: bond?.maturityDate
      ? new Date(bond.maturityDate).toLocaleDateString()
      : "N/A",
    maturityAmount: bond?.maturityAmount || "0.00",
    interestRate: bond?.interestRate || "0",
    payoutMode: bond?.payoutMode || "N/A",
    status: bond?.status || "N/A",
    actions: (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <DynamicButton
          variant="outlined"
          borderColor="#0D6A84"
          textColor="#0D6A84"
          text="View"
        />

        <DynamicButton
          variant="outlined"
          borderColor="#0D6A84"
          textColor="#0D6A84"
          text="Download"
        />
      </div>
    ),
  }));

  return (
    <PagesMainContainerStyle>
      <PageHeader title="RD Bond" paddingBottom="0px" />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </PagesMainContainerStyle>
  );
};

export default RdFdBond;
