import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create_query } from "../utils/helper_functions";

export const allRecordsApi = createApi({
  reducerPath: "allRecordsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    affiliates: builder.query({
      query: query => `/affiliates?${create_query(query)}`,
    }),
    articles: builder.query({
      query: query => `/articles?${create_query(query)}`,
    }),
    tutorials: builder.query({
      query: query => `/tutorials?${create_query(query)}`,
    }),
    carts: builder.query({
      query: query => `/carts?${create_query(query)}`,
    }),
    tags: builder.query({
      query: params => ({
        url: `/tags`,
        params: create_query(params),
        method: "GET",
      }),
    }),
    microlights: builder.query({
      query: query => `/microlights?${create_query(query)}`,
    }),
    contents: builder.query({
      query: query => `/contents?${create_query(query)}`,
    }),
    emails: builder.query({
      query: query => `/emails?${create_query(query)}`,
    }),
    events: builder.query({
      query: query => `/events?${create_query(query)}`,
    }),
    tickets: builder.query({
      query: query => `/tickets?${create_query(query)}`,
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
    tutorialsGrid: builder.query({
      query: params => ({
        url: `/tutorials/grid`,
        params: create_query(params),
        method: "GET",
      }),
    }),
    articlesGrid: builder.query({
      query: params => ({
        url: `/articles/grid`,
        params: create_query(params),
        method: "GET",
      }),
    }),
    promos: builder.query({
      query: query => `/promos?${create_query(query)}`,
    }),
    wholesalers: builder.query({
      query: query => `/wholesalers?${create_query(query)}`,
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
    productBundles: builder.query({
      query: query => {
        return `/carts/product_bundles?${create_query(query)}`;
      },
    }),
  }),
});

export const {
  useAffiliatesQuery,
  useCartsQuery,
  useTagsQuery,
  useContentsQuery,
  useEmailsQuery,
  useEventsQuery,
  useTicketsQuery,
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
  useTutorialsGridQuery,
  useArticlesGridQuery,
  useArticlesQuery,
  useTutorialsQuery,
  useProductBundlesQuery,
  useWholesalersQuery,
  useMicrolightsQuery,
} = allRecordsApi;
