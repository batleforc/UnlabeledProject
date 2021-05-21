import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import compareVersions from "compare-versions";
import axios from "axios";

export const needUpdate = createAsyncThunk(
  "showModal/GetNeedUpdate",
  async () => {
    return axios
      .get("https://api.github.com/repos/batleforc/UnlabeledProject/releases")
      .then((req) => req.data)
      .then((value) => ({
        status:compareVersions(
          value[0].tag_name,
          String(process.env.REACT_APP_VERSION)
        ),
        version:value[0].tag_name
      })
      )
      .then((value) => {
        if (value.status === 0) {
          console.log(
            `Votre application est a jours : ${process.env.REACT_APP_VERSION}`
          );
        } else {
          console.log(`Votre application est en ${process.env.React_APP_VERSION} la dernière release est en ${value.version}`)
        }
        return value;
      });
  }
);

interface Modal {
  TokenForm: boolean;
  CreateTab: boolean;
  CreateButton: boolean;
  Burger: boolean;
  boardParam: boolean;
  queueSlide: boolean;
  importExport: boolean;
  needUpdate: boolean;
  versionGithub: string;
}

const initialState = {
  TokenForm: false,
  CreateTab: false,
  CreateButton: false,
  Burger: false,
  boardParam: false,
  queueSlide: false,
  importExport: false,
  needUpdate: false,
  versionGithub:""
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
    setNeedUpdate: (state, { payload }) => {
      state.needUpdate = payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(needUpdate.fulfilled, (state, { payload }) => {
      state.needUpdate = payload.status !== 0;
      state.versionGithub = payload.version;
    })
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
  setNeedUpdate,
} = ShowModalSlicer.actions;
export default ShowModalSlicer.reducer;
