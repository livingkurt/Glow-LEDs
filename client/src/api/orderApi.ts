/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";
import { deleteCart } from "./cartApi";

export const listOrders = createAsyncThunk("orders/listOrders", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/orders?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const updateOrder = createAsyncThunk("orders/updateOrder", async (order: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/orders/" + order.pathname, order, headers(current_user));
    return data;
  } catch (error) {}
});

export const createOrder = createAsyncThunk("orders/createOrder", async (order: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/orders/secure", order, headers(current_user));
    sessionStorage.removeItem("shippingAddress");
    return data;
  } catch (error) {}
});

export const createPayOrder = createAsyncThunk(
  "orders/createPayOrder",
  async ({ order, paymentMethod }: { order: any; paymentMethod: any }, thunkApi: any) => {
    try {
      const {
        userSlice: { current_user },
        cartSlice: { my_cart }
      } = thunkApi.getState();
      const { data: order_created } = await axios.post(`/api/orders`, { ...order, user: current_user }, headers(current_user));

      const { data: payment_created } = await axios.put(
        "/api/payments/secure/pay/" + order_created._id,
        { paymentMethod },
        headers(current_user)
      );
      await deleteCart(my_cart._id);
      sessionStorage.removeItem("shippingAddress");
      console.log("order_created", order_created);

      return { order: order_created, payment_created };
    } catch (error) {}
  }
);

export const createPayOrderGuest = createAsyncThunk(
  "orders/createPayOrderGuest",
  async (
    { order, paymentMethod, create_account, password }: { order: any; paymentMethod: any; create_account: boolean; password: string },
    thunkApi: any
  ) => {
    try {
      let user_id = "";
      if (create_account) {
        const { data: create_user } = await axios.post("/api/users/register", {
          first_name: order.shipping.first_name,
          last_name: order.shipping.last_name,
          email: order.shipping.email,
          password: password
        });
        user_id = create_user._id;
        axios.post("/api/emails/account_created", create_user);
      } else if (!create_account) {
        const { data: user } = await axios.get("/api/users/email/" + order.shipping.email);
        if (user && Object.keys(user).length > 0) {
          user_id = user._id;
        } else {
          const { data: new_user } = await axios.post("/api/users/", {
            first_name: order.shipping.first_name,
            last_name: order.shipping.last_name,
            email: order.shipping.email,
            isVerified: true,
            email_subscription: true,
            guest: true,
            password: process.env.REACT_APP_TEMP_PASS
          });
          user_id = new_user._id;
        }
      }

      const { data: order_created } = await axios.post("/api/orders/guest", {
        ...order,
        user: user_id
      });
      const { data: payment_created } = await axios.put("/api/payments/guest/pay/" + order_created._id, {
        paymentMethod
      });
      if (order_created.promo_code) {
        await axios.put("/api/emails/code_used/" + order_created.promo_code);
      }
      sessionStorage.removeItem("shippingAddress");
      return { order: order_created, payment_created };
    } catch (error) {}
  }
);

export const detailsOrder = createAsyncThunk("orders/detailsOrder", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/orders/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/orders/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
