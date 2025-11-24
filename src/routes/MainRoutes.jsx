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
import { CollectMembershipFees } from "../Pages/members/CollectMembershipFees";
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
import AddFdAccount from "../Pages/fdAccounts/accounts/AddFdAccount";
import ViewSingleFdAccountDetails from "../Pages/fdAccounts/accounts/ViewSingleFdAccountDetails";
import FdStatement from "../Pages/fdAccounts/statement/FdStatement";
import FdEnquiry from "../Pages/fdAccounts/enquiry/FdEnquiry";
import FdApproval from "../Pages/fdAccounts/approval/FdApproval";
import FdClosureApproval from "../Pages/fdAccounts/closureApproval/FdClosureApproval";
import FdReciept from "../Pages/fdAccounts/reciept/FdReciept";
import CreateFdReceipt from "../Pages/fdAccounts/reciept/CreateFdRecipt";
import ViewFdRecipt from "../Pages/fdAccounts/reciept/ViewFdRecipt";
import ChangeAccountType from "../Pages/fdAccounts/changeAccountType/ChangeAccountType";
import RdAccounts from "../Pages/rdAccounts/accounts/RdAccounts";
import AddRdAccount from "../Pages/rdAccounts/accounts/AddRdAccount";
import ViewSingleRdAccountDetails from "../Pages/rdAccounts/accounts/ViewSingleRdAccountDetails";
import UpdateRdNominee from "../Pages/rdAccounts/accounts/nominee/UpdateRdNominee";
import AddRdNominee from "../Pages/rdAccounts/accounts/nominee/AddRdNominee";
import AddFdNominee from "../Pages/fdAccounts/accounts/nominee/AddFdNominee";
import UpdateFdNominee from "../Pages/fdAccounts/accounts/nominee/UpdateFdNominee";
import RdStatement from "../Pages/rdAccounts/statements/RdStatement";
import RdEnquiry from "../Pages/rdAccounts/enquiry/RdEnquiry";
import RdApproval from "../Pages/rdAccounts/approval/RdApproval";
import RdClosureApproval from "../Pages/rdAccounts/closureApproval/RdClosureApproval";
import ViewRdReciept from "../Pages/rdAccounts/reciept/ViewRdReciept";
import RdReciept from "../Pages/rdAccounts/reciept/RdReciept";
import CreateRdReciept from "../Pages/rdAccounts/reciept/CreateRdReciept";
import ChangeRdAccountType from "../Pages/rdAccounts/changeAccountType/ChangeRdAccountType";

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
            {
              path: "share-holder/:id",
              element: <ShareHoldingDetailsPromoters />,
            },
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
            {
              path: "collect-membership-fees/:id",
              element: <CollectMembershipFees />,
            },
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
            {
              path: ":id/account-details",
              element: <ViewSingleAccountDetails />,
            },
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
            { path: "add-new-account", element: <AddFdAccount /> },
            {
              path: ":id/account-details",
              element: <ViewSingleFdAccountDetails />,
            },
            {
              path: "statement",
              element: <FdStatement />,
            },
            {
              path: "enquiry",
              element: <FdEnquiry />,
            },
            {
              path: "approval",
              element: <FdApproval />,
            },
            { path: ":id/add-nominee", element: <AddFdNominee /> },
            { path: ":id/update-nominee", element: <UpdateFdNominee /> },
            {
              path: "approval",
              element: <FdApproval />,
            },
            {
              path: "closure-approval",
              element: <FdClosureApproval />,
            },
            {
              path: "receipt-print",
              element: <FdReciept />,
            },
            {
              path: "create-receipt",
              element: <CreateFdReceipt />,
            },
            {
              path: ":id/view-receipt",
              element: <ViewFdRecipt />,
            },
            {
              path: "change-account-type",
              element: <ChangeAccountType />,
            },
          ],
        },
        {
          path: "rd-accounts",
          children: [
            { index: true, element: <RdAccounts /> },
            { path: "add-new-account", element: <AddRdAccount /> },
            {
              path: ":id/account-details",
              element: <ViewSingleRdAccountDetails />,
            },
            {
              path: "statement",
              element: <RdStatement />,
            },
            {
              path: "enquiry",
              element: <RdEnquiry />,
            },
            {
              path: "approval",
              element: <RdApproval />,
            },

            { path: ":id/add-nominee", element: <AddRdNominee /> },
            { path: ":id/update-nominee", element: <UpdateRdNominee /> },

            {
              path: "approval",
              element: <FdApproval />,
            },
            {
              path: "closure-approval",
              element: <RdClosureApproval />,
            },
            {
              path: "receipt-print",
              element: <RdReciept />,
            },
            {
              path: "create-receipt",
              element: <CreateRdReciept />,
            },
            {
              path: ":id/view-receipt",
              element: <ViewRdReciept />,
            },
            {
              path: "change-account-type",
              element: <ChangeRdAccountType />,
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
