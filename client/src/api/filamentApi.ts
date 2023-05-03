/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { create_query } from "../utils/helper_functions";

export const listFilaments = createAsyncThunk("filaments/listFilaments", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/filaments?${create_query(query)}`);
    return data;
  } catch (error) {}
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
  } catch (error) {}
});

export const detailsFilament = createAsyncThunk("filaments/detailsFilament", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/filaments/${id}`);
    return data;
  } catch (error) {}
});

export const deleteFilament = createAsyncThunk("filaments/deleteFilament", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/filaments/" + pathname);
    return data;
  } catch (error) {}
});
