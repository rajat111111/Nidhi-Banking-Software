import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SAVING_ACCOUNTS_API = `${import.meta.env.VITE_API_BASE_URL}`;

export const savingAccounts = createApi({
  reducerPath: "savingAccounts",
  baseQuery: fetchBaseQuery({
    baseUrl: SAVING_ACCOUNTS_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "GET_LATEST_SAVING_DATA_LIST",
    "GET_ACCOUNT_DETAILS",
    "GET_TRANSACTION_DETAILS",
    "GET_NOMINEE_DETAILS",
    "GET_SAVING_ACCOUNT_ALL_STATUS_LIST",
    "GET_DEPOSITELIST_BY_ACCOUNT_NUMBER",
    "GET_RECIEPT_PRINT_LATEST_LIST",
    "GET_LATEST_CLOSURE_APPROVALS",
  ],

  endpoints: (builder) => ({
    getAllSavingAccountsList: builder.query({
      query: () => ({
        url: `/saving-account/all`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_SAVING_DATA_LIST"],
    }),

    getAllAddedBranches: builder.query({
      query: () => ({
        url: `/branches/all`,
        method: "GET",
      }),
    }),
    getAllMebers: builder.query({
      query: () => ({
        url: `/members/all`,
        method: "GET",
      }),
    }),

    addNewSavingAccount: builder.mutation({
      query: (values) => ({
        url: `/saving-account/add`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_SAVING_DATA_LIST",
        "GET_SAVING_ACCOUNT_ALL_STATUS_LIST",
      ],
    }),

    getBasicAccountDetails: builder.query({
      query: ({ id }) => ({
        url: `/saving-account/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_ACCOUNT_DETAILS"],
    }),

    getAllAccountTransactions: builder.query({
      query: ({ id }) => ({
        url: `/account-transactions/member/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_TRANSACTION_DETAILS"],
    }),

    closeAccount: builder.mutation({
      query: ({ values, id }) => ({
        url: `/saving-account/close/${id}`,
        method: "PUT",
        body: { values },
      }),
      invalidatesTags: [
        "GET_LATEST_SAVING_DATA_LIST",
        "GET_ACCOUNT_DETAILS",
        "GET_TRANSACTION_DETAILS",
      ],
    }),

    depositAmount: builder.mutation({
      query: ({ values, id }) => ({
        url: `/account-transactions/transaction/${id}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_TRANSACTION_DETAILS"],
    }),

    printTransactionDetails: builder.query({
      query: ({ id, fromDate, toDate }) => ({
        url: `/account-transactions/print-passbook/${id}?fromDate=${fromDate}&toDate=${toDate}`,
        method: "GET",
      }),
    }),

    debitOtherCharges: builder.mutation({
      query: ({ values, accountNumber }) => ({
        url: `/bank-charges/debit-other/${accountNumber}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_TRANSACTION_DETAILS",
        "GET_LATEST_SAVING_DATA_LIST",
      ],
    }),

    creditOtherCharges: builder.mutation({
      query: ({ values, accountNumber }) => ({
        url: `/bank-charges/credit-interest/${accountNumber}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_TRANSACTION_DETAILS",
        "GET_LATEST_SAVING_DATA_LIST",
      ],
    }),

    getAllDepositeLogsOfSingleMember: builder.query({
      query: ({ id }) => ({
        url: `/account-transactions/deposit-logs/${id}`,
        method: "GET",
      }),
    }),

    removeSavingAccount: builder.mutation({
      query: ({ id }) => ({
        url: `/saving-account/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GET_LATEST_SAVING_DATA_LIST"],
    }),

    addNomineeOfASingleMember: builder.mutation({
      query: ({ values, id }) => ({
        url: `saving-account/add-nominee/${id}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_ACCOUNT_DETAILS",
        "GET_LATEST_SAVING_DATA_LIST",
        "GET_NOMINEE_DETAILS",
      ],
    }),
    getNomineeDetails: builder.query({
      query: (id) => ({
        url: `saving-account/nominee/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_NOMINEE_DETAILS"],
    }),
    getApprovalSavingAccountList: builder.query({
      query: () => ({
        url: `saving-account/all-status`,
        method: "GET",
      }),
      providesTags: ["GET_SAVING_ACCOUNT_ALL_STATUS_LIST"],
    }),
    approveSavingAccount: builder.mutation({
      query: (id) => ({
        url: `saving-account/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "GET_SAVING_ACCOUNT_ALL_STATUS_LIST",
        "GET_LATEST_SAVING_DATA_LIST",
      ],
    }),
    getDeposiListByAccountNumber: builder.query({
      query: ({ memberName, accountNumber }) =>
        `deposit-details/account-info?memberName=${memberName}&accountNumber=${accountNumber}`,
      providesTags: ["GET_DEPOSITELIST_BY_ACCOUNT_NUMBER"],
    }),

    depositAmountByAcccountNumber: builder.mutation({
      query: (values) => ({
        url: `deposit-details/deposit`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_DEPOSITELIST_BY_ACCOUNT_NUMBER",
        "GET_LATEST_SAVING_DATA_LIST",
      ],
    }),
    withdrawalAmountByAcccountNumber: builder.mutation({
      query: (values) => ({
        url: `deposit-details/withdraw`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_DEPOSITELIST_BY_ACCOUNT_NUMBER",
        "GET_LATEST_SAVING_DATA_LIST",
      ],
    }),
    getBankStatementByAccountNumber: builder.query({
      query: ({ accountNumber, fromDate, toDate, page, limit }) => ({
        url: "account-statement",
        method: "GET",
        params: {
          accountNumber,
          fromDate,
          toDate,
          page,
          limit,
        },
      }),
    }),
    getRecieptPrintList: builder.query({
      query: ({ memberName, accountNumber }) => ({
        url: `saving-receipt-print/search`,
        method: "GET",
        params: {
          memberName,
          accountNumber,
        },
      }),
      providesTags: ["GET_RECIEPT_PRINT_LATEST_LIST"],
    }),
    createReciept: builder.mutation({
      query: (values) => ({
        url: `saving-receipt-print`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_RECIEPT_PRINT_LATEST_LIST"],
    }),
    getClosedAccountListByAccountNumber: builder.query({
      query: ({ closureApprovalId, memberName, accountNumber }) => ({
        url: `saving-account/closure-approvals`,
        method: "GET",
        params: { closureApprovalId, memberName, accountNumber },
      }),
      providesTags: ["GET_LATEST_CLOSURE_APPROVALS"],
    }),

    approveClosureSavingAccount: builder.mutation({
      query: (id) => ({
        url: `saving-account/approve-closure/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "GET_LATEST_CLOSURE_APPROVALS",
        "GET_LATEST_SAVING_DATA_LIST",
        "GET_ACCOUNT_DETAILS",
      ],
    }),
    submitSavingAccountDocs:builder.mutation({
      query:({values,id})=>({
        url:`saving-accounts/documents/${id}`,
        method:"POST",
        body:values
      })
    })
  }),
});

export const {
  useGetAllSavingAccountsListQuery,
  useAddNewSavingAccountMutation,
  useGetAllAddedBranchesQuery,
  useGetBasicAccountDetailsQuery,
  useGetAllAccountTransactionsQuery,
  useCloseAccountMutation,
  useDepositAmountMutation,
  usePrintTransactionDetailsQuery,
  useDebitOtherChargesMutation,
  useCreditOtherChargesMutation,
  useGetAllDepositeLogsOfSingleMemberQuery,
  useRemoveSavingAccountMutation,
  useGetAllMebersQuery,
  useAddNomineeOfASingleMemberMutation,
  useGetNomineeDetailsQuery,
  useGetApprovalSavingAccountListQuery,
  useApproveSavingAccountMutation,
  useLazyGetDeposiListByAccountNumberQuery,
  useDepositAmountByAcccountNumberMutation,
  useWithdrawalAmountByAcccountNumberMutation,
  useGetBankStatementByAccountNumberQuery,
  useLazyGetRecieptPrintListQuery,
  useCreateRecieptMutation,
  useLazyGetClosedAccountListByAccountNumberQuery,
  useApproveClosureSavingAccountMutation,
  useSubmitSavingAccountDocsMutation
} = savingAccounts;
