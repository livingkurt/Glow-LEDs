/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listCategorys = createAsyncThunk("categorys/listCategorys", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/categorys?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateCategory = createAsyncThunk("categorys/updateCategory", async (category: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/categorys/" + category.pathname, category, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createCategory = createAsyncThunk("categorys/createCategory", async (category: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/categorys", category, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsCategory = createAsyncThunk("categorys/detailsCategory", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/categorys/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteCategory = createAsyncThunk("categorys/deleteCategory", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/categorys/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});
