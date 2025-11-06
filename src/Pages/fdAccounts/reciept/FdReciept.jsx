import { useState } from "react";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup";
import PagesMainContainerStyle from "../../../components/PagesMainContainerStyle";
import PageHeader from "../../../components/PageHeader";
import DynamicDataTable from "../../../components/DynamicTable";
import { useLazyGetRecieptPrintListQuery } from "../../../features/api/savingAccounts";
import ErrorAndSuccessUseEffect from "../../../components/ErrorAndSuccessUseEffect";
import { Alert, Snackbar } from "@mui/material";
import { capitalizeFirstLetter } from "../../../helper/helper";
import NotFound from "../../NotFound";
import { useLazyGetFdReciptPrintByAcntNumberAndMemberNameQuery } from "../../../features/api/fdAccounts";

const FdReciept = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [
    getFdReciptPrintByAcntNumberAndMemberName,
    { data, isLoading, isError, error, isSuccess },
  ] = useLazyGetFdReciptPrintByAcntNumberAndMemberNameQuery();
  const recieptPrintList = data?.data || [];
  const formList = [
    {
      label: "Enquiry ID",
      placeholder: "Enter Enquiry ID ",
      name: "enquiryId",
      id: "enquiryId",
    },
    {
      label: "FD Account Number",
      placeholder: "Enter Account Number",
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

  const initialValues = {
    accountNumber: "",
    memberName: "",
    enquiryId: "",
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required("Account number is required"),
    // enquiryId: Yup.string().required("EnquiryId  is required"),
    memberName: Yup.string().required("Customer name is required"),
  });
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await getFdReciptPrintByAcntNumberAndMemberName(
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

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleCreateReciept = () => {};

  const columns = [
    { id: "id", label: "#", minWidth: 50 },
    { id: "receiptId", label: "Receipt ID", minWidth: 120 },
    { id: "memberName", label: "Member Name", minWidth: 120 },
    { id: "accountNo", label: "FD Account No.", minWidth: 120 },
    { id: "amount", label: "Amount", minWidth: 120 },
    { id: "receiptDate", label: "Receipt Date", minWidth: 120 },
    { id: "paymentMode", label: "Payment Mode", minWidth: 120 },
    // { id: "txnId", label: "TxnId", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
  ];
  const rows =
    recieptPrintList &&
    recieptPrintList.map((curPrint, i) => ({
      id: i + 1,
      receiptId: curPrint?.id || "N/A",

      memberName: curPrint
        ? `${curPrint?.member?.title || ""} ${curPrint?.member?.firstName || ""} ${
            curPrint?.member?.lastName || ""
          }`.trim()
        : "N/A",
      accountNo: curPrint?.accountNumber || "N/A",
      accountType: capitalizeFirstLetter(curPrint?.accountType) || "N/A",
      amount: `₹ ${curPrint?.amount}` || "N/A",
      receiptDate: curPrint?.receiptDate
        ? new Date(curPrint.receiptDate).toLocaleDateString("en-GB")
        : "N/A",
      paymentMode: capitalizeFirstLetter(curPrint?.paymentMode) || "N/A",
      // txnId: capitalizeFirstLetter(curPrint?.transactionType) || "N/A",
      status: capitalizeFirstLetter(curPrint?.status) || "N/A",
    }));
  return (
    <PagesMainContainerStyle>
      {!isError ? (
        <DynamicForm
          headerTitle="Reciept Print"
          formList={formList}
          width="30%"
          initialValues={initialValues}
          validationSchema={validationSchema}
          actionButtonText="Show Details"
          handleSubmit={handleSubmit}
          texting="Fetching"
          isLoading={isLoading}
        />
      ) : (
        <NotFound />
      )}
      <ErrorAndSuccessUseEffect
        setSnackbar={setSnackbar}
        isError={isError}
        error={error}
        isSuccess={isSuccess}
        data={data}
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
          <PageHeader
            title="Receipt Print"
            primaryButton={{
              label: "Create Receipt",
              to: "/fd-accounts/create-receipt",
              onClick: handleCreateReciept,
            }}
          />
          <DynamicDataTable rows={rows} columns={columns} />
        </>
      )}
    </PagesMainContainerStyle>
  );
};

export default FdReciept;
