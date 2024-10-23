import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const eventPage = createSlice({
  name: "eventPage",
  initialState: {
    loading: false,
    events: [],
    event: {
      name: "",
      short_description: "",
      long_description: "",
      start_date: "",
      end_date: "",
      location: "",
      fact: "",
      pathname: "",
      order: null,
      active: false,
    },
    remoteVersionRequirement: 0,
    edit_event_modal: false,
    event_modal: false,
    message: "",
    success: false,
    error: {},
    ticketHolders: [],
  },
  reducers: {
    set_event: (state, { payload }) => {
      const updated_event = payload;
      return {
        ...state,
        event: { ...state.event, ...updated_event },
      };
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
      state.event = {
        affiliate: "",
        title: "",
        video: "",
        description: "",
        categorys: [],
        level: "",
        pathname: "",
        order: null,
        active: false,
      };
    },
    open_edit_event_modal: (state, { payload }) => {
      state.edit_event_modal = true;
      state.event = payload;
    },
    close_event_modal: (state, { payload }) => {
      state.event_modal = false;
      state.event = {
        affiliate: "",
        title: "",
        video: "",
        description: "",
        categorys: [],
        level: "",
        pathname: "",
        order: null,
        active: false,
      };
    },
    open_event_modal: (state, { payload }) => {
      state.event_modal = true;
      state.event = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listEvents.pending]: (state, { payload }) => {
      state.loading = true;
      state.events = [];
    },
    [API.listEvents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.events = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
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
      state.edit_event_modal = false;
      state.success = true;
      state.message = "Event Saved";
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
      state.loading = false;
      state.event = payload;
      state.message = "Event Found";
    },
    [API.detailsEvent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteEvent.pending]: (state, { payload }) => {
      state.loading = true;
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
    [API.getEventTickets.pending]: state => {
      state.loading = true;
    },
    [API.getEventTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tickets = payload;
    },
    [API.getEventTickets.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.getTicketHolders.fulfilled]: (state, { payload }) => {
      state.ticketHolders = payload;
    },
    [API.getTicketHolders.rejected]: (state, { payload, error }) => {
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_event,
  set_edit_event_modal,
  open_create_event_modal,
  open_event_modal,
  close_event_modal,
  open_edit_event_modal,
  setRemoteVersionRequirement,
} = eventPage.actions;
export default eventPage.reducer;
