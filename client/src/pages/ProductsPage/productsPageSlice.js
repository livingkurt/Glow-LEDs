/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";
import { accurate_date, format_date, format_time } from "../../utils/helper_functions";
import { productInitalState } from "./productsPageHelpers";

const productsPage = createSlice({
  name: "productsPage",
  initialState: {
    loading: false,
    products: [],
    product: productInitalState,
    color_modifier: "",
    secondary_color_modifier: "",
    option_modifier: "",
    macro_products_list: [],
    option_products_list: [],
    filtered_products: [],
    sale_start_time: "",
    sale_end_time: "",
    sale_start_date: "",
    sale_end_date: "",
    loading_options: "",
    image: "",
    color_image: "",
    secondary_color_image: "",
    secondary_color_ids: [],
    option_image: "",
    secondary_image: "",
    new_index: 0,
    message: "",
    success: false,
    error: {},
    search: "",
    sort: "",
    page: 1,
    remoteVersionRequirement: 0,
    edit_product_modal: false,
    product_modal: false,
    limit: 10,
    selectedOptionType: "",
    productOptionsGeneratorModal: "",
    editProductHistory: [],
  },
  reducers: {
    set_product: (state, { payload }) => {
      const updated_product = payload;
      return {
        ...state,
        product: { ...state.product, ...updated_product },
      };
    },
    saveToEditProductHistory: (state, { payload }) => {
      state.editProductHistory.push(payload);
    },
    goBackInEditProductHistory: (state, { payload }) => {
      state.product = state.editProductHistory[state.editProductHistory.length - 1];
      state.editProductHistory.pop();
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_product_modal: (state, { payload }) => {
      state.edit_product_modal = payload;
    },
    open_create_product_modal: (state, { payload }) => {
      state.edit_product_modal = true;
      state.product = productInitalState;
    },
    open_edit_product_modal: (state, { payload }) => {
      state.edit_product_modal = true;
      // state.product = payload;
    },
    close_edit_product_modal: (state, { payload }) => {
      state.edit_product_modal = false;
    },
    open_product_modal: (state, { payload }) => {
      state.product_modal = true;
      state.product = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    set_color_modifier: (state, { payload }) => {
      state.color_modifier = payload;
    },
    set_secondary_color_modifier: (state, { payload }) => {
      state.secondary_color_modifier = payload;
    },
    set_option_modifier: (state, { payload }) => {
      state.option_modifier = payload;
    },
    set_macro_products_list: (state, { payload }) => {
      state.macro_products_list = payload;
    },
    set_option_products_list: (state, { payload }) => {
      state.option_products_list = payload;
    },
    set_filtered_products: (state, { payload }) => {
      state.filtered_products = payload;
    },
    set_sale_start_date: (state, { payload }) => {
      state.sale_start_date = payload;
    },
    set_sale_start_time: (state, { payload }) => {
      state.sale_start_time = payload;
    },
    set_sale_end_date: (state, { payload }) => {
      state.sale_end_date = payload;
    },
    set_sale_end_time: (state, { payload }) => {
      state.sale_end_time = payload;
    },
    set_loading_options: (state, { payload }) => {
      state.loading_options = payload;
    },
    set_new_index: (state, { payload }) => {
      state.new_index = payload;
    },
    setSelectedOptionType: (state, { payload }) => {
      state.selectedOptionType = payload;
    },
    setModifier: (state, { payload }) => {
      state.selectedOptionType = payload;
    },
    openProductOptionsGeneratorModal: (state, { payload }) => {
      state.productOptionsGeneratorModal = true;
    },
    closeProductOptionsGeneratorModal: (state, { payload }) => {
      state.productOptionsGeneratorModal = false;
    },
    previewProductOptions: (state, { payload }) => {
      state.productOptionsGeneratorModal = false;
    },
  },
  extraReducers: {
    [API.listProducts.pending]: (state, { payload }) => {
      state.loading = true;
      state.products = [];
    },
    [API.listProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      state.message = "Products Found";
    },
    [API.listProducts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Product Saved";
      console.log({ payload });
      if (payload.created) {
        state.product = payload.data;
      }
      if (state.editProductHistory.length > 0) {
        state.product = state.editProductHistory[state.editProductHistory.length - 1];
      } else if (state.editProductHistory.length === 0) {
        state.edit_product_modal = false;
      }
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveProduct.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsProduct.fulfilled]: (state, { payload }) => {
      const { data, openEditModal } = payload;
      const start_date = new Date(data.sale_start_date);
      const end_date = new Date(data.sale_end_date);
      if (data.sale_start_date) {
        state.sale_start_date = format_date(accurate_date(start_date));
        state.sale_start_time = format_time(accurate_date(start_date));
      }
      if (data.sale_end_date) {
        state.sale_end_date = format_date(accurate_date(end_date));
        state.sale_end_time = format_time(accurate_date(end_date));
      }
      state.loading = false;
      state.product = data;
      state.message = "Product Found";
      if (openEditModal) {
        state.edit_product_modal = true;
      }
    },
    [API.detailsProduct.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteProduct.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.deleteProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload.product;
      state.message = "Product Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteProduct.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMultipleProducts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteMultipleProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Product Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultipleProducts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveProductReview.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.saveProductReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = "Product Review Saved";
    },
    [API.saveProductReview.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_product,
  set_color_modifier,
  set_secondary_color_modifier,
  set_option_modifier,
  set_macro_products_list,
  set_option_products_list,
  set_filtered_products,
  set_sale_start_date,
  set_sale_start_time,
  set_sale_end_date,
  set_sale_end_time,
  set_loading_options,
  set_new_index,
  set_success,
  set_edit_product_modal,
  open_create_product_modal,
  open_product_modal,
  close_edit_product_modal,
  open_edit_product_modal,
  setRemoteVersionRequirement,
  setSelectedOptionType,
  openProductOptionsGeneratorModal,
  closeProductOptionsGeneratorModal,
  previewProductOptions,
  saveToEditProductHistory,
  goBackInEditProductHistory,
} = productsPage.actions;
export default productsPage.reducer;
