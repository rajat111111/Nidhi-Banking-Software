import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { useLazyGetClosedAccountListByAccountNumberQuery } from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { capitalizeFirstLetter } from "../../../helper/helper";

const ClosureApproval = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [triggerGetClosedAccounts, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetClosedAccountListByAccountNumberQuery();

  const listClosedAccounts = data?.data || [];

  // ✅ Search form fields
  const formList = [
    {
      label: "Close ID",
      type:"number",
      placeholder: "Enter Close ID",
      name: "closeAccountId",
      id: "closeAccountId",
    },
    {
      label: "Member Name",
      placeholder: "Enter Member Name",
      type: "text",
      name: "memberName",
      id: "memberName",
    },
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
    },
  ];

  const initialValues = {
    accountNumber: "",
    memberName: "",
    closeAccountId: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    memberName: Yup.string().required("Member name is required"),
    closeAccountId: Yup.number()
          .required("Close ID is required")
          .positive("Close ID must be positive")
          .typeError("Close ID must be a number"),
  });

  // ✅ Handle Search Submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await triggerGetClosedAccounts(values).unwrap();
      if (result?.success || result?.data?.length > 0) {
        setShowDetails(true);
      } else {
        setShowDetails(false);
      }
      resetForm();
    } catch (err) {
      console.error("Error fetching closed accounts:", err);
      setShowDetails(false);
    }
  };

  // ✅ Table columns
  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "closeAccountId", label: "Close ID", minWidth: 180 },
    { id: "memberId", label: "Member Name", minWidth: 180 },
    { id: "branchId", label: "Branch Name", minWidth: 120 },
    { id: "accountNumber", label: "Account No.", minWidth: 150 },
    { id: "accountType", label: "Account Type", minWidth: 120 },
    { id: "releaseAmount", label: "Release Amount", minWidth: 120 },
    { id: "openDate", label: "Open Date", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 120 },
    { id: "closeTxn", label: "Close TXN. Date", minWidth: 140 },
    { id: "closePaymentMode", label: "Close Payment Mode", minWidth: 140 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  // ✅ Table rows
  const rows =
    listClosedAccounts?.map((curList, i) => ({
      id: i + 1,
      closeAccountId: curList?.id || "N/A",
      memberId: curList?.memberName || "N/A",
      branchId: curList?.branchName || "N/A",
      accountNumber: curList?.accountNumber || "N/A",
      accountType: capitalizeFirstLetter(curList?.accountType) || "N/A",
      releaseAmount: `₹ ${curList?.depositAmount }`|| "N/A",
      openDate: curList?.openDate || "N/A",
      remark: curList?.closeRemark || "N/A",
      closeTxn: curList?.closeTransactionDate || "N/A",
      closePaymentMode: capitalizeFirstLetter(curList?.closePaymentMode) || "N/A",
      status: curList?.status==="closed" && <strong style={{color:"#e91212ff"}} >{capitalizeFirstLetter(curList?.status )}</strong> || "N/A",
    })) || [];

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
      {/* 🔹 Search Form */}
      <DynamicForm
        headerTitle="Closure Approval"
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        md={4}
        width="30%"
        texting="Fetching"
        isLoading={isLoading}
      />

      {/* 🔹 Snackbar Alerts */}
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        data={data}
        setSnackbar={setSnackbar}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbar.severity}
          sx={{ width: "100%", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* 🔹 Table Section */}
      {showDetails && (
        <>
          <PageHeader title="Foreclosure Request Letter" />
          <DynamicDataTable rows={rows} columns={columns} />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default ClosureApproval;
