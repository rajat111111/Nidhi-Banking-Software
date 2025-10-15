import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const EMPLOYEES_API = `${import.meta.env.VITE_API_BASE_URL}/employees`;

export const employeesApi = createApi({
    reducerPath: "employeesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: EMPLOYEES_API,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Employee"],
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => "",
            providesTags: ["Employee"],
        }),
    }),
});

export const { useGetAllEmployeesQuery } = employeesApi;
