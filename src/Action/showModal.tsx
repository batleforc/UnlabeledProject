import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  TokenForm: Boolean;
  CreateTab: Boolean;
  CreateButton: Boolean;
  Burger: Boolean;
}

const initialState = {
  TokenForm: false,
  CreateTab: false,
  CreateButton: false,
  Burger: false,
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
} = ShowModalSlicer.actions;
export default ShowModalSlicer.reducer;
