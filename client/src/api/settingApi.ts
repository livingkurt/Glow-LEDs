/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const listSettings = createAsyncThunk("settings/listSettings", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/settings?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveSetting = createAsyncThunk("settings/saveSetting", async (setting: any, thunkApi: any) => {
  try {
    if (!setting._id) {
      const { data } = await axios.post("/api/settings", setting);
      return data;
    } else {
      const { data } = await axios.put(`/api/settings/${setting._id}`, setting);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsSetting = createAsyncThunk("settings/detailsSetting", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/settings/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteSetting = createAsyncThunk("settings/deleteSetting", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/settings/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
