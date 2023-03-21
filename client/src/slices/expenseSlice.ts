/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    loading: false,
    expenses: [],
    expense: {},
    message: "",
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    sort_options: ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"],
    colors: [
      { name: "Sponsor", color: "#3e4c6d" },
      { name: "Promoter", color: "#7d5555" },
      { name: "Team", color: "#557d6c" },
      { name: "Not Active", color: "#757575" },
      { name: "Rave Mob", color: "#55797d" }
    ]
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
    [API.listExpenses.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.expenses = [];
    },
    [API.listExpenses.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expenses = payload.expenses;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Expenses Found";
    },
    [API.listExpenses.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveExpense.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveExpense.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload.expense;
      state.message = "Expense Saved";
    },
    [API.saveExpense.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsExpense.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsExpense.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload;
      state.message = "Expense Found";
    },
    [API.detailsExpense.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteExpense.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteExpense.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload.expense;
      state.message = "Expense Deleted";
    },
    [API.deleteExpense.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_expense } = expenseSlice.actions;
export default expenseSlice.reducer;
