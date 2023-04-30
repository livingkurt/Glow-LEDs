/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import * as API from "../api";

export const buyLabel = createAsyncThunk("shipping/buyLabel", async ({ orderId }: any, thunkApi: any) => {
  const {
    users: {
      userPage: { current_user }
    }
  } = thunkApi.getState();
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/buy_label`, {}, headers(current_user));
    return data;
  } catch (error) {}
});

export const createLabel = createAsyncThunk("shipping/createLabel", async ({ orderId, speed }: any, thunkApi: any) => {
  const {
    users: {
      userPage: { current_user }
    }
  } = thunkApi.getState();
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/create_label/${speed}`, {}, headers(current_user));
    return data;
  } catch (error) {}
});
export const createReturnLabel = createAsyncThunk("shipping/createReturnLabel", async ({ orderId }: any, thunkApi: any) => {
  const {
    users: {
      userPage: { current_user }
    }
  } = thunkApi.getState();
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/create_return_label`, {}, headers(current_user));
    return data;
  } catch (error) {}
});

// export const shippingRates = createAsyncThunk("shipping/shippingRates", async ({ order, verify_shipping }: any, thunkApi: any) => {
//   const {
//     users: {
//       userPage: { current_user }
//     }
//   } = thunkApi.getState();
//   try {
//     const { data } = await axios.put(
//       "/api/shipping/get_shipping_rates",
//       {
//         order,
//         verify_shipping
//       },
//       headers(current_user)
//     );
//     return data;
//   } catch (error) {}
// });
// export const createLabel = createAsyncThunk("shipping/createLabel", async ({ order, shipping_rate, speed }: any, thunkApi: any) => {
//   const {
//     users: {
//       userPage: { current_user }
//     }
//   } = thunkApi.getState();
//   try {
//     const { data } = await axios.put(
//       "/api/shipping/create_label",
//       {
//         order,
//         shipping_rate,
//         speed
//       },
//       headers(current_user)
//     );
//     return data;
//   } catch (error) {}
// });
// export const customShippingRates = createAsyncThunk("shipping/customShippingRates", async (data: any, thunkApi: any) => {
//   const {
//     users: {
//       userPage: { current_user }
//     }
//   } = thunkApi.getState();
//   try {
//     const { data: response_data } = await axios.put(
//       "/api/shipping/get_custom_shipping_rates",
//       {
//         data
//       },
//       headers(current_user)
//     );
//     return response_data;
//   } catch (error) {}
// });
// export const differentShippingRates = createAsyncThunk("shipping/differentShippingRates", async (data: any, thunkApi: any) => {
//   const {
//     users: {
//       userPage: { current_user }
//     }
//   } = thunkApi.getState();
//   try {
//     const { data: response_data } = await axios.put(
//       "/api/shipping/get_different_shipping_rates",
//       {
//         data
//       },
//       headers(current_user)
//     );
//     return response_data;
//   } catch (error) {}
// });
// export const addTrackingNumber = createAsyncThunk(
//   "shipping/addTrackingNumber",
//   async ({ order, tracking_number, label }: any, thunkApi: any) => {
//     const {
//       users: {
//         userPage: { current_user }
//       }
//     } = thunkApi.getState();
//     try {
//       const { data } = await axios.put(
//         "/api/shipping/tracking_number",
//         {
//           order,
//           tracking_number,
//           label
//         },
//         headers(current_user)
//       );
//       return data;
//     } catch (error) {}
//   }
// );
// export const addReturnTrackingNumber = createAsyncThunk(
//   "shipping/addReturnTrackingNumber",
//   async ({ order, tracking_number, label }: any, thunkApi: any) => {
//     const {
//       users: {
//         userPage: { current_user }
//       }
//     } = thunkApi.getState();
//     try {
//       const { data } = await axios.put(
//         "/api/shipping/return_tracking_number",
//         {
//           order,
//           tracking_number,
//           label
//         },
//         headers(current_user)
//       );
//       return data;
//     } catch (error) {}
//   }
// );

// export const createReturnLabel = createAsyncThunk("shipping/createReturnLabel", async ({ order, shipping_rate }: any, thunkApi: any) => {
//   const {
//     users: {
//       userPage: { current_user }
//     }
//   } = thunkApi.getState();
//   try {
//     const { data } = await axios.put(
//       "/api/shipping/create_return_label",
//       {
//         order,
//         shipping_rate
//       },
//       headers(current_user)
//     );
//     return data;
//   } catch (error) {}
// });
