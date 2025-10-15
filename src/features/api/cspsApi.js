import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CSPS_API = `${import.meta.env.VITE_API_BASE_URL}/csps`;

export const cspsApi = createApi({
    reducerPath: "cspsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: CSPS_API,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["CSP"],
    endpoints: (builder) => ({
        getAllCsps: builder.query({
            query: () => "",
            providesTags: ["CSP"],
        }),
    }),
});

export const { useGetAllCspsQuery } = cspsApi;
