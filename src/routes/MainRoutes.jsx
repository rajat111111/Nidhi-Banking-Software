import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Dashboard";
import DashboardPage from "../Pages/dashboard";
import Promoters from "../Pages/promoters/Promoters";
import ShareHoldings from "../Pages/promoters/ShareHoldings";
import AddPromoter from "../Pages/promoters/AddPromoter";
import PromoterDetails from "../Pages/promoters/PromoterDetails";
import AddShareHolder from "../Pages/promoters/AddShareHolder";
import ShareHoldingDetailsPromoters from "../Pages/promoters/ShareHoldingDetailsPromoters";
import MinorDetailsPromoters from "../Pages/promoters/MinorDetailsPromoters";
import ShareCertificates from "../Pages/promoters/ShareCertificates";

import MemberDetails from "../Pages/members/MemberDetails";
import AddMember from "../Pages/members/AddMember";
import ApprovalDetails from "../Pages/members/ApprovalDetails";
import MinorDetailsMembers from "../Pages/members/MinorDetailsMembers";

import ShareHoldingDetailsMembers from "../Pages/members/ShareHoldingDetailsMembers";
import AddShareHoldingMembers from "../Pages/members/AddShareHoldingMembers";
import ManualShareAllocation from "../Pages/members/ManualShareAllocation";
import UnallottedShares from "../Pages/members/UnallottedShares";
import ManualShareTransfer from "../Pages/members/ManualShareTransfer";
import ApprovalViewDetails from "../Pages/members/ApprovalViewDetails";
import ShareHoldingDetails from "../Pages/shareHolding/ShareHoldingDetails";
import Transfer from "../Pages/shareHolding/Transfer";
import Accounts from "../Pages/savingAccounts/accounts/Accounts";
import AddNewAccount from "../Pages/savingAccounts/accounts/AddNewAccount";
import ViewSingleAccountDetails from "../Pages/savingAccounts/accounts/ViewSingleAccountDetails";
import AddNominee from "../Pages/savingAccounts/accounts/nominee/AddNominee";
import Deposit from "../Pages/savingAccounts/deposit/Deposit";
import Withdraw from "../Pages/savingAccounts/widthraw/Withraw";
import Statement from "../Pages/savingAccounts/statement/Statement";
import Enquiry from "../Pages/savingAccounts/enquiry/Enquiry";
import Approval from "../Pages/savingAccounts/approval/Approval";
import ClosureApproval from "../Pages/savingAccounts/closureApproval/ClosureApproval";
import RecieptPrint from "../Pages/savingAccounts/recieptPrint/RecientPrint";
import CreateReceipt from "../Pages/savingAccounts/recieptPrint/CreateReceipt";
import UpdateNominee from "../Pages/savingAccounts/accounts/nominee/UpdateNominee";
import Account from "../Pages/fdAccounts/accounts/Account";
import AccountDetails from "../Pages/ddAccounts/accounts/AccountDetails";
import AddNewAccountDesign from "../Pages/ddAccounts/accounts/AddNewAccountDD";
import AddNewAccountDD from "../Pages/ddAccounts/accounts/AddNewAccountDD";
import CollectMembershipPage from "../Pages/members/CollectMembershipPage";
import ViewSingleAccountDetailsDD from "../Pages/ddAccounts/accounts/ViewSingleAccountDetailsDD";
import EditNominee from "../Pages/ddAccounts/accounts/nominee/EditNominee";
import StatementDetails from "../Pages/ddAccounts/statement/StatementDetails";
import EnquiryDetails from "../Pages/ddAccounts/enquiry/EnquiryDetails";
import ViewEnquiryDetails from "../Pages/ddAccounts/enquiry/ViewEnquiryDetails";
import Receipt from "../Pages/ddAccounts/receipt/ReceiptDD";
import ApprovalDD from "../Pages/ddAccounts/approval/ApprovalDD";
import ClosureApprovalDD from "../Pages/ddAccounts/closureApproval/ClosureApprovalDD";
import ReceiptDD from "../Pages/ddAccounts/receipt/ReceiptDD";


