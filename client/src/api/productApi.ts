/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listProducts = createAsyncThunk("products/listProducts", async (query: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/products?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/products/" + product.pathname, product, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createProduct = createAsyncThunk("products/createProduct", async (product: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/products", product, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsProduct = createAsyncThunk("products/detailsProduct", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/products/${id}`, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (pathname, thunkApi: any) => {
  try {
    const {
      userLogin: { userInfo }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/products/" + pathname, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    return data;
  } catch (error) {}
});
