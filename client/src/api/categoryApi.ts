/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listCategorys = createAsyncThunk("categorys/listCategorys", async (query: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/categorys?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveCategory = createAsyncThunk("categorys/saveCategory", async (category: any, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!category._id) {
      const { data } = await axios.post("/api/categorys", category, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/categorys/${category._id}`, category, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsCategory = createAsyncThunk("categorys/detailsCategory", async (id: string, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/categorys/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteCategory = createAsyncThunk("categorys/deleteCategory", async (pathname, thunkApi: any) => {
  try {
    const {
      users: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/categorys/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
