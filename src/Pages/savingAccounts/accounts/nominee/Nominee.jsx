import PageHeader from "../../../../components/PageHeader";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PagesMainContainerStyle from "../../../../components/PagesMainContainerStyle";
import InformationPage from "../../../../components/InformationPage";
import { useGetNomineeDetailsQuery } from "../../../../features/api/savingAccounts";
import PageLoader from "../../../../components/PageLoader";

const Nominee = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = useGetNomineeDetailsQuery(id);

  const nomineeDetails = data?.data || {};

  const {
    nomineeName,
    nomineeRelation,
    nomineeMobile,
    nomineeAadhar,
    nomineeVoterId,
    nomineePan,
    nomineeRationCard,
    nomineeAddress,
  } = nomineeDetails;

  // const columns = [
  //   { id: "id", label: "#", minWidth: 50 },
  //   { id: "nomineeName", label: "Nominee Name", minWidth: 120 },
  //   { id: "relation", label: "Relation", minWidth: 120 },
  //   { id: "mobileNumber", label: "Mobile Number", minWidth: 120 },
  //   { id: "aadharNumber", label: "Aadhar Number", minWidth: 180 },
  //   { id: "panNumber", label: "PAN Number", minWidth: 180 },
  //   { id: "voterId", label: "Voter ID", minWidth: 180 },
  //   { id: "rationCard", label: "Ration Card", minWidth: 180 },
  //   { id: "address", label: "Address", minWidth: 250 },
  //   { id: "action", label: "Action", minWidth: 120 },
  // ];

  // // ✅ Sample Data
  // const rows = [
  //   {
  //     id: 1,
  //     nomineeName: "Ramesh Kumar",
  //     relation: "Father",
  //     mobileNumber: "9876543210",
  //     aadharNumber: "1234 5678 9012",
  //     panNumber: "ABCDE1234F",
  //     voterId: "DL/2025/123456",
  //     rationCard: "RC-78541",
  //     address: "12, Green Park, Delhi - 110016",
  //     action: "Edit | Delete",
  //   },
  //   {
  //     id: 2,
  //     nomineeName: "Suresh Singh",
  //     relation: "Brother",
  //     mobileNumber: "9876501234",
  //     aadharNumber: "5678 9012 3456",
  //     panNumber: "PQRSX5678Z",
  //     voterId: "DL/2025/654321",
  //     rationCard: "RC-98432",
  //     address: "45, Model Town, Delhi - 110009",
  //     action: "Edit | Delete",
  //   },
  //   {
  //     id: 3,
  //     nomineeName: "Anita Sharma",
  //     relation: "Mother",
  //     mobileNumber: "9876123450",
  //     aadharNumber: "3456 7890 1234",
  //     panNumber: "LMNOP3456T",
  //     voterId: "DL/2025/432156",
  //     rationCard: "RC-67854",
  //     address: "10, Patel Nagar, Delhi - 110008",
  //     action: "Edit | Delete",
  //   },
  //   {
  //     id: 4,
  //     nomineeName: "Vikram Patel",
  //     relation: "Spouse",
  //     mobileNumber: "9876001122",
  //     aadharNumber: "7890 1234 5678",
  //     panNumber: "RTYUI7890Q",
  //     voterId: "DL/2025/987654",
  //     rationCard: "RC-34567",
  //     address: "27, Lajpat Nagar, Delhi - 110024",
  //     action: "Edit | Delete",
  //   },
  // ];

  const key1 = ["Nominee Name", "Relation", "Mobile Number", "Aadhar Number"];

  const key2 = ["Pan Number", "Voter ID", "Ration Card", "Address"];

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
          label: data?.statusCode === 200 ? "Update Nominee" : "Add Nominee",
          variant: "contained",
          component: { NavLink },
          to:
            data?.statusCode === 200
              ? `/saving-accounts/${id}/update-nominee`
              : `/saving-accounts/${id}/add-nominee`,
        }}
      />
      {/* <DynamicDataTable rows={rows} columns={columns} /> */}
      {isLoading ? (
        <PageLoader />
      ) : (
        <InformationPage key1={key1} pair1={pair1} key2={key2} pair2={pair2} />
      )}
    </>
  );
};

export default Nominee;
