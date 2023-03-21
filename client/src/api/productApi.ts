/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listProducts = createAsyncThunk("products/listProducts", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/products?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveProduct = createAsyncThunk("products/saveProduct", async (product: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!product._id) {
      const { data } = await axios.post("/api/products", product, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put("/api/products/" + product._id, product, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsProduct = createAsyncThunk("products/detailsProduct", async (pathname: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/products/${pathname}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/products/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
