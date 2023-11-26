/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const glowLedsSlice = createSlice({
  name: "glowLeds",
  initialState: {
    loading: false,
    versions: [],
    version: {},
    message: "",
    error: {},
    show_search_bar: true,
    first_name: "",
    display: false,
    options: [],
    pathname: "",
    search: "",
    chip_name: "",
    environment: "production",
  },
  reducers: {
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_show_search_bar: (state, { payload }) => {
      state.show_search_bar = payload;
    },
    set_first_name: (state, { payload }) => {
      state.first_name = payload;
    },
    setDisplay: (state, { payload }) => {
      state.display = payload;
    },
    set_options: (state, { payload }) => {
      state.options = payload;
    },
    set_pathname: (state, { payload }) => {
      state.pathname = payload;
    },
    set_search: (state, { payload }) => {
      state.search = payload;
    },
    set_chip_name: (state, { payload }) => {
      state.chip_name = payload;
    },
  },

  extraReducers: {
    [API.getEnvironment.fulfilled]: (state, { payload }) => {
      state.environment = payload.environment;
    },
  },
});

export const {
  set_loading,
  set_version,
  set_show_search_bar,
  set_first_name,
  setDisplay,
  set_options,
  set_pathname,
  set_search,
  set_chip_name,
} = glowLedsSlice.actions;
export default glowLedsSlice.reducer;
