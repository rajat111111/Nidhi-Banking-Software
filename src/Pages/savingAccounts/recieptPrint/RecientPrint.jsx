import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import ForClosureRequrestLater from "../accounts/closeRequestLater/ForClosureRequrestLater";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";

const RecieptPrint = () => {
  const [setshowDetails, setSetshowDetails] = useState(true);
  const formList = [
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      type: "number",
      name: "accountNumber",
      id: "accountNumber",
    },

    {
      label: "Customer Name",
      placeholder: "Enter Name",
      type: "text",
      name: "customerName",
      id: "customerName",
    },
  ];

  const initialValues = {
    accountNumber: "",
    customerName: "",
    closeId: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    customerName: Yup.string().required("Customer name is required"),
    closeId: Yup.string().required("Close ID is required"),
  });

  const handleSubmit = (values) => {
    setSetshowDetails(true);
  };

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "receiptId", label: "Receipt ID", minWidth: 120 },
    { id: "memberId", label: "Member ID", minWidth: 150 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "accountNo", label: "Account No.", minWidth: 120 },
    { id: "accountType", label: "Account Type", minWidth: 120 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "mode", label: "Mode", minWidth: 120 },
    { id: "receiptDate", label: "Receipt Date", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
  ];

  const rows = [];
  return (
    <PagesMainContainerStyle>
      <DynamicForm
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
      />
      {setshowDetails && (
        <>
          <PageHeader
            title="Receipt Print"
            primaryButton={{ label: "Create Receipt",to:"/saving-accounts/create-receipt" }}
          />
          <DynamicDataTable rows={rows} columns={columns} />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default RecieptPrint;
