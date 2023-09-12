/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError } from "../slices/snackbarSlice";

export const listChips = createAsyncThunk("chips/listChips", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/chips?${create_query(query)}`);
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveChip = createAsyncThunk("chips/saveChip", async (chip: any, thunkApi: any) => {
  try {
    if (!chip._id) {
      const { data } = await axios.post("/api/chips", chip);
      return data;
    } else {
      const { data } = await axios.put(`/api/chips/${chip._id}`, chip);
      return data;
    }
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsChip = createAsyncThunk("chips/detailsChip", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/chips/${id}`);
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteChip = createAsyncThunk("chips/deleteChip", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/chips/" + pathname);
    return data;
  } catch (error: any) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
