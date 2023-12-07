import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/filamentApi";

const filamentPage = createSlice({
  name: "filamentPage",
  initialState: {
    loading: false,
    filaments: [],
    filament: {
      name: "",
    },
    remoteVersionRequirement: 0,
    edit_filament_modal: false,
    filament_modal: false,
    message: "",
    success: false,
    error: {},
  },
  reducers: {
    set_filament: (state, { payload }) => {
      const updated_filament = payload;
      return {
        ...state,
        filament: { ...state.filament, ...updated_filament },
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_filament_modal: (state, { payload }) => {
      state.edit_filament_modal = payload;
    },
    open_create_filament_modal: (state, { payload }) => {
      state.edit_filament_modal = true;
      state.filament = {
        name: "",
      };
    },
    open_edit_filament_modal: (state, { payload }) => {
      state.edit_filament_modal = true;
      state.filament = payload;
    },
    close_filament_modal: (state, { payload }) => {
      state.filament_modal = false;
      state.filament = {
        name: "",
      };
    },
    open_filament_modal: (state, { payload }) => {
      state.filament_modal = true;
      state.filament = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      state.remoteVersionRequirement = Date.now();
    },
  },
  extraReducers: {
    [API.listFilaments.pending]: (state, { payload }) => {
      state.loading = true;
      state.filaments = [];
    },
    [API.listFilaments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filaments = payload;
      state.message = "Filaments Found";
    },
    [API.listFilaments.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.saveFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.saveFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.edit_filament_modal = false;
      state.success = true;
      state.message = "Filament Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.detailsFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.detailsFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filament = payload;
      state.message = "Filament Found";
    },
    [API.detailsFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
    [API.deleteFilament.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [API.deleteFilament.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.filament = payload.filament;
      state.message = "Filament Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteFilament.rejected]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
      state.message = payload ? payload.message : "An error occurred";
    },
  },
});

export const {
  set_loading,
  set_filament,
  set_edit_filament_modal,
  open_create_filament_modal,
  open_filament_modal,
  close_filament_modal,
  open_edit_filament_modal,
  setRemoteVersionRequirement,
} = filamentPage.actions;
export default filamentPage.reducer;
