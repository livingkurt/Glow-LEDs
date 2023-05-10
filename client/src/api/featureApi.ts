/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

export const listFeatures = createAsyncThunk("features/listFeatures", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/features?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const saveFeature = createAsyncThunk("features/saveFeature", async (feature: any, thunkApi: any) => {
  try {
    if (!feature._id) {
      const { data } = await axios.post("/api/features", feature);
      return data;
    } else {
      const { data } = await axios.put(`/api/features/${feature._id}`, feature);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const detailsFeature = createAsyncThunk("features/detailsFeature", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/features/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});

export const deleteFeature = createAsyncThunk("features/deleteFeature", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/features/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: `Error: ${error}`,
      severity: "error"
    });
  }
});
