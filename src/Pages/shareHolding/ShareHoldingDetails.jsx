
import PageHeader from "../../components/PageHeader";
import DynamicDataTable from "../../components/DynamicTable";
import { styled } from "@mui/material/styles";

import DynamicButton from "../../components/DynamicButton";
import { Button } from "@mui/material";

const StatusButton = styled(Button)(({ status }) => ({
    borderRadius: "50px",
    backgroundColor: status === "enable" ? "#DBE9ED" : "#FFD8D8",
    color: status === "enable" ? "#0D6A84" : "#C90303",
    padding: "2px 20px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
        backgroundColor: status === "enable" ? "#0D6A84" : "#C90303",
        color: "#fff",
    },
}));



const ActionButtonContainer=styled("div")({
  display:"flex",
  gap:"10px",
  alignItems:"center"
})


const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "member", label: "Member", minWidth: 120 },
    { id: "shareRange", label: "Share Range", minWidth: 120 },
    { id: "shareHeld", label: "Total Share Held", minWidth: 150 },
    { id: "normalVal", label: "Nominal Val", minWidth: 120, },
    { id: "allotmentDate", label: "Allotment Date", minWidth: 180,  },
    { id: "transferDate", label: "Transfer Date", minWidth: 180,  },
    { id: "folioNumber", label: "Folio Number", minWidth: 180, },
    { id: "type", label: "Type", minWidth: 180,  },
    { id: "certNumber", label: "Cert Number", minWidth: 180,  },
    { id: "surrendered", label: "Surrendered", minWidth: 180, },
    { id: "status", label: "Status", minWidth: 180,  },
    { id: "action", label: "Actions", minWidth: 180, align: "center" },
];

// Static Rows
const rows = [
    {
        id: 1,
        firstName: "Renuka",
        lastName: "Sharma",
        promoterNumber: "#002365478",
        status: <StatusButton status="enable">Active</StatusButton>,
        action: (
           <ActionButtonContainer>
            <DynamicButton text="SH-1" variant='outlined' textColor="#0D6A84"  borderColor="#0D6A84" borderRadius="5px" />
            <DynamicButton text="SH-4" variant='outlined' textColor="#7858C6"  borderColor="#7858C6" borderRadius="5px" />
            <DynamicButton text="View" variant='outlined' textColor="#0D6A84"  borderColor="#0D6A84" borderRadius="5px" />
            <DynamicButton text="Delete" variant='outlined' textColor="#C90303"  borderColor="#C90303" borderRadius="5px" />
           </ActionButtonContainer>
        ),
    },
   
];



const ShareHoldingDetails = () => {


  return (
    <>
      <PageHeader
        title="Share Holding Details"
        onFilter
        onDownload
        primaryButton={{
          label: "Add New",
          variant: "contained",

          color: "secondary",

          onClick: () => navigate("/members/add-share-holding"),
        }}
        extraButtons={[
          {
            label: "Manual Share Allocation",
          },
          {
            label: "Unallotted Shares",
          },
          {
            label: "Manual Share Transfer",
          },
        ]}
      />
      <DynamicDataTable rows={rows} columns={columns}/>
    </>
  );
};

export default ShareHoldingDetails;


