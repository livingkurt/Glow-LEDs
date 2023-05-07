/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const expensePage = createSlice({
  name: "expensePage",
  initialState: {
    loading: false,
    expenses: [],
    expense: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10
  },
  reducers: {
    set_expense: (state, { payload }) => {
      const updated_expense = payload;
      return {
        ...state,
        expense: { ...state.expense, ...updated_expense }
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_search: (state, { payload }) => {
      state.search = payload;
    },
    set_sort: (state, { payload }) => {
      state.sort = payload;
    },
    set_page: (state, { payload }) => {
      state.page = payload;
    },
    set_limit: (state, { payload }) => {
      state.limit = payload;
    }
  },
  extraReducers: {
    [API.listExpenses.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.expenses = [];
    },
    [API.listExpenses.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expenses = payload.expenses;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Expenses Found";
    },
    [API.listExpenses.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveExpense.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveExpense.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Expense Saved";
    },
    [API.saveExpense.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsExpense.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsExpense.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload;
      state.message = "Expense Found";
    },
    [API.detailsExpense.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteExpense.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteExpense.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload.expense;
      state.message = "Expense Deleted";
    },
    [API.deleteExpense.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_expense } = expensePage.actions;
export default expensePage.reducer;
