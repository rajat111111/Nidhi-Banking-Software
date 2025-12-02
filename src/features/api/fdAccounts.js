import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FD_ACCOUNTS_API = `${import.meta.env.VITE_API_BASE_URL}`;

export const fdAccounts = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: FD_ACCOUNTS_API,

    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "GET_LATEST_FD_DATA_LIST",
    "GET_FD_BASIC_ACCOUNT_DETAILS",
    "GET_FD_TRANSACTION_DETAILS",
    "GET_FD_NOMINEE_DETAILS",
    "GET_FD_LATEST_DEPOSIT_LOGS",
    "APPROVE_FD_ACCOUNT_LIST",
    "GET_FD_RECIPT_PRINTS",
    "GET_FD_LATEST_BONDS",
    "GET_LATEST_FD_ACCOUNT_LIST_OF_APPROVAL",
    "GET_LATEST_FD_CLOSURE_APPROVALS",
    "GET_FD_RECIEPT_PRINT_LATEST_LIST",
  ],
  endpoints: (builder) => ({
    getAllFdAccountsList: builder.query({
      query: () => ({
        url: `/fd-account/all`,
        method: "GET",
      }),
      providesTags: [
        "GET_LATEST_FD_DATA_LIST",
        "GET_LATEST_FD_ACCOUNT_LIST_OF_APPROVAL",
      ],
    }),
    createFdAccount: builder.mutation({
      query: (values) => ({
        url: `fd-account/add`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_LATEST_FD_DATA_LIST"],
    }),
    getFdAccountsWithApprovalStatus: builder.query({
      query: () => ({
        url: `/fd-approval/approval`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_FD_ACCOUNT_LIST_OF_APPROVAL"],
    }),
    getBasicFdAccountDetails: builder.query({
      query: ({ id }) => ({
        url: `/fd-approval/basic-details/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_BASIC_ACCOUNT_DETAILS"],
    }),
    getUserAllInterestPayoutlist: builder.query({
      query: ({ id }) => ({
        url: `/fd-account/${id}/interest-payouts`,
        method: "GET",
      }),
    }),
    viewSingleUserFdTransaction: builder.query({
      query: ({ id }) => ({
        url: `/fd-transactions/getTransactions/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_TRANSACTION_DETAILS"],
    }),
    addNewFdNominee: builder.mutation({
      query: ({ id, values }) => ({
        url: `fd-account/${id}/add-nominee`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_FD_NOMINEE_DETAILS",
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_BASIC_ACCOUNT_DETAILS",
      ],
    }),
    getSingleUserFdNonineeDetails: builder.query({
      query: ({ id }) => ({
        url: `/fd-account/nominee/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_NOMINEE_DETAILS"],
    }),
    forFdCloseAccount: builder.mutation({
      query: ({ values, id }) => ({
        url: `fd-account/close/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_BASIC_ACCOUNT_DETAILS",
      ],
    }),
    removeFdAccount: builder.mutation({
      query: ({ id }) => ({
        url: `/fd-account/removeAccount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GET_LATEST_FD_DATA_LIST","GET_LATEST_FD_ACCOUNT_LIST_OF_APPROVAL"],
    }),
    creditOrDebitFdInterest: builder.mutation({
      query: ({ id, values }) => ({
        url: `/fd-account/${id}/interest`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_TRANSACTION_DETAILS",
        "GET_FD_LATEST_DEPOSIT_LOGS",
      ],
    }),
    deductOrReverseTds: builder.mutation({
      query: ({ id, values }) => ({
        url: `/fd-account/${id}/tds`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_TRANSACTION_DETAILS",
      ],
    }),
    getFdDepositLogs: builder.query({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `fd-transactions/deposit-logs/${id}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_LATEST_DEPOSIT_LOGS"],
    }),
    getFdReciptPrintByAcntNumberAndMemberName: builder.query({
      query: ({ accountNumber, memberName }) => ({
        url: `fd-receipt-print/search?accountNumber=${accountNumber}&memberName=${memberName}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_RECIPT_PRINTS"],
    }),
    createFdRecieptPrint: builder.mutation({
      query: (values) => ({
        url: `fd-receipt-print`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_FD_RECIEPT_PRINT_LATEST_LIST"],
    }),
    getFdBonds: builder.query({
      query: (id) => ({
        url: `fd-account/bonds/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_FD_LATEST_BONDS"],
    }),
    fetchFdAccontStatementsByFdAccount: builder.query({
      query: ({ accountNumber, fromDate, toDate, page = 1, limit = 10 }) => ({
        url: `fd-account-statement/statement`,
        method: "GET",
        params: {
          accountNumber,
          fromDate,
          toDate,
          toDate,
          page,
          limit,
        },
      }),
    }),
    fetchFdReciptsByFdAcntNoAndMemberName: builder.mutation({
      query: ({ accountNumber, memberName }) => ({
        url: `fd-receipt-print/search`,
        method: "GET",
        params: {
          accountNumber,
          memberName,
        },
      }),
      providesTags: ["GET_FD_RECIEPT_PRINT_LATEST_LIST"],
    }),
    fetchFdClosedAcntByFdAcntNoAndMemberName: builder.mutation({
      query: ({ closureApprovalId, accountNumber, memberName }) => ({
        url: `fd-account/closed`,
        method: "GET",
        params: {
          accountNumber,
          memberName,
          closureApprovalId,
        },
        providesTags: ["GET_LATEST_FD_CLOSURE_APPROVALS"],
      }),
    }),
    approveFdAccount: builder.mutation({
      query: (id) => ({
        url: `fd-approval/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["GET_LATEST_FD_ACCOUNT_LIST_OF_APPROVAL"],
    }),
    approveClosureFdAccount: builder.mutation({
      query: (id) => ({
        url: `fd-account/approve-closure/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "GET_LATEST_FD_CLOSURE_APPROVALS",
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_BASIC_ACCOUNT_DETAILS",
      ],
    }),
    getFdSingleReciptDetails: builder.query({
      query: ({ id }) => ({
        url: `/fd-receipt-print/${id}`,
        method: "GET",
      }),
    }),
    submitFdAccountDocs:builder.mutation({
      query:({values,id})=>({
        url:`fd-accounts/documents/${id}`,
        method:"PUT",
        body:values
      })
    })
  }),
});

export const {
  useGetAllFdAccountsListQuery,
  useGetBasicFdAccountDetailsQuery,
  useGetUserAllInterestPayoutlistQuery,
  useViewSingleUserFdTransactionQuery,
  useGetSingleUserFdNonineeDetailsQuery,
  useAddNewFdNomineeMutation,
  useForFdCloseAccountMutation,
  useRemoveFdAccountMutation,
  useCreditOrDebitFdInterestMutation,
  useDeductOrReverseTdsMutation,
  useGetFdDepositLogsQuery,
  useLazyGetFdReciptPrintByAcntNumberAndMemberNameQuery,
  useCreateFdRecieptPrintMutation,
  useGetFdBondsQuery,
  useLazyFetchFdAccontStatementsByFdAccountQuery,
  useFetchFdReciptsByFdAcntNoAndMemberNameMutation,
  useGetFdAccountsWithApprovalStatusQuery,
  useApproveFdAccountMutation,
  useFetchFdClosedAcntByFdAcntNoAndMemberNameMutation,
  useApproveClosureFdAccountMutation,
  useGetFdSingleReciptDetailsQuery,
  useCreateFdAccountMutation,
  useSubmitFdAccountDocsMutation
} = fdAccounts;
