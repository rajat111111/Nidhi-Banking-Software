import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SHARE_HOLDING_API = `${import.meta.env.VITE_API_BASE_URL}/auth`;


export const shareHoldingApi = createApi({
  reducerPath: "shareHoldingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHARE_HOLDING_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllShareHoldingDetails: builder.query({
      query: () => ({
        url: ``,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllShareHoldingDetailsQuery } = shareHoldingApi;

