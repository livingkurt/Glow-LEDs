/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listSettings = createAsyncThunk("settings/listSettings", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/settings?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveSetting = createAsyncThunk("settings/saveSetting", async (setting: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!setting._id) {
      const { data } = await axios.post("/api/settings", setting, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put("/api/settings/" + setting._id, setting, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsSetting = createAsyncThunk("settings/detailsSetting", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/settings/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteSetting = createAsyncThunk("settings/deleteSetting", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/settings/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
