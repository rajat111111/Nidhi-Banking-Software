

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL; // root URL only, no /members

// export const membersApi = createApi({
//     reducerPath: "membersApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         credentials: "include",
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState()?.auth?.token;
//             if (token) headers.set("Authorization", `Bearer ${token}`);
//             return headers;
//         },
//     }),
//     tagTypes: ["Member", "MembershipFee"],
//     endpoints: (builder) => ({
//         // ✅ GET: Fetch all members
//         getMembers: builder.query({
//             query: () => "/members/all", // now explicitly defines endpoint path
//             providesTags: ["Member"],
//         }),

//         // ✅ POST: Create new member
//         createMember: builder.mutation({
//             query: (body) => ({
//                 url: "/members",
//                 method: "POST",
//                 body,
//             }),
//             invalidatesTags: ["Member"],
//         }),

//         // ✅ POST: Collect Membership Fees
//         createMembershipFee: builder.mutation({
//             query: ({ memberId, ...body }) => ({
//                 // full endpoint defined explicitly
//                 url: `/membership-fees/${memberId}`,
//                 method: "POST",
//                 body,
//             }),
//             invalidatesTags: ["MembershipFee"],
//         }),


//     }),
// });

// // ✅ Export hooks
// export const {
//     useGetMembersQuery,
//     useCreateMemberMutation,
//     useCreateMembershipFeeMutation,

// } = membersApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // root URL

export const membersApi = createApi({
    reducerPath: "membersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Member", "MembershipFee", "Approval"],
    endpoints: (builder) => ({
        // GET: Fetch all members (you had /members/all)
        getMembers: builder.query({
            query: () => "/members/all",
            providesTags: (result) =>
                result?.data ? [...result.data.map((m) => ({ type: "Member", id: m.id })), "Member"] : ["Member"],
        }),

        getApprovedMembers: builder.query({
            query: () => "/members/approved",
            providesTags: (result) =>
                result?.data ? [...result.data.map((m) => ({ type: "Member", id: m.id })), "Member"] : ["Member"],
        }),

        // GET single member by id (optional, useful for view)
        getMemberById: builder.query({
            query: (memberId) => `/members/${memberId}`,
            providesTags: (result, error, memberId) => [{ type: "Member", id: memberId }],
        }),

        // POST create member
        createMember: builder.mutation({
            query: (body) => ({ url: "/members", method: "POST", body }),
            invalidatesTags: ["Member"],
        }),

        // POST create membership fee
        createMembershipFee: builder.mutation({
            query: ({ memberId, ...body }) => ({ url: `/membership-fees/${memberId}`, method: "POST", body }),
            invalidatesTags: (result, error, { memberId }) => [{ type: "MembershipFee", id: memberId }],
        }),

        // GET approval view details 
        getApprovalView: builder.query({
            // GET /approval-view-details/:approvalId
            query: (approvalId) => `/members/${approvalId}`,
            providesTags: (result, error, approvalId) => [{ type: "Approval", id: approvalId }],
        }),

        approveApproval: builder.mutation({
            query: ({ approvalId }) => ({
                url: `/approval-view-details/approve/${approvalId}`,
                method: "POST",
            }),
        }),

        manualShareTransfer: builder.mutation({
            query: (body) => ({
                url: `/shares-holdings/manual-share-transfer`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Member"],
        }),

        addShareHolding: builder.mutation({
            query: (body) => ({
                url: `/share-holding`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ShareHolding"],
        }),

        manualShareAllocation: builder.mutation({
            query: (body) => ({
                url: `/manual-share-allocation`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ShareAllocation"],
        }),


    }),
});

export const {
    useGetMembersQuery,
    useGetApprovedMembersQuery,
    useGetMemberByIdQuery,
    useCreateMemberMutation,
    useCreateMembershipFeeMutation,
    useGetApprovalViewQuery,
    useApproveApprovalMutation,
    useManualShareTransferMutation,
    useAddShareHoldingMutation,
    useManualShareAllocationMutation
} = membersApi;

export default membersApi;
