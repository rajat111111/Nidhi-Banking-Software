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
      query: () => "/all", // /promoters endpoint
      providesTags: ["Promoter"],
    }),
    getPromoterById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Promoter", id }],
    }),
    addPromoter: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    updatePromoter: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Promoter", id }],
    }),
    getAllShareHoldings: builder.query({
      query: () => "/share-holdings", // your new endpoint
    }),
  }),
});

export const {
  useGetPromotersQuery,
  useGetPromoterByIdQuery,
  useAddPromoterMutation,
  useUpdatePromoterMutation,
  useGetAllShareHoldingsQuery,
} = promotersApi;
