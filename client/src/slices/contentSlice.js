/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const content = {
  "home_page": {
    "h1": "",
    "image": "",
    "images": [],
    "image_object": null,
    "images_object": [],
    "slideshow": [
      {
        "label": "",
        "image": "",
        "image_object": null,
        "link": "",
      },
    ],
    "video": "",
    "banner_image": "",
    "banner_image_object": null,
    "show_image": true,
    "show_video": false,
    "h2": "",
    "p": "",
    "button": "",
    "link": "",
  },
  "banner": {
    "label": "",
    "button": "",
    "link": "",
  },
  "links": [
    {
      "label": "",
      "link": "",
      "icon": "",
    },
  ],
  "active": true,
};

const contentPage = createSlice({
  name: "contentPage",
  initialState: {
    loading: false,
    contents: [],
    content: content,
    remoteVersionRequirement: 0,
    edit_content_modal: false,
    upload_content_modal: false,
    content_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_content: (state, { payload }) => {
      const updated_content = payload;
      return {
        ...state,
        content: { ...state.content, ...updated_content },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_content_modal: (state, { payload }) => {
      state.edit_content_modal = payload;
    },
    open_create_content_modal: (state, { payload }) => {
      state.edit_content_modal = true;
      state.content = content;
    },
    open_edit_content_modal: (state, { payload }) => {
      state.edit_content_modal = true;
      state.content = payload;
    },
    close_content_modal: (state, { payload }) => {
      state.edit_content_modal = false;
      state.upload_content_modal = false;
      state.content_modal = false;
      state.content = content;
    },
    open_content_modal: (state, { payload }) => {
      state.content_modal = true;
      state.content = payload;
    },
    content_uploaded: (state, { payload }) => {
      state.upload_content_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listContents.pending as any]: (state, { payload }) => {
      state.loading = true;
      state.contents = [];
    },
    [API.listContents.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.contents = payload.contents;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Contents Found";
    },
    [API.listContents.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveContent.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveContent.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.message = "Content Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_content_modal = false;
    },
    [API.saveContent.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsContent.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsContent.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.content = payload;
      state.message = "Content Found";
    },
    [API.detailsContent.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteContent.pending as any]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteContent.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      state.content = content;
      state.message = "Content Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteContent.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_content,
  set_edit_content_modal,
  open_create_content_modal,
  open_content_modal,
  close_content_modal,
  open_edit_content_modal,
  content_uploaded,
} = contentPage.actions;
export default contentPage.reducer;
