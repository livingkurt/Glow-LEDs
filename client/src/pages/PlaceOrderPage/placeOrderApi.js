import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { state_names } from "../../utils/helper_functions";
import axios from "axios";
import { showError } from "../../slices/snackbarSlice";
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
      const { data } = await axios.get("/api/orders/tax_rates");
      const result = state_names.find(obj => {
        return obj?.short_name === shipping.state || obj?.long_name === shipping.state;
      });
      const tax_rate = parseFloat(data[result?.long_name || shipping.state]) / 100;
      return { tax_rate, shipping, itemsPrice };
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
  async ({ promo_code }, { dispatch, rejectWithValue }) => {
    try {
      return axios.post("/api/emails/code_used/" + promo_code);
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      rejectWithValue(error.message);
    }
  }
);
