import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { capitalizeFirstLetter } from "../../../helper/helper";
import { useApproveClosureRdAccountMutation, useFetchRdClosedAcntByFdAcntNoAndMemberNameMutation } from "../../../features/api/rdAccounts";
import SubmitButtonLoader from "../../../components/SubmitButtonLoader";
import DynamicButton from "../../../components/DynamicButton";

const RdClosureApproval = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [
    fetchRdClosedAcntByFdAcntNoAndMemberName,
    { data, isLoading, isError, error, isSuccess },
  ] = useFetchRdClosedAcntByFdAcntNoAndMemberNameMutation();

  const listClosedAccounts = data?.data || [];


    const [
      approveClosureRdAccount,
      {
        data: approveClosureAccntData,
        isError: approveClosureAccntIsError,
        isLoading: approveClosureAccntLoading,
        error: approveClosureAccntError,
        isSuccess: approveClosureAccntSuccess,
      },
    ] = useApproveClosureRdAccountMutation();

      const handleApproveClosure = async (id) => {
    console.log("id");
    try {
      await approveClosureRdAccount(id).unwrap();
    } catch (err) {
      console.error("Error approving closure:", err);
    }
  };
  

  const formList = [
    {
      label: "Close ID",
      type: "number",
      placeholder: "Enter Close ID",
      name: "closureApprovalId",
      id: "closureApprovalId",
    },
    {
      label: "RD Account Number",
      placeholder: "Enter Account Number",
      name: "accountNumber",
      id: "accountNumber",
    },
    {
      label: "CusterName Name",
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
    // memberName: Yup.string().required("Member name is required"),
    closureApprovalId: Yup.number()
      .required("Close ID is required")
      .positive("Close ID must be positive")
      .typeError("Close ID must be a number"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await fetchRdClosedAcntByFdAcntNoAndMemberName(
        values
      ).unwrap();
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

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "closureApprovalId", label: "Close ID", minWidth: 180 },
    { id: "memberId", label: "Member Name", minWidth: 180 },
    { id: "branchId", label: "Branch Name", minWidth: 120 },
    { id: "rdAccountNumber", label: "RD Account No.", minWidth: 150 },
    { id: "interestRate", label: "Interest Rate", minWidth: 120 },
    { id: "tenure", label: "Tenure (Months)", minWidth: 120 },
    { id: "startDate", label: "Start Date", minWidth: 120 },
    { id: "maturityDate", label: "Maturity Date", minWidth: 120 },
    { id: "releaseAmount", label: "Release Amount", minWidth: 120 },
    { id: "approvedDate", label: "Approved Date", minWidth: 140 },
    { id: "approvedBy", label: "Approved By", minWidth: 140 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
  ];

  const rows =
    listClosedAccounts?.map((curList, i) => ({
      id: i + 1,
      closureApprovalId: curList?.closeId || "N/A",
      memberId: curList?.memberName || "N/A",
      branchId: curList?.branchName || "N/A",
      rdAccountNumber: curList?.accountNumber || "N/A",
      interestRate: curList?.annualInterestRate || "N/A",
      tenure: curList?.tenure || "N/A",
      startDate: new Date(curList?.startDate).toLocaleString() || "N/A",
      maturityDate: new Date(curList?.maturityDate).toLocaleString() || "N/A",
      releaseAmount: `₹ ${curList?.depositAmount}` || "N/A",
      approvedDate:
        new Date(curList?.approvedDate).toLocaleDateString() || "N/A",
      approvedBy: curList?.approvedBy || "N/A",
    status:

          <strong style={{ color: "#e91212ff" }}>
            {capitalizeFirstLetter(curList?.status)}
          </strong>
         ||
        "N/A",
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
        whereToNavigate="/rd-accounts"
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

export default RdClosureApproval;
