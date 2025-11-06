import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AGENTS_API = `${import.meta.env.VITE_API_BASE_URL}/agents`;

export const agentsApi = createApi({
  reducerPath: "agentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AGENTS_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Agent"],
  endpoints: (builder) => ({
    getAllAgents: builder.query({
      query: () => "",
      providesTags: ["Agent"],
    }),
  }),
});

export const { useGetAllAgentsQuery } = agentsApi;
