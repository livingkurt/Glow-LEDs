/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../utils/helpers/user_helpers";
import { create_query } from "../utils/helper_functions";

export const listExpenses = createAsyncThunk("expenses/listExpenses", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/expenses?${create_query(query)}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const saveExpense = createAsyncThunk("expenses/saveExpense", async (expense: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();

    if (!expense._id) {
      const { data } = await axios.post("/api/expenses", expense, headers(current_user));
      return data;
    } else {
      const { data } = await axios.put("/api/expenses/" + expense._id, expense, headers(current_user));
      return data;
    }
  } catch (error) {}
});

export const detailsExpense = createAsyncThunk("expenses/detailsExpense", async (id: string, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/expenses/${id}`, headers(current_user));
    return data;
  } catch (error) {}
});

export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/expenses/" + pathname, headers(current_user));
    return data;
  } catch (error) {}
});
