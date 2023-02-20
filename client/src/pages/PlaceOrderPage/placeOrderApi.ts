import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeOrderApi = createApi({
  reducerPath: "placeOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/orders" }),
  endpoints: builder => ({
    getAllShippingOrders: builder.query({
      query: () => "/get_all_shipping_orders"
    })
  })
});

export const { useGetAllShippingOrdersQuery } = placeOrderApi;
