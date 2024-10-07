/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import {
  calculateAdditionalCost,
  handlePriceReplacement,
  updatePrice,
  updateProductDetailsFromOption,
} from "./productHelpers";
import { detailsProductPage } from "../../api";

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
    sale_price: 0,
    size: "",
    count_in_stock: 0,
    image: "",
    review_modal: "none",
    rating: 5,
    comment: "",
    product: {},
    isAddonChecked: false,
    productPageLoading: true,
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
      sale_price: 0,
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
      if (selectedOption === undefined) {
        // If the selected option is undefined, remove it from the selectedOptions array
        state.customizedProduct.selectedOptions[index] = {};
        const additionalCost = calculateAdditionalCost(state.customizedProduct.selectedOptions);
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
    },
    setQuantity: (state, { payload }) => {
      state.customizedProduct.quantity = payload;
    },
    setIsAddonChecked: (state, { payload }) => {
      state.isAddonChecked = payload;
    },
  },
  extraReducers: {
    [detailsProductPage.pending]: (state, { payload }) => {
      state.productPageLoading = true;
    },
    [detailsProductPage.fulfilled]: (state, { payload }) => {
      const { data } = payload;

      // Filter active options and their active values
      const activeOptions = data?.options
        ?.filter(option => option.active)
        .map(option => ({
          ...option,
          values: option.values.filter(value => value.active),
        }));

      // Maintain original selectedOptions behavior, but only for active options and values
      const selectedOptions = data?.options
        ?.map(option => {
          if (!option.active) return null;
          if (option.isAddOn) return {};
          const activeValue = option.values.find(value => value.active && value.isDefault);
          return activeValue || {};
        })
        .filter(Boolean);

      return {
        ...state,
        productPageLoading: false,
        product: data,
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
          chips: data.chips,
          tags: data.tags,
          wholesale_price: data.wholesale_price,
          previous_price: data.previous_price,
          sale_price: data.sale_price,
          size: data.size,
          max_display_quantity: data.max_display_quantity,
          max_quantity: data.max_quantity,
          quantity: 1,
          count_in_stock: data.count_in_stock,
          pathname: data.pathname,
          sale_start_date: data.sale_start_date,
          sale_end_date: data.sale_end_date,
          dimensions: data.dimensions,
          processing_time: data.processing_time,
          rating: data.rating,
          wholesale_product: data.wholesale_product,
          isPreOrder: data.isPreOrder,
          preOrderReleaseDate: data.preOrderReleaseDate,
          preOrderQuantity: data.preOrderQuantity,
          selectedOptions,
          currentOptions: activeOptions,
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
