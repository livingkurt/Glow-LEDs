/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "./dashboardApi";
import { formatDate } from "../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { getMonthStartEndDates, months } from "./dashboardHelpers";

const today = new Date();
const currentMonth = months[today.getMonth()];
const currentYear = today.getFullYear();

const { start_date, end_date } = getMonthStartEndDates({ year: currentYear, month: currentMonth });
const todayISO = new Date().toISOString();

const dashboardPage = createSlice({
  name: "dashboardPage",
  initialState: {
    year: currentYear.toString(),
    month: currentMonth,
    start_date: start_date,
    end_date: end_date,
    tabIndex: 0,
    number_of_copies: 12,
    gcode_name: [],
    gcode_parts: {},
    filename: "",
    status: "",
    loading: false,
    color_change: false,
    gcodeContinuousModal: false,
  },
  reducers: {
    set_year: (state, { payload }) => {
      state.year = payload;
    },
    resetDateRange: (state, { payload }) => {
      state.year = "";
      state.month = "";
      state.start_date = "2020-08-01";
      state.end_date = formatDate(todayISO);
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
    },
    set_number_of_copies: (state, { payload }) => {
      state.number_of_copies = payload;
    },
    set_gcode_name: (state, { payload }) => {
      state.gcode_name = payload;
    },
    set_gcode_parts: (state, { payload }) => {
      state.gcode_parts = payload;
    },
    set_filename: (state, { payload }) => {
      state.filename = payload;
    },
    set_status: (state, { payload }) => {
      state.status = payload;
    },
    set_color_change: (state, { payload }) => {
      state.color_change = payload;
    },
    setGcodeContinuousModal: (state, { payload }) => {
      state.gcodeContinuousModal = payload;
    },
  },
});

export const {
  set_year,
  set_month,
  set_start_date,
  set_end_date,
  resetDateRange,
  set_loading,
  setTabIndex,
  set_number_of_copies,
  set_gcode_name,
  set_gcode_parts,
  set_filename,
  set_status,
  set_color_change,
  setGcodeContinuousModal,
} = dashboardPage.actions;
export default dashboardPage.reducer;
