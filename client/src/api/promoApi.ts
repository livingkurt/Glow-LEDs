/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listPromos = createAsyncThunk("promos/listPromos", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/promos?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const savePromo = createAsyncThunk("promos/savePromo", async (promo: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!promo._id) {
      const { data } = await axios.post("/api/promos", promo, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put("/api/promos/" + promo._id, promo, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsPromo = createAsyncThunk("promos/detailsPromo", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/promos/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deletePromo = createAsyncThunk("promos/deletePromo", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/promos/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
