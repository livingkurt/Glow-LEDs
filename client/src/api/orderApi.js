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

export const createNoPayOrder = createAsyncThunk(
  "orders/createNoPayOrder",
  async (order, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/orders", order);
      // dispatch(
      //   sendOrderEmail({
      //     order: data,
      //     subject: "Thank you for your Glow LEDs Order",
      //     email: order.shipping.email,
      //   })
      // );
      // dispatch(
      //   sendOrderEmail({
      //     order: data,
      //     subject: "New Order Created by " + order.shipping.first_name,
      //     email: config.REACT_APP_INFO_EMAIL,
      //   })
      // );
      sessionStorage.removeItem("shippingAddress");
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

export const createPayOrder = createAsyncThunk(
  "orders/createPayOrder",
  async ({ order, paymentMethod, create_account, new_password }, { dispatch, rejectWithValue, getState }) => {
    let user_id = null;

    const {
      users: {
        userPage: { current_user },
      },
      placeOrder: { environment },
    } = getState();

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
      dispatch(
        sendOrderEmail({
          order: order_created,
          subject: "Thank you for your Glow LEDs Order",
          email: order.shipping.email,
        })
      );
      dispatch(
        sendOrderEmail({
          order: order_created,
          subject: "New Order Created by " + order.shipping.first_name,
          email: config.REACT_APP_INFO_EMAIL,
        })
      );
      if (order.orderItems.some(item => item.itemType === "ticket")) {
        dispatch(
          sendTicketEmail({
            order: order_created,
            subject: "New Order Created by " + order.shipping.first_name,
            email: order.shipping.email,
          })
        );
      }
      sessionStorage.removeItem("shippingAddress");
      return { order: order_created, payment_created };
    } catch (error) {
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
