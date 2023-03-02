/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listChips = createAsyncThunk("chips/listChips", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/chips?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateChip = createAsyncThunk("chips/updateChip", async (chip: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/chips/" + chip.pathname, chip, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createChip = createAsyncThunk("chips/createChip", async (chip: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/chips", chip, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsChip = createAsyncThunk("chips/detailsChip", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/chips/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteChip = createAsyncThunk("chips/deleteChip", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/chips/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});
