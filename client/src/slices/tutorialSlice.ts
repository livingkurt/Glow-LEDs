import { createSlice } from "@reduxjs/toolkit";
import * as API from "../api/tutorialApi";

const tutorialsSlice = createSlice({
  name: "tutorials",
  initialState: {
    loading: false,
    tutorials: [],
    tutorial: {
      affiliate: "",
      title: "",
      video: "",
      description: "",
      categorys: [],
      level: "",
      pathname: "",
      order: null,
      active: false
    },
    remoteVersionRequirement: 0,
    edit_tutorial_modal: false,
    tutorial_modal: false,
    message: "",
    success: false,
    error: {},
    sort_options: ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"],
    colors: [
      { name: "Sponsor", color: "#3e4c6d" },
      { name: "Promoter", color: "#7d5555" },
      { name: "Team", color: "#557d6c" },
      { name: "Not Active", color: "#757575" },
      { name: "Rave Mob", color: "#55797d" }
    ]
  },
  reducers: {
    set_tutorial: (state, { payload }) => {
      const updated_tutorial = payload;
      return {
        ...state,
        tutorial: { ...state.tutorial, ...updated_tutorial }
      };
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_success: (state, { payload }) => {
      state.success = payload;
    },
    set_edit_tutorial_modal: (state, { payload }) => {
      state.edit_tutorial_modal = payload;
    },
    open_create_tutorial_modal: (state, { payload }) => {
      state.edit_tutorial_modal = true;
      state.tutorial = {
        affiliate: "",
        title: "",
        video: "",
        description: "",
        categorys: [],
        level: "",
        pathname: "",
        order: null,
        active: false
      };
    },
    open_edit_tutorial_modal: (state, { payload }) => {
      state.edit_tutorial_modal = true;
      state.tutorial = payload;
    },
    close_tutorial_modal: (state, { payload }) => {
      state.tutorial_modal = false;
      state.tutorial = {
        affiliate: "",
        title: "",
        video: "",
        description: "",
        categorys: [],
        level: "",
        pathname: "",
        order: null,
        active: false
      };
    },
    open_tutorial_modal: (state, { payload }) => {
      state.tutorial_modal = true;
      state.tutorial = payload;
    },
    setRemoteVersionRequirement: (state, { payload }) => {
      console.log("setRemoteVersionRequirement");
      state.remoteVersionRequirement = Date.now();
    }
  },
  extraReducers: {
    [API.listTutorials.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
      state.tutorials = [];
    },
    [API.listTutorials.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorials = payload.data;
      state.totalPages = payload.total_count;
      state.page = payload.currentPage;
      state.message = "Tutorials Found";
    },
    [API.listTutorials.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.saveTutorial.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.saveTutorial.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.edit_tutorial_modal = false;
      state.success = true;
      state.message = "Tutorial Saved";
      state.remoteVersionRequirement = Date.now();
    },
    [API.saveTutorial.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.detailsTutorial.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.detailsTutorial.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorial = payload;
      state.message = "Tutorial Found";
    },
    [API.detailsTutorial.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    },
    [API.deleteTutorial.pending as any]: (state: any, { payload }: any) => {
      state.loading = true;
    },
    [API.deleteTutorial.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.tutorial = payload.tutorial;
      state.message = "Tutorial Deleted";
      state.remoteVersionRequirement = Date.now();
    },
    [API.deleteTutorial.rejected as any]: (state: any, { payload }: any) => {
      state.loading = false;
      state.error = payload.error;
      state.message = payload.message;
    }
  }
});

export const {
  set_loading,
  set_tutorial,
  set_edit_tutorial_modal,
  open_create_tutorial_modal,
  open_tutorial_modal,
  close_tutorial_modal,
  open_edit_tutorial_modal,
  setRemoteVersionRequirement
} = tutorialsSlice.actions;
export default tutorialsSlice.reducer;
