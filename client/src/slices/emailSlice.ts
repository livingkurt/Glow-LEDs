/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
const HtmlToReactParser = require("html-to-react").Parser;

const email = {
  "email_type": "Announcments",
  "header_footer_color": "",
  "background_color": "",
  "module_color": "",
  "button_color": "",
  "text_color": "",
  "title_color": "",
  "subject": "",
  "h1": "",
  "image": "",
  "images": [],
  "image_object": null,
  "images_object": [],
  "images_objects": [],
  "show_image": true,
  "h2": "",
  "p": "",
  "button": "",
  "link": "",
  "html": "",
  "scheduled_at": null,
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
  },
  extraReducers: {
    [API.listEmails.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.emails = [];
    },
    [API.listEmails.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.emails = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Emails Found";
    },
    [API.listEmails.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveEmail.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveEmail.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Email Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_email_modal = false;
    },
    [API.saveEmail.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsEmail.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsEmail.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = payload;
      state.message = "Email Found";
    },
    [API.detailsEmail.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteEmail.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteEmail.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.email = email;
      state.message = "Email Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteEmail.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.viewAnnouncement.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.viewAnnouncement.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;

      const htmlToReactParser = new HtmlToReactParser();
      const reactElement = htmlToReactParser.parse(payload);
      state.template = reactElement;
      state.remoteVersionRequirement = Date.now();
    },
    [API.viewAnnouncement.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
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
} = emailPage.actions;
export default emailPage.reducer;
