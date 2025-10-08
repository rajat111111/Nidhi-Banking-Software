import React, { useState } from "react";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import DynamicDataTable from "../../../components/DynamicTable";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import FormLabel from "../../../components/FormLabel";
import { styled } from "@mui/material";

const Statement = () => {
  const [setshowDetails, setSetshowDetails] = useState(false);
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
  };

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "transactionDate", label: "TransactionDate", minWidth: 120 },
    { id: "transactionID", label: "Transaction ID", minWidth: 150 },
    { id: "payMode", label: "Pay Mode", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 120 },
    { id: "debit", label: "Debit", minWidth: 120 },
    { id: "credit", label: "Credit", minWidth: 120 },
    { id: "balance", label: "Balance", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rows = [];


    const columns1 = [
    { id: "savingAccountNo", label: "Saving Account No.", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "branchName", label: "Branch Name", minWidth: 120 },
    { id: "availableBalance", label: "Available Balance (₹)", minWidth: 120 },
  ];

  const rows1 = [];

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    customerName: Yup.string().required("Customer name is required"),
  });

  const handleSubmit = (values) => {
    setSetshowDetails(true);
  };

  return (
    <PagesMainContainerStyle>
      <DynamicForm
        headerTitle="Statement Details"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
      />
      {setshowDetails && (
        <>
          <DynamicDataTable rows={rows1} columns={columns1} />
          <FilterByDate>
           <FormContent>
             <FormLabel label="From Date" />
            <input type="date" name="" id="" />
           </FormContent>
           <FormContent>
             <FormLabel label="To Date" />
            <input type="date" name="" id="" />
           </FormContent>
          </FilterByDate>
          <PageHeader
            title="Deposit Money"
            borderBottom="1px solid #DDDDEBBF"
            extraButtons={[
              {
                label: "🖨 Print Passbook",
              },
              {
                label: "⬇  Download PDF",
              },
            ]}
          />
          <DynamicDataTable rows={rows} columns={columns} />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default Statement;

const FilterByDate=styled("div")({
    width:"100%",
    height:"auto",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    gap:"20px"
})
const FormContent=styled("div")({
    width:"100%",
    height:"auto",
        display:"flex",
        flexDirection:"column",
    gap:"15px"
})
