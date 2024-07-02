// ** Redux Imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../base";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    //   ** auth
    login: builder.mutation({
      query: (body) => ({
        url: "auth/sign-in",
        method: "POST",
        body: body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),
    verifyCode: builder.mutation({
      query: (body) => ({
        url: "auth/verify-code",
        method: "POST",
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),
    changePassword: builder.mutation({
      query: ({
        old_password,
        new_password,
        confirm_password,
        role,
        token,
      }) => ({
        url: "auth/change-password",
        method: "POST",
        body: { old_password, new_password, confirm_password, role },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // ** commission
    getCommission: builder.query({
      query: (token) => ({
        url: "commission/get",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    setCommission: builder.mutation({
      query: ({ per_hour_rate, token }) => ({
        url: "commission/toggle/add-update",
        method: "POST",
        body: { per_hour_rate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // ** transaction
    getTransactions: builder.query({
      query: ({ type, page, limit, token }) => ({
        url: `subscription/get-subscription/transactions?type=${type}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getWallet: builder.query({
      query: ({ token }) => ({
        url: `subscription/get-wallet`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // ** categories
    getCategories: builder.query({
      query: ({ page, limit, token }) => ({
        url: `categories/getAll?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addCategory: builder.mutation({
      query: ({ name, image, token }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        return {
          url: "categories/add",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateCategory: builder.mutation({
      query: ({ id, name, image, token }) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("image", image);
        return {
          url: "categories/update",
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `categories/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // ** Subscription
    getSubscriptions: builder.query({
      query: ({ page, limit, token }) => ({
        url: `subscription/get-all?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addSubscription: builder.mutation({
      query: ({ name, amount, interval_name, token }) => {
        return {
          url: "subscription/add-update",
          method: "POST",
          body: { name, amount, interval_name },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteSubscription: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `subscription/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // ** polices
    getPolicies: builder.query({
      query: ({ type, token }) => ({
        url: `policies/get/${type}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    togglePolicies: builder.mutation({
      query: ({ content, type, token }) => {
        return {
          url: "policies/toggle-policies",
          method: "POST",
          body: { content, type },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // ** social links
    getSocialLink: builder.query({
      query: ({ token }) => ({
        url: `social-links/get-all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    toggleSocialLinks: builder.mutation({
      query: ({ platform, link, token }) => {
        return {
          url: "social-links/add",
          method: "POST",
          body: { platform, link },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteSocialLinks: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `social-links/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // ** users
    getUsers: builder.query({
      query: ({ page, limit, token }) => ({
        url: `users/get-all/users?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getBuddies: builder.query({
      query: ({ page, limit, token }) => ({
        url: `users/get-all/buddies?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    blockUsers: builder.mutation({
      query: ({ user_id, is_block, token }) => {
        return {
          url: "users/block",
          method: "PATCH",
          body: { user_id, is_block },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getUserDetails: builder.query({
      query: ({ id, token }) => ({
        url: `users/get/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getReportedBuddies: builder.query({
      query: ({ page, limit, token }) => ({
        url: `users/get-reported/buddies?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getReportedUsers: builder.query({
      query: ({ page, limit, token }) => ({
        url: `users/get-reported/users?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getRejectedPayments: builder.query({
      query: ({ page, limit, token }) => ({
        url: `requests/rejected-payments/get-all?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getRequest: builder.query({
      query: ({ id, token }) => ({
        url: `requests/get/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    releasePayment: builder.mutation({
      query: ({ request_id, buddy_id, user_id, release_to, token }) => ({
        url: "payments/services/release-payment-user/admin",
        method: "POST",
        body: { request_id, buddy_id, user_id, release_to },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCounts: builder.query({
      query: ({ token }) => ({
        url: `universal/users/count`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getMonthlyGraph: builder.query({
      query: ({ token }) => ({
        url: `universal/admin/transactions/monthly`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getYearlyGraph: builder.query({
      query: ({ token }) => ({
        url: `universal/admin/transactions/yearly`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getDeletedUsers: builder.query({
      query: ({ role, page, limit, token }) => ({
        url: `universal/users/deleted?role=${role}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUsersRequests: builder.query({
      query: ({ id, page, limit, token }) => ({
        url: `universal/users/requests/${id}?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
  useSetCommissionMutation,
  useGetCommissionQuery,
  useGetTransactionsQuery,
  useGetWalletQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetPoliciesQuery,
  useTogglePoliciesMutation,
  useGetSocialLinkQuery,
  useToggleSocialLinksMutation,
  useDeleteSocialLinksMutation,
  useGetUsersQuery,
  useGetBuddiesQuery,
  useBlockUsersMutation,
  useGetUserDetailsQuery,
  useGetReportedBuddiesQuery,
  useGetReportedUsersQuery,
  useGetRejectedPaymentsQuery,
  useGetRequestQuery,
  useReleasePaymentMutation,
  useGetCountsQuery,
  useGetMonthlyGraphQuery,
  useGetYearlyGraphQuery,
  useGetDeletedUsersQuery,
  useChangePasswordMutation,
  useGetUsersRequestsQuery,
} = api;

export default api;
