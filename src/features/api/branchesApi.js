import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BRANCH_API = `${import.meta.env.VITE_API_BASE_URL}/branches`;

export const branchesApi = createApi({
  reducerPath: "branchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BRANCH_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Branch"],
  endpoints: (builder) => ({
    getAllBranches: builder.query({
      query: () => "all", // GET /branches/all
      providesTags: ["Branch"],
    }),
  }),
});

export const { useGetAllBranchesQuery } = branchesApi;
