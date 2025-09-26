import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", // unique key in store
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.22.205:9999", // change to your backend
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token; // optional if you add auth slice
            if (token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({}), // endpoints will be added in feature APIs
});
