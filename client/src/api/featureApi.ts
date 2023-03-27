/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listFeatures = createAsyncThunk("features/listFeatures", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/features?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveFeature = createAsyncThunk("features/saveFeature", async (feature: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!feature._id) {
      const { data } = await axios.post("/api/features", feature, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/features/${feature._id}`, feature, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsFeature = createAsyncThunk("features/detailsFeature", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/features/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteFeature = createAsyncThunk("features/deleteFeature", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/features/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
