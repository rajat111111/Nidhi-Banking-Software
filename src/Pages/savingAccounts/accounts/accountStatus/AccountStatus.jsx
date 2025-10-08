import React from 'react'
import PagesMainContainerStyle from '../../../../components/PagesMainContainerStyle'
import PageHeader from '../../../../components/PageHeader'
import DynamicDataTable from '../../../../components/DynamicTable'

const AccountStatus = () => {

      const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "accountHolderName", label: "Account Holder Name", minWidth: 150 },
    { id: "accountNumber", label:"Account Number", minWidth: 120 },
    { id: "balance", label: "Minimum Balance", minWidth: 120 },
    { id: "status", label: "Account Status", minWidth: 120 },

  ];

  const rows=[]
  return (
    <>
    <PagesMainContainerStyle/>
    <PageHeader title="Account Status" />
    <DynamicDataTable rows={rows} columns={columns} />
    </>
  )
}

export default AccountStatus