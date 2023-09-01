import { createSlice } from "@reduxjs/toolkit";

const snackbarPage = createSlice({
  name: "snackbarPage",
  initialState: {
    open: false,
    message: "",
    severity: "success",
    horizontal: "center",
    vertical: "top",
    duration: 4000,
  },
  reducers: {
    showSuccess: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.severity = "success";
    },
    showError: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.severity = "error";
    },
    showSnackbar: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.severity = payload.severity;
    },
    hideSnackbar: state => {
      state.open = false;
      state.message = "";
      state.severity = "";
    },
  },
});

export const { showSnackbar, hideSnackbar, showSuccess, showError } = snackbarPage.actions;
export default snackbarPage.reducer;
