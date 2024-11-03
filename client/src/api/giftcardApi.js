import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const giftcardApi = createApi({
  reducerPath: "giftcardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Giftcard"],
  endpoints: builder => ({
    getGiftcards: builder.query({
      query: params => ({
        url: "/giftcards",
        params,
      }),
      providesTags: ["Giftcard"],
    }),

    getGiftcard: builder.query({
      query: id => `/giftcards/${id}`,
      providesTags: ["Giftcard"],
    }),

    createGiftcard: builder.mutation({
      query: data => ({
        url: "/giftcards",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Giftcard"],
    }),

    updateGiftcard: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/giftcards/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Giftcard"],
    }),

    deleteGiftcard: builder.mutation({
      query: id => ({
        url: `/giftcards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Giftcard"],
    }),

    validateGiftcard: builder.query({
      query: code => `/giftcards/validate/${code}`,
    }),

    checkBalance: builder.query({
      query: code => `/giftcards/balance/${code}`,
    }),

    getMyGiftcards: builder.query({
      query: params => ({
        url: "/giftcards/my-cards",
        params,
      }),
      providesTags: ["Giftcard"],
    }),

    useGiftcard: builder.mutation({
      query: data => ({
        url: "/giftcards/use",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Giftcard"],
    }),
  }),
});

export const {
  useGetGiftcardsQuery,
  useGetGiftcardQuery,
  useCreateGiftcardMutation,
  useUpdateGiftcardMutation,
  useDeleteGiftcardMutation,
  useValidateGiftcardQuery,
  useCheckBalanceQuery,
  useGetMyGiftcardsQuery,
  useUseGiftcardMutation,
} = giftcardApi;
