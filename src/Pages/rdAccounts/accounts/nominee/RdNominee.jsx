import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { NavLink, useParams } from "react-router-dom";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton, styled } from "@mui/material";
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useGetRdNomineesQuery } from "../../../../features/api/rdAccounts";

const ActionButtonContainer=styled("div")({
  width:"100%",
  display:"flex",
  alignItems:"center",
  gap:"6px"

})

const RdNominee = ({ setActiveTab }) => {
  const { id } = useParams();
  const { isLoading, data } = useGetRdNomineesQuery(id);



  const nomineeDetails = data?.data || [];

  const {
    name,
    relation,
    mobile,
    aadharNumber,
    voterId,
    panNumber,
    rationCardNumber,
    address,
  } = nomineeDetails;

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "nomineeName", label: "Nominee Name", minWidth: 120 },
    { id: "relation", label: "Relation", minWidth: 120 },
    { id: "mobileNumber", label: "Mobile Number", minWidth: 120 },
    { id: "aadharNumber", label: "Aadhar Number", minWidth: 180 },
    { id: "panNumber", label: "PAN Number", minWidth: 180 },
    { id: "voterId", label: "Voter ID", minWidth: 180 },
    { id: "rationCard", label: "Ration Card", minWidth: 180 },
    { id: "address", label: "Address", minWidth: 250 },
    { id: "action", label: "Action", minWidth: 120 },
  ];

  // ✅ Sample Data
  const rows = nomineeDetails && nomineeDetails.map((curNominee,i)=>({
       
      id: 1,
      nomineeName: curNominee?.name || 'N/A',
      relation:curNominee?.relation || "N/A",
      mobileNumber: curNominee?.mobile || "N/A" ,
      aadharNumber: curNominee?.aadharNumber || "N/A",
      panNumber: curNominee?.panNumber || "N/A",
      voterId: curNominee?.voterId || "N/A",

      rationCard: curNominee?.rationCardNumber || "N/A",
      address: curNominee?.address || "N/A",
      action: (

        <ActionButtonContainer>
          <IconButton>
            <VisibilityOutlinedIcon sx={{color:"#7858C6"}}/>
          </IconButton>
          <IconButton>
<ColorizeOutlinedIcon sx={{color:"#7858C6"}}/>
          </IconButton>
          <IconButton>
<DeleteOutlineOutlinedIcon sx={{color:"#C90303"}} />
          </IconButton  >
        </ActionButtonContainer>
      ),
    
  }))
  // const key1 = ["Nominee Name", "Relation", "Mobile Number", "Aadhar Number"];

  // const key2 = ["Pan Number", "Voter ID", "Ration Card", "Address"];

  // const pair1 = [
  //   nomineeName || "N/A",
  //   nomineeRelation || "N/A",
  //   nomineeMobile || "N/A",
  //   nomineeAadhar || "N/A",
  // ];

  // const pair2 = [
  //   nomineePan || "N/A",
  //   nomineeVoterId || "N/A",
  //   nomineeRationCard || "N/A",
  //   nomineeAddress || "N/A",
  // ];

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader
        title="Nominee Details"
        primaryButton={{
          label: nomineeDetails.length>0? "Update Nominee" : "Add Nominee",
          variant: "contained",
          component: { NavLink },
          to:
          nomineeDetails.length>0
              ? `/rd-accounts/${id}/update-nominee`
              : `/rd-accounts/${id}/add-nominee`,
        }}
      />
      <DynamicDataTable isLoading={isLoading} rows={rows} columns={columns} />
      {/* {isLoading ? (
        <PageLoader />
      ) : (
        <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
      )} */}
    </>
  );
};

export default RdNominee;
