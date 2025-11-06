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
    "GET_LATEST_RD_TRANSACTIONS_LIST",
    "GET_LATEST_RD_NOMINEES_LIST",
  ],
  endpoints: (builder) => ({
    getAllRdAccounts: builder.query({
      query: () => ({
        url: `rd-account/all`,
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
  }),
});

export const {
  useGetAllRdAccountsQuery,
  useGetRdTransactionsQuery,
  useGetRdNomineesQuery,
  useBasicRdDetailsQuery,
  useAddRdNomineeMutation,
} = rdAccounts;
