import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const articlePage = createSlice({
  name: "articlePage",
  initialState: {
    loading: false,
    articles: [],
    article: {
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
    edit_article_modal: false,
    article_modal: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_article: (state, { payload }) => {
      const updated_article = payload;
      return {
        ...state,
        article: { ...state.article, ...updated_article },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_article_modal: (state, { payload }) => {
      state.edit_article_modal = payload;
    },
    open_create_article_modal: (state, { payload }) => {
      state.edit_article_modal = true;
      state.article = {
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
    open_edit_article_modal: (state, { payload }) => {
      state.edit_article_modal = true;
      state.article = payload;
    },
    close_article_modal: (state, { payload }) => {
      state.article_modal = false;
      state.article = {
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
    open_article_modal: (state, { payload }) => {
      state.article_modal = true;
      state.article = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listArticles.pending]: (state, { payload }) => {
      state.loading = true;
      state.articles = [];
    },
    [API.listArticles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Articles Found";
    },
    [API.listArticles.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveArticle.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.edit_article_modal = false;
      state.success = true;
      state.message = "Article Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveArticle.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsArticle.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.article = payload;
      state.message = "Article Found";
    },
    [API.detailsArticle.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteArticle.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Article Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteArticle.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_article,
  set_edit_article_modal,
  open_create_article_modal,
  open_article_modal,
  close_article_modal,
  open_edit_article_modal,
  setRemoteVersionRequirement,
} = articlePage.actions;
export default articlePage.reducer;
