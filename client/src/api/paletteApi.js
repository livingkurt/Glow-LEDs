/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const listPalettes = createAsyncThunk("palettes/listPalettes", async (query, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/palettes?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const savePalette = createAsyncThunk("palettes/savePalette", async (palette, thunkApi) => {
  try {
    if (!palette._id) {
      const { data } = await axios.post("/api/palettes", palette);
      return data;
    } else {
      const { data } = await axios.put(`/api/palettes/${palette._id}`, palette);
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsPalette = createAsyncThunk("palettes/detailsPalette", async (id, thunkApi) => {
  try {
    const { data } = await axios.get(`/api/palettes/${id}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deletePalette = createAsyncThunk("palettes/deletePalette", async (pathname, thunkApi) => {
  try {
    const { data } = await axios.delete("/api/palettes/" + pathname);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
