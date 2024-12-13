/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import {
  calculateAdditionalCost,
  getActiveOptions,
  getSelectedOptions,
  handlePriceReplacement,
  updatePrice,
  updateProductDetailsFromOption,
} from "./productHelpers";
import { detailsProductPage } from "../../api";
import { productInitialState } from "../ProductsPage/productsPageHelpers";

const productPage = createSlice({
  name: "productPage",
  initialState: {
    name: "",
    description: "",
    facts: "",
    included_items: "",
    quantity: 1,
    images: [],
    price: 0,
    wholesale_price: 0,
    previous_price: 0,
    sale: {
      price: 0,
      start_date: null,
      end_date: null,
    },
    size: "",
    count_in_stock: 0,
    image: "",
    review_modal: "none",
    rating: 5,
    comment: "",
    addonCheckedStates: {},
    productPageLoading: true,
    product: productInitialState,
    customizedProduct: {
      name: "",
      description: "",
      images: [],
      display_image_object: {},
      facts: "",
      included_items: "",
      quantity: 1,
      price: 0,
      previousPriceWithAddOn: 0,
      wholesale_price: 0,
      previous_price: 0,
      sale: {
        price: 0,
        start_date: null,
        end_date: null,
      },
      size: "",
      count_in_stock: 0,
      image: "",
      secondary_image: "",
      secondary_images: [],
      dimensions: {
        package_length: 0,
        package_width: 0,
        package_height: 0,
        package_volume: 0,
        product_length: 0,
        product_width: 0,
        product_height: 0,
        weight_pounds: 0,
        weight_ounces: 0,
      },
      show_add_on: false,
      add_on_price: 0,
      tabIndex: 0,
      review_modal: "none",
      rating: 5,
      comment: "",
      selectedOptions: [],
      currentOptions: [],
    },
  },
  reducers: {
    setCustomizedProduct: (state, { payload }) => {
      const customizedProduct = payload;
      return {
        ...state,
        customizedProduct: { ...state.customizedProduct, ...customizedProduct },
      };
    },
    restoreOriginalImages: state => {
      state.customizedProduct.images = state.customizedProduct.original_images;
    },
    selectOption: (state, { payload }) => {
      const { selectedOption, index, option, fromUrlParams } = payload;

      // Only proceed with selection if:
      // 1. It's not an add-on option, or
      // 2. It is an add-on option AND its specific addon is checked
      if (!option.isAddOn || (option.isAddOn && state.addonCheckedStates[index])) {
        if (selectedOption === undefined) {
          // If the selected option is undefined, remove it from the selectedOptions array
          state.customizedProduct.selectedOptions[index] = {};
          const additionalCost = calculateAdditionalCost(
            state.customizedProduct.selectedOptions,
            state.customizedProduct.currentOptions
          );
          updatePrice(state, additionalCost);
        } else {
          state.customizedProduct.selectedOptions[index] = {
            ...selectedOption,
            isAddOn: option.isAddOn,
            replacePrice: option.replacePrice,
            additionalCost: selectedOption.additionalCost,
          };
          updateProductDetailsFromOption(state, selectedOption, option, fromUrlParams);
          handlePriceReplacement(state, option, selectedOption);
        }
      }
    },
    setQuantity: (state, { payload }) => {
      state.customizedProduct.quantity = payload;
    },
    setIsAddonChecked: (state, { payload }) => {
      const { index, checked } = payload;
      state.addonCheckedStates[index] = checked;

      // When unchecking an add-on, clear its selection
      if (!checked) {
        state.customizedProduct.selectedOptions[index] = {};

        // Recalculate price without the unchecked add-on
        const additionalCost = calculateAdditionalCost(
          state.customizedProduct.selectedOptions,
          state.customizedProduct.currentOptions
        );
        updatePrice(state, additionalCost);
      }
    },
  },
  extraReducers: {
    [detailsProductPage.pending]: state => {
      state.productPageLoading = true;
    },
    [detailsProductPage.fulfilled]: (state, { payload }) => {
      const { data } = payload;

      return {
        ...state,
        productPageLoading: false,
        product: data,
        addonCheckedStates: {},
        customizedProduct: {
          product: data._id,
          name: data.name,
          short_description: data.short_description,
          fact: data.fact,
          images: data.images,
          set_of: data.set_of,
          original_images: data.images,
          display_image_object: data.images[0],
          category: data.category,
          subcategory: data.subcategory,
          product_collection: data.product_collection,
          facts: data.facts,
          included_items: data.included_items,
          price: data.price,
          itemType: "product",
          microlights: data.microlights,
          tags: data.tags,
          wholesale_price: data.wholesale_price,
          previous_price: data.previous_price,
          sale: data.sale,
          size: data.size,
          max_display_quantity: data.max_display_quantity,
          max_quantity: data.max_quantity,
          quantity: 1,
          count_in_stock: data.count_in_stock,
          pathname: data.pathname,
          dimensions: data.dimensions,
          processing_time: data.processing_time,
          rating: data.rating,
          wholesale_product: data.wholesale_product,
          isPreOrder: data.isPreOrder,
          preOrderReleaseDate: data.preOrderReleaseDate,
          preOrderQuantity: data.preOrderQuantity,
          selectedOptions: getSelectedOptions(data),
          currentOptions: getActiveOptions(data),
        },
      };
    },
    [detailsProductPage.rejected]: (state, { payload }) => {
      state.productPageLoading = false;
      state.error = payload;
    },
  },
});

export const {
  setQuantity,
  setReviewModal,
  setCustomizedProduct,
  selectOption,
  setIsAddonChecked,
  restoreOriginalImages,
} = productPage.actions;
export default productPage.reducer;
