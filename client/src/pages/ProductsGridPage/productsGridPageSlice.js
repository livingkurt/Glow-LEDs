/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const productsGridPage = createSlice({
  name: "productsGridPage",
  initialState: {
    gridProducts: [],
  },
  reducers: {},
  extraReducers: {
    [API.listGridProducts.pending]: (state, { payload }) => {
      state.loading = true;
      state.gridProducts = [];
    },
    [API.listGridProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.gridProducts = payload;
      state.message = "Products Found";
    },
    [API.listGridProducts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const { listProducts } = productsGridPage.actions;
export default productsGridPage.reducer;
