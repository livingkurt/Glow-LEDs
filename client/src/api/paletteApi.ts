/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listPalettes = createAsyncThunk("palettes/listPalettes", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/palettes?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const savePalette = createAsyncThunk("palettes/savePalette", async (palette: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!palette._id) {
      const { data } = await axios.post("/api/palettes", palette, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put("/api/palettes/" + palette._id, palette, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsPalette = createAsyncThunk("palettes/detailsPalette", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/palettes/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deletePalette = createAsyncThunk("palettes/deletePalette", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/palettes/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
