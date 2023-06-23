/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const expense = {
  id: "",
  expense_name: "",
  application: "",
  url: "",
  place_of_purchase: "",
  date_of_purchase: "",
  category: "",
  card: "",
  amount: 0,
  documents: []
};

const expensePage = createSlice({
  name: "expensePage",
  initialState: {
    loading: false,
    expenses: [],
    expense: expense,
    remoteVersionRequirement: 0,
    edit_expense_modal: false,
    upload_expense_modal: false,
    expense_modal: false,
    message: "",
    error: {}
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
    set_edit_expense_modal: (state, { payload }) => {
      state.edit_expense_modal = payload;
    },
    open_create_expense_modal: (state, { payload }) => {
      state.edit_expense_modal = true;
      state.expense = expense;
    },
    open_edit_expense_modal: (state, { payload }) => {
      state.edit_expense_modal = true;
      state.expense = payload;
    },
    close_expense_modal: (state, { payload }) => {
      state.edit_expense_modal = false;
      state.upload_expense_modal = false;
      state.expense_modal = false;
      state.expense = expense;
    },
    open_expense_modal: (state, { payload }) => {
      state.expense_modal = true;
      state.expense = payload;
    },
    expense_uploaded: (state, { payload }) => {
      state.upload_expense_modal = false;
      state.remoteVersionRequirement = Date.now();
    }
  },
  extraReducers: {
    [API.listExpenses.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.expenses = [];
    },
    [API.listExpenses.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expenses = payload.data;
      state.totalPages = payload.total_count;
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
      state.remoteVersionRequirement = Date.now();
      state.edit_expense_modal = false;
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
    [API.getExpensesByLink.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.getExpensesByLink.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.expense = payload;
      state.message = "Expense Found";
    },
    [API.getExpensesByLink.rejected as any]: (state: any, { payload }: any) => {
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
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteExpense.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_loading,
  set_expense,
  set_edit_expense_modal,
  open_create_expense_modal,
  open_expense_modal,
  close_expense_modal,
  open_edit_expense_modal,
  expense_uploaded
} = expensePage.actions;
export default expensePage.reducer;
