import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { useGetFdBondsQuery } from "../../../../features/api/fdAccounts";
import { useParams } from "react-router-dom";
import DynamicButton from "../../../../components/DynamicButton";
import { capitalizeFirstLetter } from "../../../../helper/helper";

const FdBond = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFdBondsQuery(id);

  // FIX: data?.data is an array, so take the first item
  const fd = Array.isArray(data?.data) && data.data.length > 0 ? data.data[0] : null;

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isNaN(d) ? "N/A" : d.toLocaleDateString();
  };

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "bondId", label: "Bond ID", minWidth: 120 },
    { id: "memberNumber", label: "Member No", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 150 },
    { id: "branch", label: "Branch", minWidth: 150 },
    { id: "issueDate", label: "Issue Date", minWidth: 120 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "fdStartDate", label: "FD Start Date", minWidth: 120 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
    { id: "interestRate", label: "Interest Rate (%)", minWidth: 120 },
    { id: "payoutMode", label: "Payout Mode", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  const rows = fd
    ? [
        {
          id: 1,
          bondId: fd.fdId || "N/A",
          memberNumber: fd.memberNo || "N/A",
          memberName: fd.memberName || "N/A",
          branch: fd.branch || "N/A",
          issueDate: formatDate(fd.issueDate),
          amount: fd.amount ? `₹ ${fd.amount}` : "N/A",
          fdStartDate: formatDate(fd.fdStartDate),
          maturityDate: formatDate(fd.maturityDate),
          interestRate: fd.interestRate || "N/A",
          payoutMode: capitalizeFirstLetter(fd.payoutMode) || "N/A",
          status: fd.status ? capitalizeFirstLetter(fd.status) : "N/A",
          action: (
            <div style={{ display: "flex", gap: "15px" }}>
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
        },
      ]
    : [];

  return (
    <PagesMainContainerStyle>
      <PageHeader onFilter title="FD Bond" paddingBottom="0px" />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
    </PagesMainContainerStyle>
  );
};

export default FdBond;
