import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

// export const get_airtable_expenses = async (year: number): Promise<void> => {
//   const airtable: any = {
//     expenses_2023: {
//       base: "app1s1rBexc8nLb9s",
//       table: "tblsCcVphzBosLDmU"
//     },
//     expenses_2022: {
//       base: "appdOmbvAUthq73YV",
//       table: "tblEYxFjDWSxv7vbn"
//     },
//     expenses_2021: {
//       base: "appZpYNucg1uWM2tn",
//       table: "tblywftvea6gMAIeL"
//     },
//     expenses_2020: {
//       base: "app0SsFiabhtaLV2f",
//       table: "tblI1xFB249AAA7ZZ"
//     },
//     expenses_2019: {
//       base: "appZcHPFoIX7iLJgz",
//       table: "tblMoKZN0K0VCEpd3"
//     }
//   };
//   const airtableApiEndpoint = "https://api.airtable.com/v0";
//   const base = airtable[`expenses_${year}`].base;
//   const table_id = airtable[`expenses_${year}`].table;
//   const headers = {
//     Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN}`,
//     params: {
//       maxRecords: 100, // Maximum number of records to retrieve (up to 100)
//       view: "All" // Name of the view to use (optional)
//     }
//   };

//   try {
//     // const response = await axios.get(`https://api.airtable.com/v0/${base}/${table_id}/listRecords?maxRecords=100`, {
//     //   headers: {
//     //     Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN}`,
//     //     "Content-Type": "application/json"
//     //   }
//     // });
//     // console.log(response.data);
//     // return response.data;
//     const response = await axios.get(`${airtableApiEndpoint}/${base}/${table_id}`, {
//       headers,
//       params: {
//         maxRecords: 100, // Maximum number of records to retrieve (up to 100)
//         view: "All" // Name of the view to use (optional)
//       }
//     });
//     const records = response.data.records;
//     console.log(records); // Do something with the retrieved records
//     return records;
//   } catch (error) {
//     console.log(error);
//   }
// };
