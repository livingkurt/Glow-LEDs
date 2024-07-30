import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create_query } from "../utils/helper_functions";

export const allRecordsApi = createApi({
  reducerPath: "allRecordsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    affiliates: builder.query({
      query: query => `/affiliates?${create_query(query)}`,
    }),
    carts: builder.query({
      query: query => `/carts?${create_query(query)}`,
    }),
    categorys: builder.query({
      query: query => `/categorys?${create_query(query)}`,
    }),
    chips: builder.query({
      query: query => `/chips?${create_query(query)}`,
    }),
    contents: builder.query({
      query: query => `/contents?${create_query(query)}`,
    }),
    emails: builder.query({
      query: query => `/emails?${create_query(query)}`,
    }),
    expenses: builder.query({
      query: query => `/expenses?${create_query(query)}`,
    }),
    features: builder.query({
      query: query => `/features?${create_query(query)}`,
    }),
    filaments: builder.query({
      query: query => `/filaments?${create_query(query)}`,
    }),
    orders: builder.query({
      query: query => `/orders?${create_query(query)}`,
    }),
    palettes: builder.query({
      query: query => `/palettes?${create_query(query)}`,
    }),
    parcels: builder.query({
      query: query => `/parcels?${create_query(query)}`,
    }),
    paychecks: builder.query({
      query: query => `/paychecks?${create_query(query)}`,
    }),
    products: builder.query({
      query: query => `/products?${create_query(query)}`,
    }),
    productsGrid: builder.query({
      query: params => ({
        url: `/products/grid`,
        params: create_query(params),
        method: "GET",
      }),
    }),
    promos: builder.query({
      query: query => `/promos?${create_query(query)}`,
    }),
    surveys: builder.query({
      query: query => `/surveys?${create_query(query)}`,
    }),
    teams: builder.query({
      query: query => `/teams?${create_query(query)}`,
    }),
    users: builder.query({
      query: query => `/users?${create_query(query)}`,
    }),
  }),
});

export const {
  useAffiliatesQuery,
  useCartsQuery,
  useCategorysQuery,
  useChipsQuery,
  useContentsQuery,
  useEmailsQuery,
  useExpensesQuery,
  useFeaturesQuery,
  useFilamentsQuery,
  useOrdersQuery,
  usePalettesQuery,
  useParcelsQuery,
  usePaychecksQuery,
  useProductsQuery,
  useProductsGridQuery,
  usePromosQuery,
  useUsersQuery,
  useTeamsQuery,
  useSurveysQuery,
} = allRecordsApi;
