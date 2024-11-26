/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";
import { accurate_date, format_date, format_time } from "../../utils/helper_functions";
import { productInitialState } from "./productsPageHelpers";

const productsPage = createSlice({
  name: "productsPage",
  initialState: {
    loading: false,
    products: [],
    product: productInitialState,
    filtered_products: [],
    loading_options: "",
    image: "",
    secondary_color_ids: [],
    new_index: 0,
    message: "",
    success: false,
    error: {},
    search: "",
    sort: "",
    page: 1,
    icon_specs: [],
    remoteVersionRequirement: 0,
    edit_product_modal: false,
    product_modal: false,
    salePriceModalOpen: false,
    limit: 10,
    selectedOptionType: "",
    productOptionsGeneratorModal: {
      isOpen: false,
      selectedProducts: [],
      templateProduct: null,
      useTemplate: false,
    },
    editProductHistory: [],
    ourPicksProducts: [],
    salePriceModal: {
      isOpen: false,
      discountType: { value: "percentage", label: "Percentage Off" },
      discountValue: "20",
      startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      applyToOptions: true,
      selectedTags: [],
      exactTags: [],
      applyToAll: false,
    },
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
      state.product = productInitialState;
    },
    openEditProductModal: (state, { payload }) => {
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
    setSalePriceModalData: (state, action) => {
      state.salePriceModal = {
        ...state.salePriceModal,
        ...action.payload,
      };
    },
    openSalePriceModal: state => {
      state.salePriceModal.isOpen = true;
    },
    closeSalePriceModal: state => {
      state.salePriceModal.isOpen = false;
      state.salePriceModal.discountType = { value: "percentage", label: "Percentage Off" };
      state.salePriceModal.discountValue = "20";
      state.salePriceModal.startDate = new Date(new Date().setDate(new Date().getDate() - 1));
      state.salePriceModal.endDate = new Date(new Date().setDate(new Date().getDate() + 7));
      state.salePriceModal.applyToOptions = true;
      state.salePriceModal.exactTags = false;
      state.salePriceModal.selectedTags = [];
      state.salePriceModal.applyToAll = false;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    set_filtered_products: (state, { payload }) => {
      state.filtered_products = payload;
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
      const { selectedProducts, useTemplate } = payload;
      state.productOptionsGeneratorModal.isOpen = true;
      state.productOptionsGeneratorModal.selectedProducts = selectedProducts;
      state.productOptionsGeneratorModal.useTemplate = useTemplate;
    },
    closeProductOptionsGeneratorModal: (state, { payload }) => {
      state.productOptionsGeneratorModal.isOpen = false;
      state.productOptionsGeneratorModal.selectedProducts = [];
      state.productOptionsGeneratorModal.useTemplate = false;
      state.productOptionsGeneratorModal.selectedOptions = [];
      state.productOptionsGeneratorModal.templateProduct = null;
    },
    setTemplateProduct: (state, { payload }) => {
      state.productOptionsGeneratorModal.templateProduct = payload;
    },
    setUseTemplate: (state, { payload }) => {
      state.productOptionsGeneratorModal.useTemplate = payload;
    },
    setSelectedOptions: (state, { payload }) => {
      state.productOptionsGeneratorModal.selectedOptions = payload;
    },
    goBackInEditProductHistory: (state, { payload }) => {
      state.product = state.editProductHistory[state.editProductHistory.length - 1];
      state.editProductHistory.pop();
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
      if (payload.created) {
        state.product = payload.data;
      }

      if (state.editProductHistory.length > 0) {
        state.product = state.editProductHistory[state.editProductHistory.length - 1];
        state.editProductHistory.pop();
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
      const start_date = new Date(data.sale?.start_date);
      const end_date = new Date(data.sale?.end_date);
      if (data.sale?.start_date) {
        state.sale.start_date = format_date(accurate_date(start_date));
        state.sale.start_time = format_time(accurate_date(start_date));
      }
      if (data.sale?.end_date) {
        state.sale.end_date = format_date(accurate_date(end_date));
        state.sale.end_time = format_time(accurate_date(end_date));
      }
      state.loading = false;
      state.product = data;
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
    [API.detailsProductPage.pending]: (state, { payload }) => {
      state.productPageLoading = true;
    },
    [API.detailsProductPage.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productPageLoading: false,
        product: payload,
        customizedProduct: {
          name: payload.name,
          description: payload.description,
          facts: payload.facts,
          included_items: payload.included_items,
          images: payload.images,
          price: payload.price,
          wholesale_price: payload.wholesale_price,
          previous_price: payload.previous_price,
          sale: payload.sale,
          size: payload.size,
          quantity: payload.quantity,
          count_in_stock: payload.count_in_stock,
          image: payload.image,
          secondary_image: payload.secondary_image,
          secondary_images: payload.secondary_images,
          dimensions: payload.dimensions,
          show_add_on: payload.show_add_on,
          add_on_price: payload.add_on_price,
          has_add_on: payload.has_add_on,
          tabIndex: payload.tabIndex,
          review_modal: payload.review_modal,
          rating: payload.rating,
          comment: payload.comment,
        },
      };
    },
    [API.detailsProductPage.rejected]: (state, { payload }) => {
      state.productPageLoading = false;
      state.error = payload;
    },
    [API.getOurPicksProducts.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.getOurPicksProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ourPickProducts = payload;
      state.success = true;
      state.message = "Product Review Saved";
    },
    [API.getOurPicksProducts.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.generateProductOptions.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.generateProductOptions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productOptionsGeneratorModal.isOpen = false;
      state.productOptionsGeneratorModal.selectedProducts = [];
      state.productOptionsGeneratorModal.useTemplate = false;
      state.productOptionsGeneratorModal.selectedOptions = [];
      state.productOptionsGeneratorModal.templateProduct = null;
      state.remoteVersionRequirement = Date.now();
    },
    [API.generateProductOptions.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.applySale.pending]: (state, { payload }) => {
      state.success = false;
    },
    [API.applySale.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
      state.salePriceModal.isOpen = false;
      state.salePriceModal.discountType = "percentage";
      state.salePriceModal.discountValue = "";
      state.salePriceModal.startDate = "";
      state.salePriceModal.endDate = "";
      state.salePriceModal.applyToOptions = true;
      state.salePriceModal.selectedTags = [];
      state.salePriceModal.applyToAll = false;
    },
    [API.applySale.rejected]: (state, { payload, error }) => {
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_product,
  set_filtered_products,
  set_loading_options,
  set_new_index,
  set_success,
  set_edit_product_modal,
  open_create_product_modal,
  open_product_modal,
  close_edit_product_modal,
  openEditProductModal,
  openSalePriceModal,
  closeSalePriceModal,
  setRemoteVersionRequirement,
  setSelectedOptionType,
  openProductOptionsGeneratorModal,
  closeProductOptionsGeneratorModal,
  saveToEditProductHistory,
  goBackInEditProductHistory,
  addOption,
  setTemplateProduct,
  setUseTemplate,
  setSelectedOptions,
  setSalePriceModalData,
} = productsPage.actions;
export default productsPage.reducer;
