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
  ],
  endpoints: (builder) => ({
    getAllFdAccountsList: builder.query({
      query: () => ({
        url: `/fd-account/all`,
        method: "GET",
      }),
      providesTags: ["GET_LATEST_FD_DATA_LIST"],
    }),
    getBasicFdAccountDetails: builder.query({
      query: ({ id }) => ({
        url: `/fd-account/basic-details/${id}`,
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
        url: `/fd-transactions/member/${id}`,
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
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: [
        "GET_LATEST_FD_DATA_LIST",
        "GET_FD_BASIC_ACCOUNT_DETAILS",
      ],
    }),
    removeFdAccount: builder.mutation({
      query: ({ id }) => ({
        url: `/fd-account/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GET_LATEST_FD_DATA_LIST"],
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
    getFdStatementsByAccnNumberAndMemberId: builder.mutation({
      query: ({ id, values }) => ({
        url: ``,
        method: "GET",
        body: values,
      }),
    }),
    approveFdAccount: builder.query({
      query: (id) => ({
        url: `fd-account/approve/${id}`,
        method: "GET",
      }),
      providesTags: ["APPROVE_FD_ACCOUNT_LIST"],
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
        url: `fd-account/receipt-print`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["GET_FD_RECIPT_PRINTS"],
    }),
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
  useApproveFdAccountQuery,
  useLazyGetFdReciptPrintByAcntNumberAndMemberNameQuery,
  useCreateFdRecieptPrintMutation,
} = fdAccounts;
