/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import config from "../config";

export const getOrders = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return await axios.get(`/api/orders`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
  }
};
export const getOrderFilters = async () => {
  const { data } = await axios.get(`/api/orders/filters`);
  return data;
};

export const listOrders = createAsyncThunk("orders/listOrders", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/orders/old?${create_query(query)}`);

    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const listMyOrders = createAsyncThunk("orders/listMyOrders", async (user_id: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/orders/${user_id}/user`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const createNoPayOrder = createAsyncThunk("orders/createNoPayOrder", async (order: any, thunkApi: any) => {
  try {
    const { data } = await axios.post("/api/orders", order);
    sessionStorage.removeItem("shippingAddress");
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveOrder = createAsyncThunk("orders/saveOrder", async (order: any, thunkApi: any) => {
  try {
    if (!order._id) {
      const { data } = await axios.post("/api/orders", order);
      Covy().showSnackbar({
        message: `Order Created`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.put(`/api/orders/glow/${order._id}`, order);
      Covy().showSnackbar({
        message: `Order Saved`,
        severity: "success",
      });
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const createPayOrder = createAsyncThunk(
  "orders/createPayOrder",
  async (
    {
      order,
      paymentMethod,
      create_account,
      new_password,
    }: { order: any; paymentMethod: any; create_account: boolean; new_password: string },
    thunkApi: any
  ) => {
    let user_id = null;

    const {
      users: {
        userPage: { current_user },
      },
    } = thunkApi.getState();

    try {
      if (current_user && Object.keys(current_user).length > 0) {
        user_id = current_user ? current_user._id : null;
      } else if (create_account) {
        const { data: create_user } = await axios.post("/api/users/register", {
          first_name: order.shipping.first_name,
          last_name: order.shipping.last_name,
          email: order.shipping.email,
          password: new_password,
        });
        axios.post("/api/emails/account_created", create_user);
        user_id = create_user._id;
      } else if (!create_account) {
        const { data: user } = await axios.get("/api/users/email/" + order.shipping.email.toLowerCase());
        if (user && Object.keys(user).length > 0) {
          user_id = user._id;
        } else {
          const { data: new_user } = await axios.post("/api/users", {
            first_name: order.shipping.first_name,
            last_name: order.shipping.last_name,
            email: order.shipping.email,
            isVerified: true,
            email_subscription: true,
            guest: true,
            password: config.REACT_APP_TEMP_PASS,
          });
          user_id = new_user._id;
        }
      }

      const { data: order_created } = await axios.post("/api/orders", { ...order, user: user_id });
      const { data: payment_created } = await axios.put(`/api/payments/${order_created._id}/pay`, { paymentMethod });
      sessionStorage.removeItem("shippingAddress");
      return { order: order_created, payment_created };
    } catch (error) {
      throw error;
    }
  }
);

export const detailsOrder = createAsyncThunk("orders/detailsOrder", async (order_id: string, thunkApi: any) => {
  const {
    users: {
      userPage: { current_user },
    },
  } = thunkApi.getState();
  try {
    if (current_user && current_user.first_name) {
      const { data } = await axios.get("/api/orders/secure/" + order_id);
      Covy().showSnackbar({
        message: `Order Found`,
        severity: "success",
      });
      return data;
    } else {
      const { data } = await axios.get("/api/orders/guest/" + order_id);
      Covy().showSnackbar({
        message: `Order Found`,
        severity: "success",
      });
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.delete(`/api/orders/glow/${id}`);
    Covy().showSnackbar({
      message: `Order Deleted`,
      severity: "success",
    });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteMultipleOrders = createAsyncThunk(
  "orders/deleteMultipleOrders",
  async (ids: string, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/orders/glow/delete_multiple`, { ids });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const refundOrder = createAsyncThunk(
  "orders/refundOrder",
  async ({ orderId, refundAmount, refundReason }: any, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/payments/${orderId}/refund`, {
        refundAmount,
        refundReason,
      });
      Covy().showSnackbar({
        message: `Order Refunded`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);
export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ order, paymentMethod }: { order: any; paymentMethod: any }, thunkApi: any) => {
    try {
      const { data } = await axios.put("/api/payments/secure/pay/" + order._id, { paymentMethod });
      Covy().showSnackbar({
        message: `Order Paid`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);
export const payOrderGuest = createAsyncThunk(
  "orders/payOrderGuest",
  async ({ order, paymentMethod }: { order: any; paymentMethod: any }, thunkApi: any) => {
    try {
      const { data } = await axios.put("/api/payments/guest/pay/" + order._id, { paymentMethod });
      Covy().showSnackbar({
        message: `Order Paid`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const transferOrders = createAsyncThunk(
  "orders/transferOrders",
  async ({ oldUserId, newUserId }: { oldUserId: any; newUserId: any }, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/orders/${oldUserId}transfer/${newUserId}`);
      Covy().showSnackbar({
        message: `Orders Transfered`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);

export const invoiceOrder = createAsyncThunk(
  "orders/invoiceOrder",
  async ({ orderId }: { orderId: string }, thunkApi: any) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/invoice`);
      Covy().showSnackbar({
        message: `Invoice Recieved`,
        severity: "success",
      });
      return data;
    } catch (error) {
      Covy().showSnackbar({
        message: errorMessage(error),
        severity: "error",
      });
    }
  }
);
