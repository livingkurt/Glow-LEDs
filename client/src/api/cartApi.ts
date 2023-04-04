/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const getCarts = async ({
  search,
  sorting,
  filters,
  page,
  pageSize
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return axios.get(`/api/carts`, {
      params: {
        limit: pageSize,
        page: page,
        search: search
        // sort: sorting,
        // filters: pickBy(filters, (val: any) => val.length > 0)
      }
    });
  } catch (error) {}
};

export const listCarts = createAsyncThunk("carts/listCarts", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/carts?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const addToCart = createAsyncThunk(
  "carts/addToCart",
  async ({ cart, cart_item, type }: { cart: any; cart_item: any; type: string }, thunkApi: any) => {
    try {
      const {
        userSlice: { current_user }
      } = thunkApi.getState();

      if (!cart._id) {
        const { data } = await axios.post("/api/carts/start_cart", { cart_item, current_user });
        return { data, type };
      } else {
        const { data } = await axios.put(`/api/carts/${cart._id}/add_to_cart`, { cart_item });
        return { data, type };
      }
    } catch (error) {}
  }
);

export const saveCart = createAsyncThunk("carts/saveCart", async (cart: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!cart._id) {
      const { data } = await axios.post("/api/carts", cart, headers(current_user));
      return { data };
    } else {
      const { data } = await axios.put(`/api/carts/${cart._id}`, cart, headers(current_user));
      return { data };
    }
  } catch (error) {}
});

export const detailsCart = createAsyncThunk("carts/detailsCart", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/carts/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const emptyCart = createAsyncThunk("carts/emptyCart", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post(`/api/carts/${id}/empty_cart`, headers(current_user));
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
        cartSlice: {
          cartPage: { my_cart }
        }
      } = thunkApi.getState();
      const { data } = await axios.put(`/api/carts/${my_cart._id}/cart_item/${item_index}`, headers(current_user));
      return { data, type };
    } catch (error) {}
  }
);
