import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/ticketApi";

const ticketPage = createSlice({
  name: "ticketPage",
  initialState: {
    loading: false,
    tickets: [],
    ticket: {
      affiliate: "",
      title: "",
      video: "",
      description: "",
      categorys: [],
      level: "",
      pathname: "",
      order: null,
      active: false,
    },
    remoteVersionRequirement: 0,
    edit_ticket_modal: false,
    ticket_modal: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_ticket: (state, { payload }) => {
      const updated_ticket = payload;
      return {
        ...state,
        ticket: { ...state.ticket, ...updated_ticket },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_ticket_modal: (state, { payload }) => {
      state.edit_ticket_modal = payload;
    },
    open_create_ticket_modal: (state, { payload }) => {
      state.edit_ticket_modal = true;
      state.ticket = {
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
    open_edit_ticket_modal: (state, { payload }) => {
      state.edit_ticket_modal = true;
      state.ticket = payload;
    },
    close_ticket_modal: (state, { payload }) => {
      state.ticket_modal = false;
      state.ticket = {
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
    open_ticket_modal: (state, { payload }) => {
      state.ticket_modal = true;
      state.ticket = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listTickets.pending]: (state, { payload }) => {
      state.loading = true;
      state.tickets = [];
    },
    [API.listTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tickets = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Tickets Found";
    },
    [API.listTickets.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveTicket.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.edit_ticket_modal = false;
      state.success = true;
      state.message = "Ticket Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveTicket.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsTicket.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ticket = payload;
      state.message = "Ticket Found";
    },
    [API.detailsTicket.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteTicket.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteTicket.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Ticket Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteTicket.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_ticket,
  set_edit_ticket_modal,
  open_create_ticket_modal,
  open_ticket_modal,
  close_ticket_modal,
  open_edit_ticket_modal,
  setRemoteVersionRequirement,
} = ticketPage.actions;
export default ticketPage.reducer;
