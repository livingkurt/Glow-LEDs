import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    getYearlyRevenueOrders: builder.query({
      query: () => "/get_yearly_revenue_orders"
    }),
    getProductAllTimeRevenueOrders: builder.query({
      query: id => `/get_product_all_time_revenue_orders/${id},`
    }),
    getProductRangeRevenueOrders: builder.query({
      query: ({ id, start_date, end_date }: { id: string; start_date: string; end_date: string }) =>
        `/get_product_range_revenue_orders/${id}?start_date=${start_date}&end_date=${end_date}`
    }),
    getRangeRevenueOrders: builder.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) =>
        `/get_range_revenue_orders?start_date=${start_date}&end_date=${end_date}`
    }),
    getDailyRevenueOrders: builder.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) =>
        `/get_daily_revenue_orders?start_date=${start_date}&end_date=${end_date}`
    }),
    getMonthlyRevenueOrders: builder.query({
      query: ({ year }: { year: string }) => `/get_monthly_revenue_orders?year=${year}`
    }),
    getRangeCategoryRevenueOrders: builder.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) =>
        `/get_range_category_revenue_orders?start_date=${start_date}&end_date=${end_date}`
    }),
    getAllTimeCategoryRevenueOrders: builder.query({
      query: () => "/get_all_time_category_revenue_orders"
    }),
    getRangeTipsRevenueOrders: builder.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) =>
        `/get_range_tips_revenue_orders?start_date=${start_date}&end_date=${end_date}`
    }),
    getAllTimeTipsRevenueOrders: builder.query({
      query: () => "/get_all_time_tips_revenue_orders"
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
  useGetYearlyRevenueOrdersQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetAllTimeCategoryRevenueOrdersQuery,
  useGetAllTimeTipsRevenueOrdersQuery,
  useGetRangeTipsRevenueOrdersQuery
} = dashboardApi;
