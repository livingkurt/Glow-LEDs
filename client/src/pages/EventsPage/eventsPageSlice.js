/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";
import { accurate_date, format_date, format_time } from "../../utils/helper_functions";
import { eventInitalState } from "./eventsPageHelpers";

const eventsPage = createSlice({
  name: "eventsPage",
  initialState: {
    loading: false,
    events: [],
    event: eventInitalState,
    color_modifier: "",
    secondary_color_modifier: "",
    option_modifier: "",
    macro_events_list: [],
    option_events_list: [],
    filtered_events: [],
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
    edit_event_modal: false,
    event_modal: false,
    limit: 10,
    selectedOptionType: "",
    eventOptionsGeneratorModal: {
      isOpen: false,
      selectedEvents: [],
      templateEvent: null,
      useTemplate: false,
    },
    editEventHistory: [],
    ourPicksEvents: [],
  },
  reducers: {
    set_event: (state, { payload }) => {
      const updated_event = payload;
      return {
        ...state,
        event: { ...state.event, ...updated_event },
      };
    },
    saveToEditEventHistory: (state, { payload }) => {
      state.editEventHistory.push(payload);
    },

    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_event_modal: (state, { payload }) => {
      state.edit_event_modal = payload;
    },
    open_create_event_modal: (state, { payload }) => {
      state.edit_event_modal = true;
      state.event = eventInitalState;
    },
    openEditEventModal: (state, { payload }) => {
      state.edit_event_modal = true;
      state.event = payload;
    },
    close_edit_event_modal: (state, { payload }) => {
      state.edit_event_modal = false;
    },
    open_event_modal: (state, { payload }) => {
      state.event_modal = true;
      state.event = payload;
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
    set_macro_events_list: (state, { payload }) => {
      state.macro_events_list = payload;
    },
    set_option_events_list: (state, { payload }) => {
      state.option_events_list = payload;
    },
    set_filtered_events: (state, { payload }) => {
      state.filtered_events = payload;
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
    openEventOptionsGeneratorModal: (state, { payload }) => {
      const { selectedEvents, useTemplate } = payload;
      state.eventOptionsGeneratorModal.isOpen = true;
      state.eventOptionsGeneratorModal.selectedEvents = selectedEvents;
      state.eventOptionsGeneratorModal.useTemplate = useTemplate;
    },
    closeEventOptionsGeneratorModal: (state, { payload }) => {
      state.eventOptionsGeneratorModal.isOpen = false;
      state.eventOptionsGeneratorModal.selectedEvents = [];
      state.eventOptionsGeneratorModal.useTemplate = false;
      state.eventOptionsGeneratorModal.selectedOptions = [];
      state.eventOptionsGeneratorModal.templateEvent = null;
    },
    setTemplateEvent: (state, { payload }) => {
      state.eventOptionsGeneratorModal.templateEvent = payload;
    },
    setUseTemplate: (state, { payload }) => {
      state.eventOptionsGeneratorModal.useTemplate = payload;
    },
    setSelectedOptions: (state, { payload }) => {
      state.eventOptionsGeneratorModal.selectedOptions = payload;
    },
    goBackInEditEventHistory: (state, { payload }) => {
      state.event = state.editEventHistory[state.editEventHistory.length - 1];
      state.editEventHistory.pop();
    },
  },
  extraReducers: {
    [API.listEvents.pending]: (state, { payload }) => {
      state.loading = true;
      state.events = [];
    },
    [API.listEvents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.events = payload;
      state.message = "Events Found";
    },
    [API.listEvents.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveEvent.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveEvent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Event Saved";
      if (payload.created) {
        state.event = payload.data;
      }

      if (state.editEventHistory.length > 0) {
        state.event = state.editEventHistory[state.editEventHistory.length - 1];
        state.editEventHistory.pop();
      } else if (state.editEventHistory.length === 0) {
        state.edit_event_modal = false;
      }
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveEvent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsEvent.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsEvent.fulfilled]: (state, { payload }) => {
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
      state.event = data;
      state.message = "Event Found";
      if (openEditModal) {
        state.edit_event_modal = true;
      }
    },
    [API.detailsEvent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteEvent.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.deleteEvent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Event Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteEvent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteMultipleEvents.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteMultipleEvents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Event Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteMultipleEvents.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveEventReview.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.saveEventReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = "Event Review Saved";
    },
    [API.saveEventReview.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsEventPage.pending]: (state, { payload }) => {
      state.eventPageLoading = true;
    },
    [API.detailsEventPage.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        eventPageLoading: false,
        event: payload,
        customizedEvent: {
          name: payload.name,
          description: payload.description,
          facts: payload.facts,
          included_items: payload.included_items,
          images: payload.images,
          price: payload.price,
          wholesale_price: payload.wholesale_price,
          previous_price: payload.previous_price,
          sale_price: payload.sale_price,
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
          // selectedOptions: payload.options.map(option => option.values.find(value => value.isDefault)),
        },
      };
    },
    [API.detailsEventPage.rejected]: (state, { payload }) => {
      state.eventPageLoading = false;
      state.error = payload;
    },
    [API.getOurPicksEvents.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.getOurPicksEvents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ourPickEvents = payload;
      state.success = true;
      state.message = "Event Review Saved";
    },
    [API.getOurPicksEvents.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.generateEventOptions.pending]: (state, { payload }) => {
      state.loading = true;
      state.success = false;
    },
    [API.generateEventOptions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.eventOptionsGeneratorModal.isOpen = false;
      state.eventOptionsGeneratorModal.selectedEvents = [];
      state.eventOptionsGeneratorModal.useTemplate = false;
      state.eventOptionsGeneratorModal.selectedOptions = [];
      state.eventOptionsGeneratorModal.templateEvent = null;
      state.remoteVersionRequirement = Date.now();
    },
    [API.generateEventOptions.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_event,
  set_color_modifier,
  set_secondary_color_modifier,
  set_option_modifier,
  set_macro_events_list,
  set_option_events_list,
  set_filtered_events,
  set_sale_start_date,
  set_sale_start_time,
  set_sale_end_date,
  set_sale_end_time,
  set_loading_options,
  set_new_index,
  set_success,
  set_edit_event_modal,
  open_create_event_modal,
  open_event_modal,
  close_edit_event_modal,
  openEditEventModal,
  setRemoteVersionRequirement,
  setSelectedOptionType,
  openEventOptionsGeneratorModal,
  closeEventOptionsGeneratorModal,
  saveToEditEventHistory,
  goBackInEditEventHistory,
  addOption,
  setTemplateEvent,
  setUseTemplate,
  setSelectedOptions,
} = eventsPage.actions;
export default eventsPage.reducer;
