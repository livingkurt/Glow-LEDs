/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import Covy from "../shared/GlowLEDsComponents/GLCovy/GLCovy";
import axios from "axios";
import { errorMessage } from "../helpers/sharedHelpers";

import { create_query } from "../utils/helper_functions";

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
    return axios.get(`/api/expenses`, {
      params: {
        limit: pageSize,
        page: page,
        search: search,
        sort: sorting,
        filters,
      },
    });
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
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
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const saveExpense = createAsyncThunk("expenses/saveExpense", async (expense: any, thunkApi: any) => {
  try {
    if (!expense._id) {
      const { data } = await axios.post("/api/expenses", expense);
      return data;
    } else {
      const { data } = await axios.put(`/api/expenses/${expense._id}`, expense);
      return data;
    }
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const detailsExpense = createAsyncThunk("expenses/detailsExpense", async (id: string, thunkApi: any) => {
  try {
    const { data } = await axios.get(`/api/expenses/${id}`);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const getExpensesByLink = createAsyncThunk("expenses/getExpensesByLink", async (link: string, thunkApi: any) => {
  try {
    const { data } = await axios.put(`/api/expenses/link`, { link });
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});

export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (pathname, thunkApi: any) => {
  try {
    const { data } = await axios.delete("/api/expenses/" + pathname);
    return data;
  } catch (error) {
    Covy().showSnackbar({
      message: errorMessage(error),
      severity: "error",
    });
    return thunkApi.rejectWithValue(error.response?.data);
  }
});
