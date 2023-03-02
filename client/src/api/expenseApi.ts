/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { create_query } from "../utils/helper_functions";

export const listExpenses = createAsyncThunk("expenses/listExpenses", async (query: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get("/api/expenses?" + create_query(query), {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const updateExpense = createAsyncThunk("expenses/updateExpense", async (expense: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.put("/api/expenses/" + expense.pathname, expense, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const createExpense = createAsyncThunk("expenses/createExpense", async (expense: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.post("/api/expenses", expense, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const detailsExpense = createAsyncThunk("expenses/detailsExpense", async ({ id }: any, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.get(`/api/expenses/${id}`, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});

export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (pathname, thunkApi: any) => {
  try {
    const {
      userSlice: { current_user }
    } = thunkApi.getState();
    const { data } = await axios.delete("/api/expenses/" + pathname, {
      headers: {
        Authorization: "Bearer " + current_user.access_token
      }
    });
    return data;
  } catch (error) {}
});
