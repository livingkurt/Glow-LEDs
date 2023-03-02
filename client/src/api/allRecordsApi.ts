import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create_query } from "../utils/helper_functions";

export const allRecordsApi = createApi({
  reducerPath: "allRecordsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    affiliates: builder.query({
      query: (query: unknown) => `/affiliates?${create_query(query)}`
    }),
    carts: builder.query({
      query: (query: unknown) => `/carts?${create_query(query)}`
    }),
    categorys: builder.query({
      query: (query: unknown) => `/categorys?${create_query(query)}`
    }),
    chips: builder.query({
      query: (query: unknown) => `/chips?${create_query(query)}`
    }),
    contents: builder.query({
      query: (query: unknown) => `/contents?${create_query(query)}`
    }),
    emails: builder.query({
      query: (query: unknown) => `/emails?${create_query(query)}`
    }),
    expenses: builder.query({
      query: (query: unknown) => `/expenses?${create_query(query)}`
    }),
    features: builder.query({
      query: (query: unknown) => `/features?${create_query(query)}`
    }),
    filaments: builder.query({
      query: (query: unknown) => `/filaments?${create_query(query)}`
    }),
    orders: builder.query({
      query: (query: unknown) => `/orders?${create_query(query)}`
    }),
    palettes: builder.query({
      query: (query: unknown) => `/palettes?${create_query(query)}`
    }),
    parcels: builder.query({
      query: (query: unknown) => `/parcels?${create_query(query)}`
    }),
    paychecks: builder.query({
      query: (query: unknown) => `/paychecks?${create_query(query)}`
    }),
    products: builder.query({
      query: (query: unknown) => `/products?${create_query(query)}`
    }),
    promos: builder.query({
      query: (query: unknown) => `/promos?${create_query(query)}`
    }),
    settings: builder.query({
      query: (query: unknown) => `/settings?${create_query(query)}`
    }),
    surveys: builder.query({
      query: (query: unknown) => `/surveys?${create_query(query)}`
    }),
    teams: builder.query({
      query: (query: unknown) => `/teams?${create_query(query)}`
    }),
    users: builder.query({
      query: (query: unknown) => `/users?${create_query(query)}`
    })
  })
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
  usePromosQuery,
  useUsersQuery,
  useSettingsQuery,
  useTeamsQuery,
  useSurveysQuery
} = allRecordsApi;
