/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listCarts = createAsyncThunk("carts/listCarts", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/carts?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateCart = createAsyncThunk("carts/updateCart", async (cart: any, thunkApi: any) => {
  try {
    const {
      userLogin: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/carts/" + cart.pathname, cart, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createCart = createAsyncThunk("carts/createCart", async (cart_item: any, thunkApi: any) => {
  console.log({ cart_item });
  try {
    const {
      userLogin: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/carts", { cart_item, current_user });
    console.log({ data });
    return data;
  } catch (error) {}
});

export const detailsCart = createAsyncThunk("carts/detailsCart", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userLogin: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/carts/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteCart = createAsyncThunk("carts/deleteCart", async (pathname, thunkApi: any) => {
  try {
    const {
      userLogin: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/carts/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});
