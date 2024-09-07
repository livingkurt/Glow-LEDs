/* eslint-disable max-lines-per-function */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import axios from "axios";
import { errorMessage } from "../../helpers/sharedHelpers";
import {
  calculateAdditionalCost,
  handlePriceReplacement,
  updatePrice,
  updateEventDetailsFromOption,
} from "./eventHelpers";

export const detailsEventPage = createAsyncThunk(
  "events/detailsEventPage",
  async ({ pathname, openEditModal }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events/${pathname}`);
      dispatch(showSuccess({ message: `Event Found` }));
      return { data, openEditModal };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

const eventPage = createSlice({
  name: "eventPage",
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
    event: {},
    isAddonChecked: false,
    eventPageLoading: true,
    customizedEvent: {
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
        event_length: 0,
        event_width: 0,
        event_height: 0,
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
    setCustomizedEvent: (state, { payload }) => {
      const customizedEvent = payload;
      return {
        ...state,
        customizedEvent: { ...state.customizedEvent, ...customizedEvent },
      };
    },
    restoreOriginalImages: state => {
      state.customizedEvent.images = state.customizedEvent.original_images;
    },
    selectOption: (state, { payload }) => {
      const { selectedOption, index, option, fromUrlParams } = payload;
      if (selectedOption === undefined) {
        // If the selected option is undefined, remove it from the selectedOptions array
        state.customizedEvent.selectedOptions[index] = {};
        const additionalCost = calculateAdditionalCost(state.customizedEvent.selectedOptions);
        updatePrice(state, additionalCost);
      } else {
        state.customizedEvent.selectedOptions[index] = {
          ...selectedOption,
          isAddOn: option.isAddOn,
          replacePrice: option.replacePrice,
          additionalCost: selectedOption.additionalCost,
        };
        updateEventDetailsFromOption(state, selectedOption, option, fromUrlParams);
        handlePriceReplacement(state, option, selectedOption);
      }
    },
    setQuantity: (state, { payload }) => {
      state.customizedEvent.quantity = payload;
    },
    setIsAddonChecked: (state, { payload }) => {
      state.isAddonChecked = payload;
    },
  },
  extraReducers: {
    [detailsEventPage.pending]: (state, { payload }) => {
      state.eventPageLoading = true;
    },
    [detailsEventPage.fulfilled]: (state, { payload }) => {
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
        eventPageLoading: false,
        event: data,
        customizedEvent: {
          event: data._id,
          name: data.name,
          short_description: data.short_description,
          fact: data.fact,
          images: data.images,
          set_of: data.set_of,
          original_images: data.images,
          display_image_object: data.images[0],
          category: data.category,
          subcategory: data.subcategory,
          event_collection: data.event_collection,
          facts: data.facts,
          included_items: data.included_items,
          price: data.price,
          chips: data.chips,
          wholesale_price: data.wholesale_price,
          previous_price: data.previous_price,
          sale_price: data.sale_price,
          size: data.size,
          max_quantity: data.max_quantity,
          quantity: 1,
          count_in_stock: data.count_in_stock,
          pathname: data.pathname,
          sale_start_date: data.sale_start_date,
          sale_end_date: data.sale_end_date,
          dimensions: data.dimensions,
          processing_time: data.processing_time,
          rating: data.rating,
          wholesale_event: data.wholesale_event,
          selectedOptions,
          currentOptions: activeOptions,
        },
      };
    },
    [detailsEventPage.rejected]: (state, { payload }) => {
      state.eventPageLoading = false;
      state.error = payload;
    },
  },
});

export const {
  setQuantity,
  setReviewModal,
  setCustomizedEvent,
  selectOption,
  setIsAddonChecked,
  restoreOriginalImages,
} = eventPage.actions;
export default eventPage.reducer;
