/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";

const profilePage = createSlice({
  name: "profilePage",
  initialState: {
    year: "",
    month: "",
    start_date: "",
    end_date: "",
    start_end_date: false,
    loading: false
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
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    }
  }
});

export const { set_year, set_month, set_start_date, set_end_date, set_start_end_date, set_loading, setOpenMonthlyCheckinModal } =
  profilePage.actions;
export default profilePage.reducer;
