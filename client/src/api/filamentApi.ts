/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listFilaments = createAsyncThunk("filaments/listFilaments", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/filaments?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveFilament = createAsyncThunk("filaments/saveFilament", async (filament: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!filament._id) {
      const { data } = await axios.post("/api/filaments", filament, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/filaments/${filament._id}`, filament, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsFilament = createAsyncThunk("filaments/detailsFilament", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/filaments/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteFilament = createAsyncThunk("filaments/deleteFilament", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/filaments/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
