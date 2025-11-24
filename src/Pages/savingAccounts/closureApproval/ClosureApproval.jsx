import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import {
  useApproveClosureSavingAccountMutation,
  useLazyGetClosedAccountListByAccountNumberQuery,
} from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { capitalizeFirstLetter } from "../../../helper/helper";
import DynamicButton from "../../../components/DynamicButton";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";

const ClosureApproval = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    triggerGetClosedAccounts,
    { data, isLoading, isError, error, isSuccess },
  ] = useLazyGetClosedAccountListByAccountNumberQuery();

  const listClosedAccounts = data?.data || [];

  const [
    approveClosureSavingAccount,
    {
      data: approveClosureAccntData,
      isError: approveClosureAccntIsError,
      isLoading: approveClosureAccntLoading,
      error: approveClosureAccntError,
      isSuccess: approveClosureAccntSuccess,
    },
  ] = useApproveClosureSavingAccountMutation();

  const formList = [
    {
      label: "Close ID",
      type: "number",
      placeholder: "Enter Close ID",
      name: "closureApprovalId",
      id: "closureApprovalId",
    },
    {
      label: "Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
    },
    {
      label: "Member Name",
      placeholder: "Enter Member Name",
      type: "text",
      name: "memberName",
      id: "memberName",
    },
  ];

  const initialValues = {
    accountNumber: "",
    memberName: "",
    closureApprovalId: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    closureApprovalId: Yup.number()
      .required("Close ID is required")
      .positive("Close ID must be positive")
      .typeError("Close ID must be a number"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await triggerGetClosedAccounts(values).unwrap();
      if (result?.success || result?.data?.length > 0) {
        setShowDetails(true);
        resetForm();
      } else {
        setShowDetails(false);
      }
    } catch (err) {
      console.error("Error fetching closed accounts:", err);
      setShowDetails(false);
    }
  };

  const handleApproveClosure = async (id) => {
    console.log("id");
    try {
      await approveClosureSavingAccount(id).unwrap();
    } catch (err) {
      console.error("Error approving closure:", err);
    }
  };

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "closureApprovalId", label: "Close ID", minWidth: 120 },
    { id: "memberId", label: "Member Name", minWidth: 180 },
    { id: "branchId", label: "Branch Name", minWidth: 150 },
    { id: "accountNumber", label: "Account No.", minWidth: 150 },
    { id: "accountType", label: "Account Type", minWidth: 120 },
    { id: "releaseAmount", label: "Release Amount", minWidth: 140 },
    { id: "openDate", label: "Open Date", minWidth: 120 },
    { id: "remark", label: "Remark", minWidth: 120 },
    { id: "closeTxn", label: "Close TXN Date", minWidth: 150 },
    { id: "closePaymentMode", label: "Close Payment Mode", minWidth: 140 },
    { id: "status", label: "Status", minWidth: 140 },
    { id: "action", label: "Action", minWidth: 140 },
  ];

  const rows =
    listClosedAccounts?.map((curList, i) => ({
      id: i + 1,
      closureApprovalId: curList?.id || "N/A",
      memberId: curList?.memberName || "N/A",
      branchId: curList?.branchName || "N/A",
      accountNumber: curList?.accountNumber || "N/A",
      accountType: capitalizeFirstLetter(curList?.accountType) || "N/A",
      releaseAmount: curList?.depositAmount
        ? `₹ ${Number(curList.depositAmount).toLocaleString("en-IN")}`
        : "N/A",
      openDate: curList?.openDate || "N/A",
      remark: curList?.closeRemark || "N/A",
      closeTxn: curList?.closeTransactionDate || "N/A",
      closePaymentMode:
        capitalizeFirstLetter(curList?.closePaymentMode) || "N/A",
      status:
        curList?.status === "closed" ? (
          <strong style={{ color: "#e91212ff" }}>Saving Account Closed</strong>
        ) : curList?.status === "Closure_Approval" ? (
          <strong style={{ color: "#d86733ff" }}>Pending Approval</strong>
        ) : (
          <strong style={{ color: "#0D6A84" }}>
            {capitalizeFirstLetter(curList?.status || "N/A")}
          </strong>
        ),
      action:
        curList?.status === "Closure_Approval" ? (
          <DynamicButton
            text={
              <SubmitButtonLoader
                isLoading={approveClosureAccntLoading}
                text="Approve"
                loaderColor="#0D6A84"
                texting="Please Wait "
              />
            }
            variant="outlined"
            borderColor="#0D6A84"
            textColor="#0D6A84"
            // texting="Approving"
            // isLoading={approveClosureAccntLoading}
            onClick={() => handleApproveClosure(curList?.id)}
          />
        ) : (
          <DynamicButton
            text="View"
            variant="outlined"
            borderColor="#0D6A84"
            textColor="#0D6A84"
          />
        ),
    })) || [];

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <PagesMainContainerStyle>
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

      <ErrorAndSuccessUseEffect
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        data={data}
        setSnackbar={setSnackbar}
      />
      <ErrorAndSuccessUseEffect
        isError={approveClosureAccntIsError}
        isSuccess={approveClosureAccntSuccess}
        error={approveClosureAccntError}
        data={approveClosureAccntData}
        setSnackbar={setSnackbar}
        whereToNavigate="/saving-accounts"
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
