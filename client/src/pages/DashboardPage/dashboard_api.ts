import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/orders" }),
  endpoints: builder => ({
    getProductQuantitiesOrders: builder.query({
      query: () => "/get_product_quantities_orders"
    }),
    getAllShippingOrders: builder.query({
      query: () => "/get_all_shipping_orders"
    }),
    getAllTimeRevenueOrders: builder.query({
      query: () => "/get_all_time_revenue_orders"
    }),
    getProductAllTimeRevenueOrders: builder.query({
      query: id => `/get_product_all_time_revenue_orders/${id},`
    }),
    getProductRangeRevenueOrders: builder.query({
      query: id => `/get_product_range_revenue_orders/${id}`
    }),
    getRangeRevenueOrders: builder.query({
      query: () => "/get_range_revenue_orders"
    }),
    getMonthlyRevenueOrders: builder.query({
      query: () => "/get_monthly_revenue_orders"
    }),
    getRangeCategoryRevenueOrders: builder.query({
      query: () => "/get_range_category_revenue_orders"
    }),
    getAllTimeCategoryRevenueOrders: builder.query({
      query: () => "/get_all_time_category_revenue_orders"
    }),
    getRangeCategoryQuantitiesOrders: builder.query({
      query: () => "/get_range_category_quantities_orders"
    }),
    getAllTimeCategoryQuantitiesOrders: builder.query({
      query: () => "/get_all_time_category_quantities_orders"
    })
  })
});

export const {
  useGetProductQuantitiesOrdersQuery,
  useGetAllShippingOrdersQuery,
  useGetAllTimeRevenueOrdersQuery,
  useGetProductAllTimeRevenueOrdersQuery,
  useGetProductRangeRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetMonthlyRevenueOrdersQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetAllTimeCategoryRevenueOrdersQuery,
  useGetRangeCategoryQuantitiesOrdersQuery,
  useGetAllTimeCategoryQuantitiesOrdersQuery
} = orderApi;
