import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const giftCardApi = createApi({
  reducerPath: "giftCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["GiftCard"],
  endpoints: builder => ({
    getGiftCards: builder.query({
      query: params => ({
        url: "/gift_cards",
        params,
      }),
      providesTags: ["GiftCard"],
    }),

    getGiftCard: builder.query({
      query: id => `/gift_cards/${id}`,
      providesTags: ["GiftCard"],
    }),

    createGiftCard: builder.mutation({
      query: data => ({
        url: "/gift_cards",
        method: "POST",
        data,
      }),
      invalidatesTags: ["GiftCard"],
    }),

    updateGiftCard: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gift_cards/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["GiftCard"],
    }),

    deleteGiftCard: builder.mutation({
      query: id => ({
        url: `/gift_cards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GiftCard"],
    }),

    validateGiftCard: builder.query({
      query: code => `/gift_cards/validate/${code}`,
    }),

    checkBalance: builder.query({
      query: code => `/gift_cards/balance/${code}`,
    }),

    getMyGiftCards: builder.query({
      query: params => ({
        url: "/gift_cards/my-cards",
        params,
      }),
      providesTags: ["GiftCard"],
    }),

    useGiftCard: builder.mutation({
      query: data => ({
        url: "/gift_cards/use",
        method: "POST",
        data,
      }),
      invalidatesTags: ["GiftCard"],
    }),
  }),
});

export const {
  useGetGiftCardsQuery,
  useGetGiftCardQuery,
  useCreateGiftCardMutation,
  useUpdateGiftCardMutation,
  useDeleteGiftCardMutation,
  useValidateGiftCardQuery,
  useCheckBalanceQuery,
  useGetMyGiftCardsQuery,
  useUseGiftCardMutation,
} = giftCardApi;
