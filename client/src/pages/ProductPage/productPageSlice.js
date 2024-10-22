/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import {
  calculateAdditionalCost,
  handlePriceReplacement,
  updatePrice,
  updateProductDetailsFromOption,
} from "./productHelpers";
import * as API from "../../api";
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
    sale_price: 0,
    size: "",
    count_in_stock: 0,
    image: "",
    review_modal: "none",
    rating: 5,
    comment: "",
    isAddonChecked: false,
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
  extraReducers: builder => {
    builder
      .addCase(API.getBasicProductDetails.pending, state => {
        state.productPageLoading = true;
      })
      .addCase(API.getBasicProductDetails.fulfilled, (state, action) => {
        state.productPageLoading = false;
        state.product = { ...state.product, ...action.payload };
        state.customizedProduct = {
          ...state.customizedProduct,
          ...action.payload,
          original_images: action.payload.images,
          display_image_object: action.payload.images[0],
        };
      })
      .addCase(API.getBasicProductDetails.rejected, (state, action) => {
        state.productPageLoading = false;
        state.error = action.error.message;
      })
      .addCase(API.getProductOptions.pending, state => {
        state.productPageLoading = true;
      })
      .addCase(API.getProductOptions.fulfilled, (state, action) => {
        const activeOptions = action.payload.options
          .filter(option => option.active)
          .map(option => ({
            ...option,
            values: option.values.filter(value => value.active),
          }));
        const selectedOptions = action.payload.options
          .map(option => {
            if (!option.active) return null;
            if (option.isAddOn) return {};
            const activeValue = option.values.find(value => value.active && value.isDefault);
            return activeValue || {};
          })
          .filter(Boolean);
        state.product.options = action.payload.options;
        state.customizedProduct.currentOptions = activeOptions;
        state.customizedProduct.selectedOptions = selectedOptions;
      })
      .addCase(API.getProductOptions.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(API.getProductFeatures.fulfilled, (state, action) => {
        state.product = { ...state.product, ...action.payload };
        state.customizedProduct = {
          ...state.customizedProduct,
          ...action.payload,
        };
      })
      .addCase(API.getRelatedProducts.fulfilled, (state, action) => {
        state.product.elevate_your_experience = action.payload.elevate_your_experience;
      })
      .addCase(API.getProductReviews.fulfilled, (state, action) => {
        state.product.reviews = action.payload.reviews;
        state.product.rating = action.payload.rating;
        state.product.numReviews = action.payload.numReviews;
        state.customizedProduct.rating = action.payload.rating;
      });
    // .addMatcher(
    //   action => action.type.endsWith("/fulfilled"),
    //   state => {
    //     state.productPageLoading = false;
    //   }
    // )
    // .addMatcher(
    //   action => action.type.endsWith("/rejected"),
    //   (state, action) => {
    //     state.productPageLoading = false;
    //     state.error = action.error.message;
    //   }
    // );
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
