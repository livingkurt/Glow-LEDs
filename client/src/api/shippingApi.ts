/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";

import * as API from "../api";

export const buyLabel = createAsyncThunk("shipping/buyLabel", async ({ orderId }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/buy_label`, {});
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const createLabel = createAsyncThunk("shipping/createLabel", async ({ orderId, speed }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/create_label/${speed}`, {});
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const createTracker = createAsyncThunk("shipping/createTracker", async ({ orderId }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/create_tracker`, {});

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
export const createReturnLabel = createAsyncThunk("shipping/createReturnLabel", async ({ orderId }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/create_return_label`, {});
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const shippingRates = createAsyncThunk("shipping/shippingRates", async ({ order, verify_shipping }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/shipping_rates`, { order });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const refundLabel = createAsyncThunk("shipping/refundLabel", async ({ orderId, isReturnTracking }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/refund_label/${isReturnTracking}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const generateCSVLabel = createAsyncThunk("shipping/generateCSVLabel", async ({ orderId }: any, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/shipping/${orderId}/generate_csv_label`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const differentShippingRates = createAsyncThunk("shipping/differentShippingRates", async (order: any, thunkApi: any) => {
  try {
    if (order.shipping.shipment_id && !order.shipping.shipping_label) {
      const { data } = await axios.get(`/api/shipping/${order._id}/different_shipping_rates/${order.shipping.shipment_id}`);
      return data;
    } else {
      const { data } = await axios.put(`/api/shipping/shipping_rates`, { order });
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
// export const createLabel = createAsyncThunk("shipping/createLabel", async ({ order, shipping_rate, speed }: any, thunkApi: any) => {

//   try {
//     const { data } = await axios.put(
//       "/api/shipping/create_label",//       {
//         order,
//         shipping_rate,
//         speed
//       },
//     );
//     return data;
//     } catch (error) {
//   Covy().showSnackbar({
//     message: `Error: ${error}`,
//     severity: "error"
//   });
// }
// });
// export const customShippingRates = createAsyncThunk("shipping/customShippingRates", async (data: any, thunkApi: any) => {
//   try {
//     const { data } = await axios.put("/api/shipping/get_custom_shipping_rates", {
//       data
//     });
//     return response_data;
//     } catch (error) {
//   Covy().showSnackbar({
//     message: `Error: ${error}`,
//     severity: "error"
//   });
// }
// });

// export const addTrackingNumber = createAsyncThunk(//   "shipping/addTrackingNumber",
//   async ({ order, tracking_number, label }: any, thunkApi: any) => {
//     try {
//       const { data } = await axios.put(
//         "/api/shipping/tracking_number",
//         {
//           order,
//           tracking_number,
//           label
//         },
//       );
//       return data;
//       } catch (error) {
//   Covy().showSnackbar({
//     message: `Error: ${error}`,
//     severity: "error"
//   });
// }
//   }
// );
// export const addReturnTrackingNumber = createAsyncThunk(
//   "shipping/addReturnTrackingNumber",
//   async ({ order, tracking_number, label }: any, thunkApi: any) => {

//     try {
//       const { data } = await axios.put(
//         "/api/shipping/return_tracking_number",//         {
//           order,
//           tracking_number,
//           label
//         },
//       );
//       return data;
//       } catch (error) {
//   Covy().showSnackbar({
//     message: `Error: ${error}`,
//     severity: "error"
//   });
// }
//   }
// );

// export const createReturnLabel = createAsyncThunk("shipping/createReturnLabel", async ({ order, shipping_rate }: any, thunkApi: any) => {

//   try {
//     const { data } = await axios.put(
//       "/api/shipping/create_return_label",
//       {
//         order,
//         shipping_rate
//       },
//     );
//     return data;
//     } catch (error) {
//   Covy().showSnackbar({
//     message: `Error: ${error}`,
//     severity: "error"
//   });
// }
// });
