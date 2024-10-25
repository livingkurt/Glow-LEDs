/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import HtmlToReactParser from "html-to-react";

const email = {
  "email_type": "Announcments",
  "header_footer_color": "#333333",
  "background_color": "#7d7c7c",
  "module_color": "#585858",
  "button_color": "#4c4f60",
  "text_color": "#ffffff",
  "title_color": "#ffffff",
  "subject": "",
  "h1": "",
  "image": null,
  "images": [],
  "show_image": true,
  "h2": "",
  "p": "",
  "button": "",
  "link": "",
  "html": "",
  "scheduled_at": "",
  "status": "draft",
  "active": true,
  "deleted": false,
};

const emailPage = createSlice({
  name: "emailPage",
  initialState: {
    loading: false,
    emails: [],
    email: email,
    remoteVersionRequirement: 0,
    edit_email_modal: false,
    upload_email_modal: false,
    email_modal: false,
    message: "",
    error: {},
    testEmail: true,
    loadingContactSend: false,
    successContactSend: false,
    loadingSendAnnouncment: false,
  },
  reducers: {
    set_email: (state, { payload }) => {
      const updated_email = payload;
      return {
        ...state,
        email: { ...state.email, ...updated_email },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_email_modal: (state, { payload }) => {
      state.edit_email_modal = payload;
    },
    open_create_email_modal: (state, { payload }) => {
      state.edit_email_modal = true;
      state.email = email;
    },
    open_edit_email_modal: (state, { payload }) => {
      state.edit_email_modal = true;
      state.email = payload;
    },
    close_email_modal: (state, { payload }) => {
      state.edit_email_modal = false;
      state.upload_email_modal = false;
      state.email_modal = false;
      state.email = email;
    },
    open_email_modal: (state, { payload }) => {
      state.email_modal = true;
      state.email = payload;
    },
    email_uploaded: (state, { payload }) => {
      state.upload_email_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
    setTestEmail: (state, { payload }) => {
      state.testEmail = payload;
    },
    setSuccessContactSend: (state, { payload }) => {
      state.successContactSend = payload;
    },
  },
  extraReducers: {
    [API.listEmails.pending]: (state, { payload }) => {
      state.loading = true;
      state.emails = [];
    },
    [API.listEmails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.emails = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Emails Found";
    },
    [API.listEmails.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveEmail.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Email Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_email_modal = false;
    },
    [API.saveEmail.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsEmail.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.email = payload;
      state.message = "Email Found";
    },
    [API.detailsEmail.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteEmail.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Email Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteEmail.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.sendContactEmail.pending]: (state, { payload }) => {
      state.loadingContactSend = true;
      state.successContactSend = false;
    },
    [API.sendContactEmail.fulfilled]: (state, { payload }) => {
      state.loadingContactSend = false;
      state.successContactSend = true;
    },
    [API.sendContactEmail.rejected]: (state, { payload, error }) => {
      state.loadingContactSend = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },

    [API.viewAnnouncement.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.viewAnnouncement.fulfilled]: (state, { payload }) => {
      state.loading = false;

      const htmlToReactParser = new HtmlToReactParser();
      const reactElement = htmlToReactParser.parse(payload);
      state.template = reactElement;
      state.remoteVersionRequirement = Date.now();
    },
    [API.viewAnnouncement.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.sendAnnouncement.pending]: (state, { payload }) => {
      state.loadingSendAnnouncment = true;
    },
    [API.sendAnnouncement.fulfilled]: (state, { payload }) => {
      state.loadingSendAnnouncment = false;

      state.remoteVersionRequirement = Date.now();
    },
    [API.sendAnnouncement.rejected]: (state, { payload, error }) => {
      state.loadingSendAnnouncment = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_email,
  set_edit_email_modal,
  open_create_email_modal,
  open_email_modal,
  close_email_modal,
  open_edit_email_modal,
  email_uploaded,
  setTestEmail,
  setSuccessContactSend,
} = emailPage.actions;
export default emailPage.reducer;
