import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import { errorMessage } from "../../helpers/sharedHelpers";

export const placeOrderApi = createApi({
  reducerPath: "placeOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/orders" }),
  endpoints: builder => ({
    getAllShippingOrders: builder.query({
      query: () => "/get_all_shipping_orders",
    }),
  }),
});

export const { useGetAllShippingOrdersQuery } = placeOrderApi;

export const getTaxRates = createAsyncThunk(
  "placeOrderPage/getTaxRates",
  async ({ shipping, itemsPrice }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/tax_rates?country=${shipping.country}&state=${shipping.state}`);
      return { tax_rate: parseFloat(data.taxRate) / 100, shipping, itemsPrice };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      rejectWithValue(error.message);
    }
  }
);
export const updateStock = createAsyncThunk(
  "placeOrderPage/updateStock",
  async ({ cartItems }, { dispatch, rejectWithValue }) => {
    try {
      axios.put("/api/products/update_stock", { cartItems });
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      rejectWithValue(error.message);
    }
  }
);
export const promoCodeUsed = createAsyncThunk(
  "placeOrderPage/promoCodeUsed",
  async ({ promo_code }, { dispatch, rejectWithValue }) => {
    try {
      return axios.put("/api/promos/code/" + promo_code);
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      rejectWithValue(error.message);
    }
  }
);
export const sendCodeUsedEmail = createAsyncThunk(
  "placeOrderPage/sendCodeUsedEmail",
  async (promo_code, { dispatch, rejectWithValue }) => {
    try {
      return axios.post("/api/emails/code_used/" + promo_code);
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      rejectWithValue(error.message);
    }
  }
);

export const checkStock = createAsyncThunk(
  "placeOrderPage/checkStock",
  async (cartItems, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/products/check_stock`, { cartItems });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
