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
} = api;

export default api;
