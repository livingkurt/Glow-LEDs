/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { accurate_date, format_date, format_time } from "../utils/helper_functions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    product: {
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
      extra_cost: 0
    },
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
    [API.saveProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveProduct.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Product Saved";
    },
    [API.saveProduct.rejected]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsProduct.pending]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsProduct.fulfilled]: (state: any, { payload }: any) => {
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

export const {
  set_search,
  set_sort,
  set_page,
  set_limit,
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
  set_new_index
} = productSlice.actions;
export default productSlice.reducer;
