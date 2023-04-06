/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listChips = createAsyncThunk("chips/listChips", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/chips?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveChip = createAsyncThunk("chips/saveChip", async (chip: any, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();

    if (!chip._id) {
      const { data } = await axios.post("/api/chips", chip, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put(`/api/chips/${chip._id}`, chip, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsChip = createAsyncThunk("chips/detailsChip", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/chips/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteChip = createAsyncThunk("chips/deleteChip", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: {
        userPage: { current_user }
      }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/chips/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
