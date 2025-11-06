import React from 'react'
import PagesMainContainerStyle from '../../../../components/PagesMainContainerStyle'
import PageHeader from '../../../../components/PageHeader'
import DynamicDataTable from '../../../../components/DynamicTable'

const RdFdBond = () => {

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "bondId", label: "Bond ID", minWidth: 120 },
    { id: "rdAccountNumber", label: "RD Account No.", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "branch", label: "Branch", minWidth: 120 },
    { id: "issueDate", label: "Issue Date", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "fdStartDate", label: "RD Start Date", minWidth: 100 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 100 },
    { id: "interestRate", label: "Interest Rate (%)", minWidth: 100 },
    { id: "payoutMode", label: "Payout Mode", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const rows=[]

  return (
    
    <PagesMainContainerStyle>
      <PageHeader onFilter title="FD Bond" paddingBottom="0px" />
        <DynamicDataTable rows={rows} columns={columns} />
    </PagesMainContainerStyle>
    
  )
}

export default RdFdBond