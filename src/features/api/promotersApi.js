import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROMOTERS_API = `${import.meta.env.VITE_API_BASE_URL}/promoters`;

export const promotersApi = createApi({
    reducerPath: "promotersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: PROMOTERS_API,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },

    }),
    tagTypes: ["Promoter"],
    endpoints: (builder) => ({
        getPromoters: builder.query({
            query: () => "", // /promoters endpoint
            providesTags: ["Promoter"],
        }),
    }),
});

export const { useGetPromotersQuery } = promotersApi;
