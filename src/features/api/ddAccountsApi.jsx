// src/features/api/ddAccounts.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DD_API_BASE = `${import.meta.env.VITE_API_BASE_URL}`;

export const ddAccountsApi = createApi({

    reducerPath: "ddAccountsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: DD_API_BASE,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["DDAccount"],
    endpoints: (builder) => ({

        getDdAccountDetails: builder.query({
            query: (id) => `/dd-account/all`,
            providesTags: (result, error, id) => [{ type: "DDAccount", id }],
        }),

        getDdAccountById: builder.query({
            query: (id) => `/dd-account/basic-details/${id}`,
            providesTags: (result, error, id) => [{ type: "DDAccount", id }],
        }),

        getTransactions: builder.query({
            query: (id) => `/dd-transactions/getTransactions/${id}`,
            // tag each transaction (if server returns array), otherwise mark list
            providesTags: (result, error, id) =>
                result?.data
                    ? result.data.map((tx) => ({ type: "DDTransaction", id: tx.id }))
                    : [{ type: "DDTransaction", id: "LIST" }],
        }),

        getDdNominees: builder.query({
            query: (accountId) => `/dd-account/nominee/${accountId}`,
            providesTags: (result, error, accountId) =>
                result?.data ? [...result.data.map((n) => ({ type: "DDNominee", id: n.id })), { type: "DDNominee", id: "LIST" }] : [{ type: "DDNominee", id: "LIST" }],
        }),

        removeDdAccount: builder.mutation({
            query: (id) => ({
                url: `/dd-account/remove/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DDAccount", "DDTransaction", "DDNominee"],
        }),

        getDdAccountBonds: builder.query({
            query: (accountId) => `/dd-account/bonds/${accountId}`,
            // If server returns array of bonds, tag each item
            providesTags: (result, error, accountId) =>
                result?.data
                    ? result.data.map((b) => ({ type: "DDBond", id: b.id }))
                    : [{ type: "DDBond", id: "LIST" }],
        }),

        getDdAccountStatement: builder.query({
            /**
             * args: { accountNumber: string, fromDate: string (YYYY-MM-DD), toDate: string (YYYY-MM-DD) }
             */
            query: ({ accountNumber, fromDate, toDate }) => {
                const qp = new URLSearchParams({
                    accountNumber: accountNumber ?? "",
                    fromDate: fromDate ?? "",
                    toDate: toDate ?? "",
                }).toString();
                return `/dd-account-statement/statement?${qp}`;
            },

            // If server returns an array or { data: [] }, tag each transaction if id exists
            providesTags: (result, error, arg) => {
                const list = result?.data ?? result ?? [];
                return Array.isArray(list) && list.length
                    ? list.map((tx) => ({ type: "DDStatement", id: tx.id ?? tx.transactionId ?? tx.txnId ?? tx.ddNo ?? tx.ddNo ?? tx.dd_no ?? tx.id }))
                    : [{ type: "DDStatement", id: "LIST" }];
            },
        }),

        getDdAccountsWithoutPending: builder.query({
            query: () => `/dd-account/all-without-pending`,
            // If server returns { data: [...] } or an array, tag accounts for cache control
            providesTags: (result) =>
                (result?.data ?? result ?? []).map
                    ? (result?.data ?? result).map((acc) => ({ type: "DDAccount", id: acc.id }))
                    : [{ type: "DDAccount", id: "LIST" }],
        }),

        approveDdAccount: builder.mutation({
            // assuming backend accepts POST /dd-account/approve/{id}
            query: (id) => ({
                url: `/dd-account/approve/${id}`,
                method: "POST",
            }),
            // invalidates DDAccount list so the UI will refetch updated data
            invalidatesTags: (result, error, id) => [{ type: "DDAccount", id }, { type: "DDAccount", id: "LIST" }],
        }),

    }),

});

export const { useGetDdAccountDetailsQuery, useGetDdAccountByIdQuery, useGetTransactionsQuery, useGetDdNomineesQuery, useRemoveDdAccountMutation, useGetDdAccountBondsQuery, useGetDdAccountStatementQuery, useGetDdAccountsWithoutPendingQuery, useApproveDdAccountMutation } = ddAccountsApi;

export default ddAccountsApi;

