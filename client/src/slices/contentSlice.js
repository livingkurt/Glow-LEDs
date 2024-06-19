/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const content = {
  name: "",
  home_page: {
    featured_products: [],
    featured_products_hidden: false,
    learn_more_products: [
      {
        label: "",
        fact: "",
        image: null,
        link: "",
        button_text: "",
      },
    ],
    learn_more_products_hidden: false,
    learn_highlights: {
      title: "",
      description: "",
      images_data: [
        {
          image: null,
          link: "",
          label: "",
        },
      ],
      link: "",
      button_text: "",
      hidden: false,
      fact: "",
    },
    discover_more: {
      title: "",
      subtitle: "",
      image: null,
      button_text: "",
      hidden: false,
      link: "",
    },
    get_more_out_of: {
      title: "",
      description: "",
      image: null,
      button_text: "",
      hidden: false,
      link: "",
    },
    product_protection_details: [
      {
        title: "",
        description: "",
      },
    ],
    product_protection_details_hidden: false,
    slideshow: [
      {
        label: "",
        fact: "",
        image: null,
        link: "",
        button_text: "",
      },
    ],
    slideshow_hidden: false,
    video: "",
    video_hidden: false,
  },
  banner: {
    label: "",
    button: "",
    link: "",
  },
  about_page: {
    title: "",
    subtitle: "",
    video: "",
    sections: [
      {
        title: "",
        description: "",
        image: null,
      },
    ],
    footer_title: "",
  },
  links: [
    {
      label: "",
      link: "",
      icon: "",
    },
  ],
  active: true,
  deleted: false,
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
    menuItems: [],
    loadingSlideshowImages: false,
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
    setMenuItems: (state, { payload }) => {
      state.menuItems = payload;
    },
  },
  extraReducers: {
    [API.listContents.pending]: (state, { payload }) => {
      state.loading = true;
      state.contents = [];
    },
    [API.listContents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.contents = payload.contents;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Contents Found";
    },
    [API.listContents.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveContent.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveContent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Content Saved";
      state.remoteVersionRequirement = Date.now();
      state.edit_content_modal = false;
    },
    [API.saveContent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsContent.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsContent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.content = payload;
      state.message = "Content Found";
    },
    [API.detailsContent.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.getSlideshowImages.pending]: (state, { payload }) => {
      state.loadingSlideshowImages = true;
    },
    [API.getSlideshowImages.fulfilled]: (state, { payload }) => {
      state.loadingSlideshowImages = false;
      state.menuItems = payload.home_page.slideshow;
      state.banner = payload.banner;
      state.message = "Slideshow Found";
    },
    [API.getSlideshowImages.rejected]: (state, { payload, error }) => {
      state.loadingSlideshowImages = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteContent.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteContent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Content Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteContent.rejected]: (state, { payload, error }) => {
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
  setMenuItems,
} = contentPage.actions;
export default contentPage.reducer;
