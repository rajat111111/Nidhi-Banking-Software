import React, { useState } from "react";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageTopContent from "../../../components/PageTopContent";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import DynamicDataTable from "../../../components/DynamicTable";

const ChangeRdAccountType = () => {
  const [details, setDetails] = useState(true);
  const formList = [
    {
      label: "Member Name",
      name: "memberName",
      placeholder: "Enter Member Name",
    },
    {
      label: "RD Account Number",
      name: "accountNumber",
      placeholder: "Enter RD Account Number",
    },
  ];

  const initialValues = {
    memberName: "",
    accountNumber: "",
  };

  const validationSchema = Yup.object({
    memberName: Yup.string().required("Member Name is required"),
    accountNumber: Yup.string().required("Account Number is required"),
  });
  const joinAccountFormList = [
    {
      label: "Joint Account",
      name: "jointAccount",
      type: "switch",
    },
    {
      label: "Joint Member ID",
      name: "jointMemberId",
      type: "select",
    },
  ];

  const joinAccountInitialValues = {
    memberName: "",
    accountNumber: "",
  };

  const joinAccountValidationSchema = Yup.object({
    memberName: Yup.string().required("Member Name is required"),
    accountNumber: Yup.string().required("Account Number is required"),
  });

  const rows = [];

  const columns = [
    {
      id: "id",
      label: "S.No.",
      minWidth: 50,
    },
    {
      id: "accountNumber",
      label: "RD Account No.",
      minWidth: 50,
    },
    {
      id: "memberName",
      label: "Member Name",
      minWidth: 50,
    },
    {
      id: "branchName",
      label: "Branch Name",
      minWidth: 50,
    },
    {
      id: "balance",
      label: "Available Balance (₹)",
      minWidth: 50,
    },
  ];

  return (
    <PagesMainContainerStyle>
      <PageTopContent title="Change Account Type" />
      <DynamicForm
        actionButtonText="Show Details"
        texting="Showing"
        validationSchema={validationSchema}
        initialValues={initialValues}
        formList={formList}
      />

      {details && (
        <>
          <DynamicDataTable rows={rows} columns={columns} />
          <DynamicForm
            width="50%"
            actionButtonText="Upgrade"
            texting="Upgrading"
            formList={joinAccountFormList}
            validationSchema={joinAccountValidationSchema}
            initialValues={joinAccountInitialValues}
          />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default ChangeRdAccountType;
