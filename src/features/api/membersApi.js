import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MEMBERS_API = `${import.meta.env.VITE_API_BASE_URL}/members`;

export const membersApi = createApi({
    reducerPath: "membersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: MEMBERS_API,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Member"],
    endpoints: (builder) => ({
        // GET: Fetch all members
        getMembers: builder.query({
            query: () => "",
            providesTags: ["Member"],
        }),
        createMember: builder.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Member"],
        }),

    }),
});

// ✅ Export hooks
export const {
    useGetMembersQuery,
    useCreateMemberMutation,
} = membersApi;
