import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/tagApi";

const tagPage = createSlice({
  name: "tagPage",
  initialState: {
    loading: false,
    tags: [],
    selectedTag: {
      name: "",
      active: true,
    },
    remoteVersionRequirement: 0,
    modalOpen: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_tag: (state, { payload }) => {
      const updated_tag = payload;
      return {
        ...state,
        selectedTag: { ...state.selectedTag, ...updated_tag },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    open_create_tag_modal: state => {
      state.modalOpen = true;
      state.selectedTag = {
        name: "",
        active: true,
      };
    },
    open_edit_tag_modal: (state, { payload }) => {
      state.modalOpen = true;
      state.selectedTag = payload;
    },
    close_tag_modal: state => {
      state.modalOpen = false;
      state.selectedTag = {
        name: "",
        active: true,
      };
    },
    setRemoteVersionRequirement: state => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listTags.pending]: state => {
      state.loading = true;
      state.tags = [];
    },
    [API.listTags.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tags = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Tags Found";
    },
    [API.listTags.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveTag.pending]: state => {
      state.loading = true;
    },
    [API.saveTag.fulfilled]: state => {
      state.loading = false;
      state.modalOpen = false;
      state.success = true;
      state.message = "Tag Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveTag.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsTag.pending]: state => {
      state.loading = true;
    },
    [API.detailsTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.selectedTag = payload;
      state.message = "Tag Found";
    },
    [API.detailsTag.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteTag.pending]: state => {
      state.loading = true;
    },
    [API.deleteTag.fulfilled]: state => {
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
  open_create_tag_modal,
  open_edit_tag_modal,
  close_tag_modal,
  setRemoteVersionRequirement,
} = tagPage.actions;
export default tagPage.reducer;
