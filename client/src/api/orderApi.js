/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";
import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";
import config from "../config";
import { sendOrderEmail, sendTicketEmail } from "./emailApi";

export const getOrders = async ({ search, sorting, filters, page, pageSize }) => {
  try {
    return await axios.get(`/api/orders/table`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getMyOrders = async ({ search, sorting, filters, page, pageSize }, userId) => {
  try {
    return await axios.get(`/api/orders/table/${userId}/user`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        // filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};
export const getOrderFilters = async () => {
  const { data } = await axios.get(`/api/orders/filters`);
  return data;
};

export const listOrders = createAsyncThunk("orders/listOrders", async (query, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/orders/old?${create_query(query)}`);

    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const listMyOrders = createAsyncThunk("orders/listMyOrders", async (user_id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/orders/${user_id}/user`);
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const listProductOccurrences = createAsyncThunk(
  "orders/listProductOccurrences",
  async (_args, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/occurrences`);
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const saveOrder = createAsyncThunk("orders/saveOrder", async (order, { dispatch, rejectWithValue }) => {
  try {
    if (!order._id) {
      const { data } = await axios.post("/api/orders", order);
      dispatch(showSuccess({ message: `Order Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/orders/glow/${order._id}`, order);
      dispatch(showSuccess({ message: `Order Saved` }));
      return data;
    }
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ order, cartId, paymentMethod, create_account, new_password }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/orders/place_order", {
        order,
        cartId,
        paymentMethod,
        create_account,
        new_password,
      });

      dispatch(showSuccess({ message: "Order created successfully" }));
      sessionStorage.removeItem("shippingAddress");
      sessionStorage.setItem("manualNavigation", "true");
      localStorage.removeItem("cartItems");
      return data;
    } catch (error) {
      console.log({ createPayOrder: error });
      dispatch(showError({ message: errorMessage(error), duration: 10000 }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const detailsOrder = createAsyncThunk(
  "orders/detailsOrder",
  async (order_id, { dispatch, rejectWithValue, getState }) => {
    const {
      users: {
        userPage: { current_user },
      },
    } = getState();
    try {
      if (current_user && current_user.first_name) {
        const { data } = await axios.get("/api/orders/secure/" + order_id);
        dispatch(showSuccess({ message: `Order Found` }));
        return data;
      } else {
        const { data } = await axios.get("/api/orders/guest/" + order_id);
        dispatch(showSuccess({ message: `Order Found` }));
        return data;
      }
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/orders/glow/${id}`);
    dispatch(showSuccess({ message: `Order Deleted` }));
    return data;
  } catch (error) {
    dispatch(showError({ message: errorMessage(error) }));
    return rejectWithValue(error.response?.data);
  }
});

export const deleteMultipleOrders = createAsyncThunk(
  "orders/deleteMultipleOrders",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/glow/delete_multiple`, { ids });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateMultipleOrderStatus = createAsyncThunk(
  "orders/deleteMultipleOrders",
  async ({ ids, status }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/glow/update_multiple_status`, { ids, status });
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const refundOrder = createAsyncThunk(
  "orders/refundOrder",
  async ({ orderId, refundAmount, refundReason }, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userPage: { current_user },
        },
      } = getState();

      const { data } = await axios.put(`/api/payments/${orderId}/refund`, {
        refundAmount,
        refundReason,
        current_user,
      });
      dispatch(showSuccess({ message: `Order Refunded` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ order, paymentMethod }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/payments/secure/pay/" + order._id, { paymentMethod });
      dispatch(showSuccess({ message: `Order Paid` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
export const payOrderGuest = createAsyncThunk(
  "orders/payOrderGuest",
  async ({ order, paymentMethod }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/payments/guest/pay/" + order._id, { paymentMethod });
      dispatch(showSuccess({ message: `Order Paid` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const transferOrders = createAsyncThunk(
  "orders/transferOrders",
  async ({ oldUserId, newUserId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${oldUserId}transfer/${newUserId}`);
      dispatch(showSuccess({ message: `Orders Transfered` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

export const invoiceOrder = createAsyncThunk(
  "orders/invoiceOrder",
  async ({ orderId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/invoice`);
      dispatch(showSuccess({ message: `Invoice Recieved` }));
      return data;
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);
