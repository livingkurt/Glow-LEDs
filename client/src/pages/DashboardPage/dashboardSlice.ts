/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "./dashboardApi";
import { formatDate } from "../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

const today = new Date().toISOString();

const dashboardPage = createSlice({
  name: "dashboardPage",
  initialState: {
    year: "",
    month: "",
    start_date: "2020-08-01",
    end_date: formatDate(today),
    tabIndex: 0,
    loading: false
  },
  reducers: {
    set_year: (state, { payload }) => {
      state.year = payload;
    },
    resetDateRange: (state, { payload }) => {
      state.year = "";
      state.month = "";
      state.start_date = "2020-08-01";
      state.end_date = formatDate(today);
    },
    set_month: (state, { payload }) => {
      state.month = payload;
    },
    set_start_date: (state, { payload }) => {
      state.start_date = payload;
    },
    set_end_date: (state, { payload }) => {
      state.end_date = payload;
    },
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    }
  }
});

export const { set_year, set_month, set_start_date, set_end_date, resetDateRange, set_loading, setTabIndex } = dashboardPage.actions;
export default dashboardPage.reducer;
