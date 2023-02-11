/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "./dashboardApi";

const dashboardsSlice = createSlice({
  name: "dashboards",
  initialState: {
    year: "",
    month: "",
    start_date: "",
    end_date: "",
    start_end_date: false
  },
  reducers: {
    set_year: (state, { payload }) => {
      state.year = payload;
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
    set_start_end_date: (state, { payload }) => {
      state.start_end_date = payload;
    }
  }
});

export const { set_year, set_month, set_start_date, set_end_date, set_start_end_date } = dashboardsSlice.actions;
export default dashboardsSlice.reducer;
// [{
//   month: "january",
//   totalPrice: 0.00,
// },{month: "february", totalPrice: 0.00,},
// {month: "march", totalPrice: 0.00,},
// {month: "april", totalPrice: 0.00,},
// {month: "may", totalPrice: 0.00,},
// {month: "june", totalPrice: 0.00,},
// {month: "july", totalPrice: 0.00,},
// {month: "august", totalPrice: 0.00,},
// {month: "september", totalPrice: 0.00,},
// {month: "october", totalPrice: 0.00,},
// {month: "november", totalPrice: 0.00,},
// {month: "december", totalPrice: 0.00,}

// ]
