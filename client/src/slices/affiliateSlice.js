/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api";

const affiliate = {
  user: null,
  products: [],
  microlights: [],
  artist_name: "",
  instagram_handle: "",
  facebook_name: "",
  youtube_link: "",
  facebook_link: "",
  instagram_link: "",
  tiktok_link: "",
  tiktok: "",
  percentage_off: 0,
  public_code: null,
  private_code: null,
  location: "",
  years: "",
  start_year: "",
  bio: "",
  picture: "",
  video: "",
  style: "",
  inspiration: "",
  link: "",
  venmo: "",
  pathname: "",
  answers: [],
  promoter: true,
  rave_mob: false,
  team: false,
  sponsor: false,
  active: true,
  deleted: false,
};

const affiliatePage = createSlice({
  name: "affiliatePage",
  initialState: {
    loading: false,
    affiliates: [],
    affiliate: affiliate,
    remoteVersionRequirement: 0,
    edit_affiliate_modal: false,
    affiliate_modal: false,
    message: "",
    month_earnings: { revenue: 0, number_of_uses: 0 },
    loading_month_earnings: false,
    year_earnings: { revenue: 0, number_of_uses: 0 },
    loading_year_earnings: false,
    success: false,
    error: {},
    search: "",
    sort: "",
    page: 1,
    limit: 10,
    month: "",
    year: "",
    files: [],
    monthlyCheckinModal: false,
    monthlyCheckinSuccess: false,
    loadingSaveAffiliate: false,
    questionsConcerns: "",
    numberOfContent: 0,
    createAffiliateStep: 0,
    task: {
      taskName: "",
      points: 0,
      jiraLink: "",
      driveLink: "",
    },
    sponsorTaskModal: {
      isOpen: false,
      affiliate: null,
      task: {
        taskName: "",
        points: 0,
        jiraLink: "",
        driveLink: "",
      },
    },
    productBundle: {
      title: "",
      subtitle: "",
      short_description: "",
    },
  },
  reducers: {
    set_affiliate: (state, { payload }) => {
      const updated_affiliate = payload;
      return {
        ...state,
        affiliate: { ...state.affiliate, ...updated_affiliate },
      };
    },
    set_sponsor_task: (state, { payload }) => {
      const updated_sponsor_task = payload;
      return {
        ...state,
        task: { ...state.task, ...updated_sponsor_task },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = payload;
    },
    open_create_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = true;
      state.affiliate = affiliate;
    },
    open_edit_affiliate_modal: (state, { payload }) => {
      state.edit_affiliate_modal = true;
      state.affiliate = payload;
    },
    close_affiliate_modal: (state, { payload }) => {
      state.affiliate_modal = false;
      state.affiliate = affiliate;
    },
    open_affiliate_modal: (state, { payload }) => {
      state.affiliate_modal = true;
      state.affiliate = payload;
    },
    setMonth: (state, { payload }) => {
      state.month = payload;
    },
    setFiles: (state, { payload }) => {
      state.files = payload;
    },
    openMonthlyCheckinModal: (state, { payload }) => {
      const { month, year } = payload;
      state.monthlyCheckinModal = true;
      state.month = month;
      state.year = year;
      state.numberOfContent = 0;
      state.questionsConcerns = "";
    },
    closeMonthlyCheckinModal: (state, { payload }) => {
      state.monthlyCheckinModal = false;
      state.month = "";
      state.year = "";
    },
    setNumberOfContent: (state, { payload }) => {
      state.numberOfContent = payload;
    },
    setCheckin: (state, { payload }) => {
      const { numberOfContent, questionsConcerns } = payload;
      state.numberOfContent = numberOfContent;
      state.questionsConcerns = questionsConcerns;
    },
    setQuestion: (state, { payload }) => {
      state.questionsConcerns = payload;
    },
    addNewCheckin: (state, { payload }) => {
      state.affiliate = payload;
    },
    showStripeAccountLink: (state, { payload }) => {
      state.stripeAccountLinkModal = true;
      state.stripeAccountLink = payload.link;
    },
    setCreateAffiliateStep: (state, { payload }) => {
      state.createAffiliateStep = payload;
    },
    openCreateProductBundleModal: (state, { payload }) => {
      state.create_product_bundle_modal = true;
    },
    closeCreateProductBundleModal: (state, { payload }) => {
      state.create_product_bundle_modal = false;
    },
    setProductBundle: (state, { payload }) => {
      state.productBundle = { ...state.productBundle, ...payload };
    },
    open_sponsor_task_modal: (state, action) => {
      state.sponsorTaskModal = {
        isOpen: true,
        affiliate: action.payload,
      };
    },
    close_sponsor_task_modal: state => {
      state.sponsorTaskModal = {
        isOpen: false,
        affiliate: null,
      };
    },
  },
  extraReducers: {
    [API.listAffiliates.pending]: (state, { payload }) => {
      state.loading = true;
      state.affiliates = [];
    },
    [API.listAffiliates.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.affiliates = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Affiliates Found";
    },
    [API.listAffiliates.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveAffiliate.pending]: (state, { payload }) => {
      state.loadingSaveAffiliate = true;
    },
    [API.saveAffiliate.fulfilled]: (state, { payload }) => {
      state.loadingSaveAffiliate = false;
      state.success = true;
      state.createAffiliateStep = 1;
      state.stripeAccountLink = payload?.accountLink?.url;
      state.message = "Affiliate Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveAffiliate.rejected]: (state, { payload, error }) => {
      state.loadingSaveAffiliate = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsAffiliate.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsAffiliate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.affiliate = payload;
      state.message = "Affiliate Found";
    },
    [API.detailsAffiliate.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteAffiliate.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteAffiliate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = "Affiliate Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteAffiliate.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.sponsorMonthlyCheckin.pending]: (state, { payload }) => {
      state.loading = true;
      state.monthlyCheckinSuccess = false;
    },
    [API.sponsorMonthlyCheckin.fulfilled]: (state, { payload }) => {
      state.monthlyCheckinModal = false;
      state.numberOfContent = 0;
      state.questionsConcerns = "";
      state.monthlyCheckinSuccess = true;
    },
    [API.sponsorMonthlyCheckin.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.monthlyCheckinSuccess = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.teamMonthlyCheckin.pending]: (state, { payload }) => {
      state.loading = true;
      state.monthlyCheckinSuccess = false;
    },
    [API.teamMonthlyCheckin.fulfilled]: (state, { payload }) => {
      state.monthlyCheckinModal = false;
      state.numberOfContent = 0;
      state.questionsConcerns = "";
      state.monthlyCheckinSuccess = true;
    },
    [API.teamMonthlyCheckin.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.monthlyCheckinSuccess = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.savePromo.fulfilled]: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
    [API.createProductBundle.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.createProductBundle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.create_product_bundle_modal = false;
      state.message = "Product Bundle Created";
    },
    [API.createProductBundle.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_success,
  set_loading,
  set_affiliate,
  open_create_affiliate_modal,
  open_edit_affiliate_modal,
  close_affiliate_modal,
  open_affiliate_modal,
  set_edit_affiliate_modal,
  openMonthlyCheckinModal,
  closeMonthlyCheckinModal,
  setMonth,
  setFiles,
  setQuestion,
  setNumberOfContent,
  setCheckin,
  addNewCheckin,
  setCreateAffiliateStep,
  openCreateProductBundleModal,
  closeCreateProductBundleModal,
  setProductBundle,
  open_sponsor_task_modal,
  close_sponsor_task_modal,
  set_sponsor_task,
} = affiliatePage.actions;
export default affiliatePage.reducer;
