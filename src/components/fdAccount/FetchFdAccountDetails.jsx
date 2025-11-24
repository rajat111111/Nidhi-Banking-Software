import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import DynamicForm from "../DynamicForm";
import PagesMainContainerStyle from "../PagesMainContainerStyle";
import DynamicDataTable from "../DynamicTable";
import ErrorAndSuccessUseEffect from "../ErrorAndSuccessUseEffect";
import { useLazyFetchFdAccontStatementsByFdAccountQuery } from "../../features/api/fdAccounts";

const FetchFdAccountDetails = ({ setShowDetails, showDetails, title,accntNumberLabel }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    triggerGetFdDetails,
    { data, isLoading, isError, isSuccess, error },
  ] = useLazyFetchFdAccontStatementsByFdAccountQuery();

  const details = data?.data || {};

  // Store accountNumber only when showDetails is true
  useEffect(() => {
    if (showDetails && details?.savingAccountNo) {
      localStorage.setItem("accountNumber", details.savingAccountNo);
    } else {
      localStorage.removeItem("accountNumber");
    }
  }, [showDetails, details]);

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  //  Form Fields
  const formList = [
    {
      label:"FD Account Number",
      placeholder: "Enter FD Account Number",
      name: "accountNumber",
      id: "accountNumber",
    },
    {
      label: "Member Name",
      placeholder: "Enter Name",
      type: "text",
      name: "memberName",
      id: "memberName",
    },
  ];

  // Table Columns & Rows
  const columns1 = [
    { id: "accountNo", label:"FD Account No.", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "branchName", label: "Branch Name", minWidth: 120 },
    { id: "availableBalance", label: "Available Balance (₹)", minWidth: 120 },
  ];



  const rows1 = [
    {
      accountNo: details?.accountNumber || "N/A",
      memberName: details?.memberName || "N/A",
      branchName: details?.branchName || "N/A",
      availableBalance: details?.availableBalance
        ? `₹ ${details.availableBalance}`
        : "N/A",
    },
  ];

  // Initial Values
  const initialValues = {
    accountNumber: "",
    memberName: "",
  };

  // Validation
  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    // memberName: Yup.string()
    //   .required("Member name is required")
    //   .matches(/^[A-Za-z\s]+$/, "Customer name must only contain letters"),
  });

  // Submit Handler
  const handleSubmit = async (values, { resetForm }) => {
    const { accountNumber, memberName } = values;
    setShowDetails(false); 

    try {
      const result = await triggerGetFdDetails({
        accountNumber,
        memberName,
      }).unwrap();


      if (result?.success || result?.data) {
        setShowDetails(true);
        resetForm();
      } else {
        setShowDetails(false);
      }
    } catch (err) {
      console.error("Error fetching account details:", err);
      setShowDetails(false);
    }
  };

  return (
    <PagesMainContainerStyle>
      {/* 🔹 Account Search Form */}
      <DynamicForm
        headerTitle={title}
        formList={formList}
        initialValues={initialValues}
        validationSchema={validationSchema}
        actionButtonText="Show Details"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        texting="Searching"
      />

      {/* 🔹 Details Table */}
      {showDetails && <DynamicDataTable rows={rows1} columns={columns1} />}

      {/* Snackbar Notifications */}
      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        data={data}
        error={error}
        setSnackbar={setSnackbar}
      />

      {snackbar && (
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
      )}
    </PagesMainContainerStyle>
  );
};

export default FetchFdAccountDetails;
