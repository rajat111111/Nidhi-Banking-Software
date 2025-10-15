import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SAVING_ACCOUNTS_API = `${import.meta.env.VITE_API_BASE_URL}/saving-account`;

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

  endpoints: (builder) => ({
    getAllSavingAccountsList: builder.query({
      query: () => ({
        url: `/all`,
        method: "GET",
        
      }),
      invalidatesTags:['GET_LATEST_SAVING_DATA_LIST']
    }),
    addNewSavingAccount:builder.mutation({
      query:(values)=>({
        url:``,
        method:"POST",
        headers:{

        },
        body:values
      })
    })
  }),
});

export const { useGetAllSavingAccountsListQuery } = savingAccounts;
