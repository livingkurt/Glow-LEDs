/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

export const listParcels = createAsyncThunk("parcels/listParcels", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/parcels?${create_query(query)}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveParcel = createAsyncThunk("parcels/saveParcel", async (parcel: any, thunkApi: any) => {
  try {
    if (!parcel._id) {
      const { data } = await axios.post("/api/parcels", parcel);
      return data;
    } else {
      const { data } = await axios.put(`/api/parcels/${parcel._id}`, parcel);
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

export const detailsParcel = createAsyncThunk("parcels/detailsParcel", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/parcels/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteParcel = createAsyncThunk("parcels/deleteParcel", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/parcels/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
