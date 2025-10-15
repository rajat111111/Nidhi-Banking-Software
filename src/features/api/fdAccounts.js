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
});
