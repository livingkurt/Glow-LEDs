import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    getProductQuantitiesOrders: builder.query({
      query: () => "/orders/get_product_quantities_orders",
    }),
    getAllShippingOrders: builder.query({
      query: () => "/orders/get_all_shipping_orders",
    }),
    getAllTimeRevenueOrders: builder.query({
      query: () => "/orders/get_all_time_revenue_orders",
    }),
    getYearlyRevenueOrders: builder.query({
      query: () => "/orders/get_yearly_revenue_orders",
    }),
    getMonthlyRevenueOrders: builder.query({
      query: ({ year }) => `/orders/get_monthly_revenue_orders?year=${year}`,
    }),
    getDailyRevenueOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/orders/get_daily_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),
    getYearlyRevenueProductOrders: builder.query({
      query: ({ productId }) => `/orders/get_yearly_revenue_product_orders/${productId}/product`,
    }),
    getMonthlyRevenueProductOrders: builder.query({
      query: ({ year, productId }) => `/orders/get_monthly_revenue_product_orders/${productId}/product?year=${year}`,
    }),
    getProductAllTimeRevenueOrders: builder.query({
      query: id => `/orders/get_product_all_time_revenue_orders/${id},`,
    }),
    getProductRangeRevenueOrders: builder.query({
      query: ({ productId, start_date, end_date }) =>
        `/orders/${productId}/product_range_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),
    getRangeRevenueOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/orders/get_range_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),

    getRangeCategoryRevenueOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/orders/get_range_category_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),
    getAllTimeCategoryRevenueOrders: builder.query({
      query: () => "/orders/get_all_time_category_revenue_orders",
    }),
    getRangeTipsRevenueOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/orders/get_range_tips_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),
    getAllTimeTipsRevenueOrders: builder.query({
      query: () => "/orders/get_all_time_tips_revenue_orders",
    }),
    getRangeAffiliateEarningsCodeUsage: builder.query({
      query: ({ start_date, end_date }) => `/orders/affiliate_earnings?start_date=${start_date}&end_date=${end_date}`,
    }),
    getAllTimePayouts: builder.query({
      query: () => "/paychecks/get_all_time_payouts",
    }),
    getRangePayouts: builder.query({
      query: ({ start_date, end_date }) => `/paychecks/get_range_payouts?start_date=${start_date}&end_date=${end_date}`,
    }),
    getRangeExpenses: builder.query({
      query: ({ start_date, end_date }) => `/expenses/get_range_expenses?start_date=${start_date}&end_date=${end_date}`,
    }),
    getRangeGloves: builder.query({
      query: ({ start_date, end_date }) => `/paychecks/get_range_payouts?start_date=${start_date}&end_date=${end_date}`,
    }),
    getProductRevenue: builder.query({
      query: ({ start_date, end_date }) =>
        `/orders/get_all_product_range_revenue_orders?start_date=${start_date}&end_date=${end_date}`,
    }),
    getCurrentStock: builder.query({
      query: () => `/products/current_stock`,
    }),
    getSponsorCheckinStatus: builder.query({
      query: ({ start_date, end_date }) => `/affiliates/checkin_status?start_date=${start_date}&end_date=${end_date}`,
    }),
    getQuestionConcerns: builder.query({
      query: ({ start_date, end_date }) =>
        `/affiliates/question_concerns?start_date=${start_date}&end_date=${end_date}`,
    }),
    getYearlyExpenseOrders: builder.query({
      query: () => "/expenses/get_yearly_expenses_expenses",
    }),
    getMonthlyExpenseOrders: builder.query({
      query: ({ year }) => `/expenses/get_monthly_expenses_expenses?year=${year}`,
    }),
    getDailyExpenseOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/expenses/get_daily_expenses_expenses?start_date=${start_date}&end_date=${end_date}`,
    }),
    getExpensesByCategory: builder.query({
      query: ({ start_date, end_date }) =>
        `/expenses/get_expenses_by_category_expenses?start_date=${start_date}&end_date=${end_date}`,
    }),
    getYearlyPaycheckOrders: builder.query({
      query: () => "/paychecks/get_yearly_paychecks_paychecks",
    }),
    getMonthlyPaycheckOrders: builder.query({
      query: ({ year }) => `/paychecks/get_monthly_paychecks_paychecks?year=${year}`,
    }),
    getDailyPaycheckOrders: builder.query({
      query: ({ start_date, end_date }) =>
        `/paychecks/get_daily_paychecks_paychecks?start_date=${start_date}&end_date=${end_date}`,
    }),
  }),
});

export const {
  useGetProductQuantitiesOrdersQuery,
  useGetAllTimeRevenueOrdersQuery,
  useGetProductAllTimeRevenueOrdersQuery,
  useGetProductRangeRevenueOrdersQuery,
  useGetRangeRevenueOrdersQuery,
  useGetMonthlyRevenueOrdersQuery,
  useGetDailyRevenueOrdersQuery,
  useGetYearlyRevenueOrdersQuery,
  useGetRangeCategoryRevenueOrdersQuery,
  useGetAllTimeCategoryRevenueOrdersQuery,
  useGetAllTimeTipsRevenueOrdersQuery,
  useGetRangeTipsRevenueOrdersQuery,
  useGetRangeAffiliateEarningsCodeUsageQuery,
  useGetAllTimePayoutsQuery,
  useGetRangePayoutsQuery,
  useGetRangeExpensesQuery,
  useGetRangeGlovesQuery,
  useGetCurrentStockQuery,
  useGetProductRevenueQuery,
  useGetMonthlyRevenueProductOrdersQuery,
  useGetYearlyRevenueProductOrdersQuery,
  useGetSponsorCheckinStatusQuery,
  useGetYearlyExpenseOrdersQuery,
  useGetMonthlyExpenseOrdersQuery,
  useGetDailyExpenseOrdersQuery,
  useGetYearlyPaycheckOrdersQuery,
  useGetMonthlyPaycheckOrdersQuery,
  useGetDailyPaycheckOrdersQuery,
  useGetQuestionConcernsQuery,
  useGetExpensesByCategoryQuery,
} = dashboardApi;
