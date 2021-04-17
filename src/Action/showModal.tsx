import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  TokenForm: Boolean;
  CreateTab: Boolean;
  CreateButton: Boolean;
  Burger: Boolean;
  boardParam: Boolean;
  queueSlide: Boolean;
  importExport: Boolean;
}

const initialState = {
  TokenForm: false,
  CreateTab: false,
  CreateButton: false,
  Burger: false,
  boardParam: false,
  queueSlide: false,
  importExport: false,
} as Modal;

const ShowModalSlicer = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    showTokenForm: (state) => {
      state.TokenForm = true;
    },
    hideTokenForm: (state) => {
      state.TokenForm = false;
    },
    showCreateTab: (state) => {
      state.CreateTab = true;
    },
    hideCreateTab: (state) => {
      state.CreateTab = false;
    },
    showCreateButton: (state) => {
      state.CreateButton = true;
    },
    hideCreateButton: (state) => {
      state.CreateButton = false;
    },
    setBurger: (state, { payload }) => {
      state.Burger = payload;
    },
    setBoardParam: (state, { payload }) => {
      state.boardParam = payload;
      if (payload === true) state.queueSlide = false;
    },
    setQueueSlide: (state, { payload }) => {
      state.queueSlide = payload;
      if (payload === true) state.boardParam = false;
    },
    setImportExport: (state, { payload }) => {
      state.importExport = payload;
    },
  },
});

export const {
  showTokenForm,
  hideTokenForm,
  showCreateTab,
  hideCreateTab,
  showCreateButton,
  hideCreateButton,
  setBurger,
  setBoardParam,
  setQueueSlide,
  setImportExport,
} = ShowModalSlicer.actions;
export default ShowModalSlicer.reducer;
