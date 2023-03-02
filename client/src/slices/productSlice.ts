/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    product: {},
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
    set_product: (state, { payload }) => {
      const updated_product = payload;
      return {
        ...state,
        product: { ...state.product, ...updated_product }
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
    [API.listProducts.pending]: (state: any, { payload }: any) => {
      state.loading = true;
      state.products = [];
    },
    [API.listProducts.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.products = payload.products;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Products Found";
    },
    [API.listProducts.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.createProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.createProduct.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.product = payload.product;
      state.message = "Product Saved";
    },
    [API.createProduct.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.updateProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.updateProduct.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.product = payload.product;
      state.message = "Product Saved";
    },
    [API.updateProduct.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsProduct.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.product = payload;
      state.message = "Product Found";
    },
    [API.detailsProduct.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteProduct.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.product = payload.product;
      state.message = "Product Deleted";
    },
    [API.deleteProduct.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const { set_search, set_sort, set_page, set_limit, set_loading, set_product } = productSlice.actions;
export default productSlice.reducer;
