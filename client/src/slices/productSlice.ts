/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { accurate_date, format_date, format_time } from "../utils/helper_functions";

const product = {
  name: "",
  images: [],
  color_images: [],
  secondary_color_images: [],
  option_images: [],
  secondary_images: [],
  video: "",
  brand: "",
  price: 0,
  wholesale_price: 0,
  wholesale_product: false,
  previous_price: 0,
  category: "",
  product_collection: "",
  categorys: [],
  subcategorys: [],
  subcategory: "",
  countInStock: 0,
  count_in_stock: 0,
  quantity: 0,
  finite_stock: false,
  facts: "",
  included_items: "",
  contributers: [],
  description: "",
  rating: 0,
  numReviews: 0,
  reviews: [],
  hidden: false,
  sale_price: 0,
  sale_start_date: "",
  sale_end_date: "",
  deleted: false,
  preorder: false,
  pathname: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  length: 0,
  width: 0,
  height: 0,
  volume: 0,
  package_length: 0,
  package_width: 0,
  package_height: 0,
  package_volume: 0,
  product_length: 0,
  product_width: 0,
  product_height: 0,
  weight_pounds: 0,
  weight_ounces: 0,
  processing_time: [],
  material_cost: 0,
  filament_used: 0,
  printing_time: 0,
  assembly_time: 0,
  order: 0,
  item_group_id: "",
  chips: [],
  product_options: [],
  group_product: false,
  group_name: "",
  products: [],
  has_add_on: false,
  color_product_group: false,
  color_group_name: "",
  color_products: [],
  filament: {},

  secondary_color_product_group: false,
  secondary_color_group_name: "",
  secondary_color_products: [],
  secondary_product_group: false,
  secondary_group_name: "",
  secondary_products: [],

  option_product_group: false,
  option_group_name: "",
  option_products: [],
  color: "",
  color_code: "",
  size: "",
  sizing: "",
  default_option: false,
  option: false,
  macro_product: false,
  extra_cost: 0,
};

const productPage = createSlice({
  name: "productPage",
  initialState: {
    loading: false,
    products: [],
    product: product,
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
  },
  reducers: {
    set_product: (state, { payload }) => {
      const updated_product = payload;
      return {
        ...state,
        product: { ...state.product, ...updated_product },
      };
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
      state.product = product;
    },
    open_edit_product_modal: (state, { payload }) => {
      state.edit_product_modal = true;
      state.product = payload;
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
  },
  extraReducers: {
    [API.listProducts.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.products = [];
    },
    [API.listProducts.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.products = payload.products;
      state.totalPages = payload.totalPages;
      state.page = payload.currentPage;
      state.message = "Products Found";
    },
    [API.listProducts.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveProduct.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveProduct.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Product Saved";
      state.edit_product_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveProduct.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsProduct.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsProduct.fulfilled as any]: (state: any, { payload }: any) => {
      const start_date = new Date(payload.sale_start_date);
      const end_date = new Date(payload.sale_end_date);
      if (payload.sale_start_date) {
        state.sale_start_date = format_date(accurate_date(start_date));
        state.sale_start_time = format_time(accurate_date(start_date));
      }
      if (payload.sale_end_date) {
        state.sale_end_date = format_date(accurate_date(end_date));
        state.sale_end_time = format_time(accurate_date(end_date));
      }
      state.loading = false;
      state.product = payload;
      state.message = "Product Found";
    },
    [API.detailsProduct.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteProduct.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.success = false;
    },
    [API.deleteProduct.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.product = payload.product;
      state.message = "Product Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteProduct.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMultipleProducts.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteMultipleProducts.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Product Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultipleProducts.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveProductReview.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.success = false;
    },
    [API.saveProductReview.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.success = true;
      state.message = "Product Review Saved";
    },
    [API.saveProductReview.rejected as any]: (state: any, { payload, error }: any) => {
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
} = productPage.actions;
export default productPage.reducer;
