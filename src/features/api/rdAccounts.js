import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RD_ACCOUNT_API = `${import.meta.env.VITE_API_BASE_URL}`;

export const rdAccounts = createApi({
  reducerPath: "rdAccounts",
  baseQuery: fetchBaseQuery({
    baseUrl: RD_ACCOUNT_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "GET_LATEST_RD_ACCOUNTS_LIST",
    "GET_LATEST_RD_BASIC_DETAILS_LIST",
    "GET_LATEST_RD_TRANSACTIONS_LIST",
    "GET_LATEST_RD_NOMINEES_LIST",
    "FETCH_LATEST_RD_BONDS",
    "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
    "GET_LATEST_APPROVED_RD_ACCOUNT_LIST",
    "FETCH_LATEST_RD_RECIEPT",
  ],
  endpoints: (builder) => ({
    getAllRdAccounts: builder.query({
      query: () => ({
        url: `rd-account/all`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_APPROVED_RD_ACCOUNT_LIST"],
    }),
    createRdAccount: builder.mutation({
      query: (values) => ({
        url: `Rd-account/add`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_RD_ACCOUNTS_LIST",
        "GET_LATEST_RD_BASIC_DETAILS_LIST",
        "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
        "GET_LATEST_APPROVED_RD_ACCOUNT_LIST"
      ],
    }),
    getAllRdAccountsWithoutPendingStatus: builder.query({
      query: () => ({
        url: `rd-account/all/non-pending`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_RD_ACCOUNTS_LIST"],
    }),
    basicRdDetails: builder.query({
      query: (id) => ({
        url: `rd-account/basic-details/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_RD_BASIC_DETAILS_LIST"],
    }),
    getRdTransactions: builder.query({
      query: (id) => ({
        url: `rd-transactions/getTransactions/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_RD_TRANSACTIONS_LIST"],
    }),
    getRdNominees: builder.query({
      query: (id) => ({
        url: `rd-account/nominees/${id}`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_RD_NOMINEES_LIST"],
    }),
    addRdNominee: builder.mutation({
      query: ({ values, id }) => ({
        url: `rd-account/${id}/add-nominee`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_LATEST_RD_NOMINEES_LIST"],
    }),

    removeRdAccount: builder.mutation({
      query: ({ id }) => ({
        url: `rd-account/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "GET_LATEST_RD_ACCOUNTS_LIST",
        "GET_LATEST_RD_BASIC_DETAILS_LIST",
        "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
      ],
    }),
    fetchRdAccountForApprovalRequests: builder.mutation({
      query: () => ({
        url: `rd-account/approved`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_FD_APPROVAL_REQUESTS_LIST"],
    }),
    forRdCloseAccount: builder.mutation({
      query: ({ values, id }) => ({
        url: `rd-account/close/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_RD_ACCOUNTS_LIST",
        "GET_LATEST_RD_BASIC_DETAILS_LIST",
        "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
      ],
    }),
    fetchRdAccontStatementsByFdAccount: builder.query({
      query: ({ accountNumber, fromDate, toDate, page = 1, limit = 10 }) => ({
        url: `rd-account-statement/statement`,
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
    fetchRdClosedAcntByFdAcntNoAndMemberName: builder.mutation({
      query: ({ closureApprovalId, accountNumber, memberName }) => ({
        url: `rd-account/closed`,
        method: "GET",
        params: {
          accountNumber,
          memberName,
          closureApprovalId,
        },
        invalidatesTags: ["GET_LATEST_FD_APPROVAL_REQUESTS_LIST"],
      }),
    }),
    approveClosureRdAccount: builder.mutation({
      query: (id) => ({
        url: `rd-account/approve-closure/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
        "GET_LATEST_RD_ACCOUNTS_LIST",
        "GET_LATEST_RD_BASIC_DETAILS_LIST",
      ],
    }),
    approveRdAccount: builder.mutation({
      query: (id) => ({
        url: `rd-approval/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [
        "GET_LATEST_FD_APPROVAL_REQUESTS_LIST",
        "GET_LATEST_RD_ACCOUNTS_LIST",
        "GET_LATEST_RD_BASIC_DETAILS_LIST",
        "GET_LATEST_APPROVED_RD_ACCOUNT_LIST",
      ],
    }),
    fetchRdBonds: builder.query({
      query: (id) => ({
        url: `rd-account/bonds/${id}`,
        method: "GET",
      }),
      providesTags: ["FETCH_LATEST_RD_BONDS"],
    }),
    fetchRdReciptsByRdAcntNoAndMemberName: builder.mutation({
      query: ({ accountNumber }) => ({
        url: `rd-receipt-print/search`,
        method: "GET",
        params: {
          accountNumber,
        },
        providesTags: ["FETCH_LATEST_RD_RECIEPT"],
      }),
    }),
    createRdRecieptPrint: builder.mutation({
      query: (values) => ({
        url: `rd-receipt-print`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["FETCH_LATEST_RD_RECIEPT"],
    }),
    getRdSingleReciptDetails: builder.query({
      query: ({ id }) => ({
        url: `/rd-receipt-print/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["FETCH_LATEST_RD_RECIEPT"],
    }),
    submitRdAccountDocs:builder.mutation({
      query:({values,id})=>({
        url:`rd-accounts/documents/${id}`,
        method:"PUT",
        body:values
      })
    })
  }),
});

export const {
  useGetAllRdAccountsQuery,
  useGetRdTransactionsQuery,
  useGetRdNomineesQuery,
  useBasicRdDetailsQuery,
  useAddRdNomineeMutation,
  useRemoveRdAccountMutation,
  useFetchRdAccountForApprovalRequestsMutation,
  useForRdCloseAccountMutation,
  useLazyFetchRdAccontStatementsByFdAccountQuery,
  useFetchRdAccontStatementsByFdAccountQuery,
  useFetchRdClosedAcntByFdAcntNoAndMemberNameMutation,
  useApproveClosureRdAccountMutation,
  useGetAllRdAccountsWithoutPendingStatusQuery,
  useApproveRdAccountMutation,
  useFetchRdBondsQuery,
  useFetchRdReciptsByRdAcntNoAndMemberNameMutation,
  useCreateRdRecieptPrintMutation,
  useGetRdSingleReciptDetailsQuery,
  useCreateRdAccountMutation,
  useSubmitRdAccountDocsMutation
} = rdAccounts;
