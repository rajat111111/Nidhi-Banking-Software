import PageHeader from "../../../../components/PageHeader";
import DynamicDataTable from "../../../../components/DynamicTable";
import { NavLink, useParams } from "react-router-dom";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, styled } from "@mui/material";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  useGetBasicFdAccountDetailsQuery,
  useGetSingleUserFdNonineeDetailsQuery,
} from "../../../../features/api/fdAccounts";

const ActionButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const FdNominee = () => {
  const { id } = useParams();
  const { data: basicFdDetails } = useGetBasicFdAccountDetailsQuery({ id });
  const memberId = basicFdDetails?.data?.memberNo;
  const { isLoading, data } = useGetSingleUserFdNonineeDetailsQuery({ id });

  const nomineeDeatails = data?.data || {};
  const {
    nomineeName,
    nomineeRelation,
    nomineeMobile,
    nomineeAadhar,
    nomineeVoterId,
    nomineePan,
    nomineeRationCard,
    nomineeAddress,
  } = nomineeDeatails;

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

  const rows = [
    {
      id: 1,
      nomineeName: nomineeDeatails?.nomineeName || "N/A",
      relation: nomineeDeatails?.nomineeRelation || "N/A",
      mobileNumber: nomineeDeatails?.nomineeMobile || "N/A",
      aadharNumber: nomineeDeatails?.nomineeAadhar || "N/A",
      panNumber: nomineeDeatails?.nomineePan || "N/A",
      voterId: nomineeDeatails?.nomineeVoterId || "N/A",
      rationCard: nomineeDeatails?.nomineeRationCard || "N/A",
      address: nomineeDeatails?.nomineeAddress || "N/A",
      action: (
        <ActionButtonContainer>
          <IconButton>
            <VisibilityOutlinedIcon sx={{ color: "#7858C6" }} />
          </IconButton>
          <IconButton
            component={NavLink}
            to={`/fd-accounts/${id}/update-nominee`}
          >
            <ColorizeOutlinedIcon sx={{ color: "#7858C6" }} />
          </IconButton>
          <IconButton>
            <DeleteOutlineOutlinedIcon sx={{ color: "#C90303" }} />
          </IconButton>
        </ActionButtonContainer>
      ),
    },
  ];

  // const key1 = ["Nominee Name", "Relation", "Mobile Number", "Aadhar Number"];

  // const key2 = ["Pan Number", "Voter ID", "Ration Card", "Address"];

  const pair1 = [
    nomineeName || "N/A",
    nomineeRelation || "N/A",
    nomineeMobile || "N/A",
    nomineeAadhar || "N/A",
  ];

  const pair2 = [
    nomineePan || "N/A",
    nomineeVoterId || "N/A",
    nomineeRationCard || "N/A",
    nomineeAddress || "N/A",
  ];

  return (
    <>
      <PagesMainContainerStyle />
      <PageHeader
        title="Nominee Details"
        primaryButton={{
          label: "Add Nominee",
          variant: "contained",
          component: { NavLink },
          to: `/fd-accounts/${nomineeDeatails?.fdAccountId}/add-nominee`,
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

export default FdNominee;
