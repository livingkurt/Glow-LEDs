/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listPaychecks = createAsyncThunk("paychecks/listPaychecks", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/paychecks?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const updatePaycheck = createAsyncThunk("paychecks/updatePaycheck", async (paycheck: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/paychecks/" + paycheck.pathname, paycheck, headers(current_user));
    return data;
  } catch (error) {}
});

export const createPaycheck = createAsyncThunk("paychecks/createPaycheck", async (paycheck: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/paychecks", paycheck, headers(current_user));
    return data;
  } catch (error) {}
});

export const detailsPaycheck = createAsyncThunk("paychecks/detailsPaycheck", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/paychecks/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deletePaycheck = createAsyncThunk("paychecks/deletePaycheck", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/paychecks/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
