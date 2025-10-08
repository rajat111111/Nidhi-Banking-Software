import React from 'react'
import PagesMainContainerStyle from '../../../../components/PagesMainContainerStyle'
import PageHeader from '../../../../components/PageHeader'
import DynamicDataTable from '../../../../components/DynamicTable'

const ApplicationForm = () => {

      const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "formName", label: "Form Name", minWidth: 180 },
    { id: "description", label:"Description", minWidth: 220 },
    { id: "format", label: "Format ", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 150 },

  ];

  const rows=[]
  return (
    <>
    <PagesMainContainerStyle/>
    <PageHeader title="Application Form" />
    <DynamicDataTable rows={rows} columns={columns} />
    </>
  )
}

export default ApplicationForm