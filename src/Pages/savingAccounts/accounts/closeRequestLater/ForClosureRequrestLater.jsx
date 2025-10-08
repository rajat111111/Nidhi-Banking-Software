import React from "react";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";

const ForClosureRequrestLater = () => {
  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "formName", label: "Close ID", minWidth: 180 },
    { id: "description", label: "Member ID", minWidth: 220 },
    { id: "format", label: "Branch ID ", minWidth: 120 },
    { id: "action", label: "Account No.", minWidth: 150 },
    { id: "format", label: "Account Type", minWidth: 120 },
    { id: "format", label: "Release Amount ", minWidth: 120 },
    { id: "format", label: "Open Date ", minWidth: 120 },
    { id: "format", label: "Remark", minWidth: 120 },
    { id: "format", label: "Close TXN. Date ", minWidth: 120 },
    { id: "format", label: "Close Payment Mode ", minWidth: 120 },
    { id: "format", label: "Status ", minWidth: 130 },
    { id: "format", label: "Action ", minWidth: 150 },

  ];

  const rows = [];
  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader title="Foreclosure Request Letter" />
      <DynamicDataTable rows={rows} columns={columns} />
    </>
  );
};

export default ForClosureRequrestLater;
