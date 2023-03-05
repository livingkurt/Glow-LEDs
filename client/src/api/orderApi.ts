/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

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
    const { data } = await axios.post("/api/orders", order, headers(current_user));
    return data;
  } catch (error) {}
});

export const createOrderPayment = createAsyncThunk("orders/createOrder", async (order: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post(`/api/orders/${order.id}/pay`, order, headers(current_user));
    return data;
  } catch (error) {}
});

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
