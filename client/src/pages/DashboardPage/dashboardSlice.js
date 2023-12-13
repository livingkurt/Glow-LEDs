/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../shared/GlowLEDsComponents/GLForm/glFormHelpers";
import { getMonthStartEndDates, months } from "./dashboardHelpers";

const today = new Date();
const currentMonth = months[today.getMonth()];
const currentYear = today.getFullYear();

const { start_date, end_date } = getMonthStartEndDates({ year: currentYear, month: currentMonth });
const todayISO = new Date().toISOString();

const dashboardPage = createSlice({
  name: "dashboardPage",
  initialState: {
    year: currentYear.toString(),
    month: currentMonth,
    start_date: start_date,
    end_date: end_date,
    tabIndex: 0,
    numberOfCopies: 12,
    gcodeNames: [],
    gcodeParts: {},
    filename: "",
    status: "",
    loading: false,
    changeColorOnPrintRemoval: false,
    gcodeContinuousModal: false,
  },
  reducers: {
    set_year: (state, { payload }) => {
      state.year = payload;
    },
    resetDateRange: (state, { payload }) => {
      state.year = "";
      state.month = "";
      state.start_date = "2018-01-01";
      state.end_date = formatDate(todayISO);
    },
    set_month: (state, { payload }) => {
      state.month = payload;
    },
    set_start_date: (state, { payload }) => {
      state.start_date = payload;
    },
    set_end_date: (state, { payload }) => {
      state.end_date = payload;
    },
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    setNumberOfCopies: (state, { payload }) => {
      state.numberOfCopies = payload;
    },
    setChangeColorOnPrintRemoval: (state, { payload }) => {
      state.changeColorOnPrintRemoval = payload;
    },
    openGcodeContinuousModal: (state, { payload }) => {
      state.gcodeContinuousModal = true;
    },
    resetGcodeGenerator: (state, { payload }) => {
      state.filename = "";
      state.gcodeNames = [];
      state.gcodeParts = {};
    },
    closeGcodeGeneratorModal: (state, { payload }) => {
      state.gcodeContinuousModal = false;
      state.filename = "";
      state.gcodeNames = [];
      state.gcodeParts = {};
    },
    handleFiles: (state, { payload }) => {
      const { files } = payload;
      for (let index = 0; index < files.length; index++) {
        const num = index + 1;
        const { beginningArray, middle_array, endingArray } = files[index];
        state.gcodeParts["file_" + num] = {
          ["beginning_" + num]: beginningArray,
          ["middle_" + num]: middle_array,
          ["ending_" + num]: endingArray,
        };
        state.filename = document.getElementById("file").files[0].name;
        state.gcodeNames.push(document.getElementById("file").files[index].name);
      }
    },
  },
});

export const {
  set_year,
  set_month,
  set_start_date,
  set_end_date,
  resetDateRange,
  set_loading,
  setTabIndex,
  setNumberOfCopies,
  set_gcodeNames,
  set_gcodeParts,
  set_filename,
  set_status,
  setChangeColorOnPrintRemoval,
  openGcodeContinuousModal,
  resetGcodeGenerator,
  handleFiles,
  closeGcodeGeneratorModal,
} = dashboardPage.actions;
export default dashboardPage.reducer;
