/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";
import { showError, showSuccess } from "../slices/snackbarSlice";
import store from "../store";

export const getExpenses = async ({
  search,
  sorting,
  filters,
  page,
  pageSize,
}: {
  search: string;
  sorting: any;
  filters: any;
  page: number;
  pageSize: number;
}) => {
  try {
    return await axios.get(`/api/expenses`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters: JSON.stringify(filters),
      },
    });
  } catch (error) {
    store.dispatch(showError({ message: errorMessage(error) }));
  }
};

export const getExpenseFilters = async () => {
  const { data } = await axios.get(`/api/expenses/filters`);
  return data;
};

export const listExpenses = createAsyncThunk("expenses/listExpenses", async (query: any, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/expenses?${create_query(query)}`);
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveExpense = createAsyncThunk("expenses/saveExpense", async (expense: any, thunkApi: any) => {
  try {
    if (!expense._id) {
      const { data } = await axios.post("/api/expenses", expense);
      thunkApi.dispatch(showSuccess({ message: `Expense Created` }));
      return data;
    } else {
      const { data } = await axios.put(`/api/expenses/${expense._id}`, expense);
      thunkApi.dispatch(showSuccess({ message: `Expense Updated` }));
      return data;
    }
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsExpense = createAsyncThunk("expenses/detailsExpense", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/expenses/${id}`);
    thunkApi.dispatch(showSuccess({ message: `Expense Found` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getExpensesByLink = createAsyncThunk("expenses/getExpensesByLink", async (link: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/expenses/link`, { link });
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/expenses/" + pathname);
    thunkApi.dispatch(showSuccess({ message: `Expense Deleted` }));
    return data;
  } catch (error) {
    thunkApi.dispatch(showError({ message: errorMessage(error) }));
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
