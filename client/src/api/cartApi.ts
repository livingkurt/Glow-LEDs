/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listCarts = createAsyncThunk("carts/listCarts", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/carts?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const updateCart = createAsyncThunk(
  "carts/updateCart",
  async ({ cart, cart_item, type }: { cart: any; cart_item: any; type: string }, thunkApi: any) => {
    console.log({ cart, cart_item });
    try {
      const {
        userSlice: { current_user }
      } = thunkApi.getState();
      const { data } = await axios.put("/api/carts/" + cart._id, { cart_item }, headers(current_user));
      return { data, type };
    } catch (error) {}
  }
);

export const createCart = createAsyncThunk(
  "carts/createCart",
  async ({ cart_item, type }: { cart_item: any; type: string }, thunkApi: any) => {
    try {
      const {
        userSlice: { current_user }
      } = thunkApi.getState();
      const { data } = await axios.post("/api/carts", { cart_item, current_user });
      return { data, type };
    } catch (error) {}
  }
);

export const detailsCart = createAsyncThunk("carts/detailsCart", async ({ id }: { id: string }, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/carts/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteCart = createAsyncThunk("carts/deleteCart", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete(`/api/carts/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteCartItem = createAsyncThunk(
  "carts/deleteCartItem",
  async ({ item_index, type }: { cart: any; item_index: any; type: string }, thunkApi: any) => {
    try {
      const {
        userSlice: { current_user },
        cartSlice: { my_cart }
      } = thunkApi.getState();
      const { data } = await axios.put(`/api/carts/${my_cart._id}/cart_item/${item_index}`, headers(current_user));
      return { data, type };
    } catch (error) {}
  }
);