const MainRoutes = {
  path: "/",
  element: <ProtectedRoute />, // protects all routes
  children: [
    {
      element: <Layout />, // wrap all pages with main layout
      children: [
        { index: true, element: <DashboardPage /> },
        // Promoters Routes
        {
          path: "promoters",
          children: [
            { index: true, element: <Promoters /> },
            { path: "share-holdings", element: <ShareHoldings /> },
            { path: ":id", element: <AddPromoter /> },
            { path: "promoterDetails/:id", element: <PromoterDetails /> },
            { path: "add-share-holder", element: <AddShareHolder /> },
            { path: "share-holder/:id", element: <ShareHoldingDetailsPromoters /> },
            { path: "minors", element: <MinorDetailsPromoters /> },
            { path: "share-certificates", element: <ShareCertificates /> },
          ],
        },
        // Members Routes
        {
          path: "members",
          children: [
            { index: true, element: <MemberDetails /> },
            { path: "add", element: <AddMember /> },
            { path: "approval-details", element: <ApprovalDetails /> },
            { path: "approval-details/:id", element: <ApprovalViewDetails /> },
            { path: "share-holdings", element: <ShareHoldingDetailsMembers /> },
            { path: "add-share-holding", element: <AddShareHoldingMembers /> },
            {
              path: "manual-share-allocation",
              element: <ManualShareAllocation />,
            },
            { path: "unallotted-shares", element: <UnallottedShares /> },
            { path: "manual-share-transfer", element: <ManualShareTransfer /> },
            { path: "minor-details", element: <MinorDetailsMembers /> },
            { path: ":id/collect-membership", element: <CollectMembershipPage /> },
            {
              path: "approval-view-details/:id",
              element: <ApprovalViewDetails />
            }
            // {
            //   path: "approval-view-details/:id",
            //   element: <ApprovalViewDetails />
            // }
          ],
        },
        {
          path: "share-holding",
          children: [
            { index: true, element: <ShareHoldingDetails /> },
            { path: "transfer", element: <Transfer /> },
          ],
        },
        {
          path: "saving-accounts",
          children: [
            { index: true, element: <Accounts /> },
            { path: "add-new-account", element: <AddNewAccount /> },
            { path: ":id/account-details", element: <ViewSingleAccountDetails /> },
            { path: ":id/add-nominee", element: <AddNominee /> },
            { path: ":id/update-nominee", element: <UpdateNominee /> },
            { path: "deposit", element: <Deposit /> },
            { path: "withdraw", element: <Withdraw /> },
            { path: "statement", element: <Statement /> },
            { path: "enquiry", element: <Enquiry /> },
            { path: "approval", element: <Approval /> },
            { path: "closure-approval", element: <ClosureApproval /> },
            { path: "receipt-print", element: <RecieptPrint /> },
            { path: "create-receipt", element: <CreateReceipt /> },
          ],
        },
        {
          path: "fd-accounts",
          children: [
            { index: true, element: <Account /> },
          ],
        },
        {
          path: "dd-accounts",
          children: [
            { index: true, element: <AccountDetails /> },
            { path: "add-new-account", element: <AddNewAccountDD /> },
            { path: ":id/account-detailsDD", element: <ViewSingleAccountDetailsDD /> },
            { path: ":id/account-detailsDD/update-nominee/:id", element: <EditNominee /> },
            { path: "statement", element: <StatementDetails /> },
            { path: "enquiry", element: <EnquiryDetails /> },
            { path: "enquiry/:id", element: <EnquiryDetails /> },
            { path: "enquiry/:id", element: <ViewEnquiryDetails /> },
            { path: "approval", element: <ApprovalDD /> },
            { path: "closure-approval", element: <ClosureApprovalDD /> },
            { path: "receipt", element: <ReceiptDD /> },
          ],
        },
      ],
    }
  ],
};

export default MainRoutes;
