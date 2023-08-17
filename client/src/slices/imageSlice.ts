/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";
import { format_date } from "../utils/helper_functions";

const imagePage = createSlice({
  name: "imagePage",
  initialState: {
    loading: false,
    images: [],
    image: {
      id: "",
      link: "",
      album: "",
    },
    remoteVersionRequirement: 0,
    edit_image_modal: false,
    upload_image_modal: false,
    image_display_modal: false,
    image_modal: false,
    selected_image: null,
    message: "",
    error: {},
  },
  reducers: {
    set_image: (state, { payload }) => {
      const updated_image = payload;
      return {
        ...state,
        image: { ...state.image, ...updated_image },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_edit_image_modal: (state, { payload }) => {
      state.edit_image_modal = payload;
    },
    open_image_display_modal: (state, { payload }) => {
      state.image_display_modal = true;
      state.selected_image = payload;
    },
    close_image_display_modal: (state, { payload }) => {
      state.image_display_modal = false;
      state.selected_image = null;
    },
    open_create_image_modal: (state, { payload }) => {
      state.upload_image_modal = true;
      state.image = {
        id: "",
        link: "",
        album: "",
      };
    },
    open_edit_image_modal: (state, { payload }) => {
      state.edit_image_modal = true;
      state.image = payload;
    },
    close_image_modal: (state, { payload }) => {
      state.edit_image_modal = false;
      state.upload_image_modal = false;
      state.image_modal = false;
      state.image = {
        id: "",
        link: "",
        album: "",
      };
    },
    open_image_modal: (state, { payload }) => {
      state.image_modal = true;
      state.image = payload;
    },
    image_uploaded: (state, { payload }) => {
      state.upload_image_modal = false;
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listImages.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.images = [];
    },
    [API.listImages.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.images = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Images Found";
    },
    [API.listImages.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveImage.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveImage.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.message = "Image Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveImage.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsImage.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsImage.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.image = payload;
      state.message = "Image Found";
    },
    [API.detailsImage.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.getImagesByLink.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.getImagesByLink.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.image = payload;
      state.message = "Image Found";
    },
    [API.getImagesByLink.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteImage.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteImage.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.image = payload.image;
      state.message = "Image Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteImage.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_image,
  set_edit_image_modal,
  open_create_image_modal,
  open_image_modal,
  close_image_modal,
  open_edit_image_modal,
  image_uploaded,
  open_image_display_modal,
  close_image_display_modal,
} = imagePage.actions;
export default imagePage.reducer;
