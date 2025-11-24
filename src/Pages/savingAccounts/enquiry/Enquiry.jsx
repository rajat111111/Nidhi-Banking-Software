import React, { useState } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const Enquiry = () => {
  const [setshowDetails, setSetshowDetails] = useState(false);
  const formList = [
    {
      label: "Enquiry ID",
      placeholder: "Enter Enquiry ID",

      name: "enquiryId",
      id: "enquiryId",
    },
    {
      label: "Customer Name",
      placeholder: "Enter Name",
      type: "text",
      name: "customerName",
      id: "customerName",
    },
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      type: "number",
      name: "accountNumber",
      id: "accountNumber",
    },
  ];

  const initialValues = {
    accountNumber: "",
    customerName: "",
    enquiryId: "",
  };

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "enquiryID", label: "Enquiry ID", minWidth: 120 },
    { id: "customerName", label: "Customer Name", minWidth: 150 },
    { id: "accountNo", label: "Account No.", minWidth: 120 },
    { id: "enquiryType", label: "Enquiry Type", minWidth: 120 },
    { id: "priority", label: "Priority", minWidth: 120 },
    { id: "dateCreated", label: "Date Created", minWidth: 120 },
    { id: "assign", label: "Assign", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
  ];

  const rows = [];

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    customerName: Yup.string().required("Customer name is required"),
    enquiryId: Yup.string().required("Enquiry ID is required"),
  });

  const handleSubmit = (values) => {
    setSetshowDetails(true);
  };

  return (
    <PagesMainContainerStyle>
      <DynamicForm
        headerTitle="Enquiry Details"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        md={4}
        width="30%"
      />
      {setshowDetails && (
        <>
          <PageHeader
            title="Enquiry Details"
            extraButtons={[
              {
                label: "Assign",
                variant: "text",
                textColor: "#8F8F8F",
                startIcon: (
                  <BrowserUpdatedOutlinedIcon
                    sx={{ color: "#7858C6", fontSize: "17px" }}
                  />
                ),
              },
              {
                label: "View",
                variant: "text",
                textColor: "#8F8F8F",
                startIcon: (
                  <VisibilityOutlinedIcon
                    sx={{ color: "#7858C6", fontSize: "17px" }}
                  />
                ),
              },
              {
                label: "Update",
                variant: "text",
                textColor: "#8F8F8F",
                startIcon: (
                  <CachedOutlinedIcon
                    sx={{ color: "#7858C6", fontSize: "17px" }}
                  />
                ),
              },
              {
                label: "Close",
                variant: "text",
                textColor: "#8F8F8F",
                startIcon: (
                  <BackspaceOutlinedIcon
                    sx={{ color: "#C90303", fontSize: "17px" }}
                  />
                ),
              },
            ]}
          />
          <DynamicDataTable rows={rows} columns={columns} />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default Enquiry;
