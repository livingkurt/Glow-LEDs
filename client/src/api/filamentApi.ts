/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const listFilaments = createAsyncThunk("filaments/listFilaments", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/filaments?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveFilament = createAsyncThunk("filaments/saveFilament", async (filament: any, thunkApi: any) => {
  try {
    if (!filament._id) {
      const { data } = await axios.post("/api/filaments", filament);
      return data;
    } else {
      const { data } = await axios.put(`/api/filaments/${filament._id}`, filament);
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsFilament = createAsyncThunk("filaments/detailsFilament", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/filaments/${id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteFilament = createAsyncThunk("filaments/deleteFilament", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/filaments/" + pathname);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
