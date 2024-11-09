/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const tag = {
  name: "",
  pathname: "",
  active: true,
};

const tagPage = createSlice({
  name: "tagPage",
  initialState: {
    loading: false,
    tags: [],
    tag: tag,
    remoteVersionRequirement: 0,
    edit_tag_modal: false,
    upload_tag_modal: false,
    tag_modal: false,
    message: "",
    error: {},
  },
  reducers: {
    set_tag: (state, { payload }) => {
      const updated_tag = payload;
      return {
        ...state,
        tag: { ...state.tag, ...updated_tag },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_tag_modal: (state, { payload }) => {
      state.edit_tag_modal = payload;
    },
    open_create_tag_modal: (state, { payload }) => {
      state.edit_tag_modal = true;
      state.tag = tag;
    },
    open_edit_tag_modal: (state, { payload }) => {
      state.edit_tag_modal = true;
      state.tag = payload;
    },
    close_tag_modal: (state, { payload }) => {
      state.edit_tag_modal = false;
      state.upload_tag_modal = false;
      state.tag_modal = false;
      state.tag = tag;
    },
    open_tag_modal: (state, { payload }) => {
      state.tag_modal = true;
      state.tag = payload;
    },
    tag_uploaded: (state, { payload }) => {
      state.upload_tag_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listTags.pending]: (state, { payload }) => {
      state.loading = true;
      state.tags = [];
    },
    [API.listTags.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tags = payload.tags;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Tags Found";
    },
    [API.listTags.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveTag.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Tag Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_tag_modal = false;
    },
    [API.saveTag.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsTag.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tag = payload;
      state.message = "Tag Found";
    },
    [API.detailsTag.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteTag.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Tag Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteTag.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_tag,
  set_edit_tag_modal,
  open_create_tag_modal,
  open_tag_modal,
  close_tag_modal,
  open_edit_tag_modal,
  tag_uploaded,
} = tagPage.actions;
export default tagPage.reducer;
