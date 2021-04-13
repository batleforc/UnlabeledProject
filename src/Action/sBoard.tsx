import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
var ApiSBoard = process.env.REACT_APP_SERVER + "/api/sboard/";

export enum SongType {
  link = 1,
  YouTube = 2,
  Spotify = 3,
}

export const GetBoard = createAsyncThunk(
  "sBoard/get",
  async (nothing, { dispatch }) => {
    return axios.get(ApiSBoard).then((value) => value.data);
  }
);
export const DeleteBoard = createAsyncThunk(
  "sBoard/Delete",
  async ({ tabId }: any, { dispatch }) => {
    return axios.delete(ApiSBoard + `${tabId}`).then((value) => value.data);
  }
);
export const UpdateBoard = createAsyncThunk(
  "sBoard/updateLabel",
  async ({ tabId, label, content }: any, { dispatch }) => {
    return axios
      .put(ApiSBoard + `${tabId}`, {
        label: label,
        content: content,
      })
      .then((value) => value.data);
  }
);

export const CreateBoard = createAsyncThunk(
  "sBoard/CreateBoard",
  async ({ tabId, label }: any, { dispatch }) => {
    return axios
      .post(ApiSBoard, {
        label: label,
      })
      .then((value) => value.data);
  }
);

interface Board {
  Pending: Boolean;
  Board: [any] | [] | any;
  ActiveBoard: Number;
  ActiveLayout: [any] | [] | any;
  sound: String;
  url: String;
  button: String;
  type: SongType;
  BoardAsChanged: boolean;
  editing: boolean;
  id: number;
}
const initialState = {
  Pending: false,
  Board: [],
  ActiveBoard: -1,
  ActiveLayout: [],
  sound: "",
  url: "",
  button: "",
  type: SongType.link,
  BoardAsChanged: false,
  editing: false,
  id: -1,

} as Board;
const parse = (state: any, { payload }: any) => {
  state.Pending = false;
  state.Board = payload;
  state.ActiveLayout =
    state.Board[Number(state.ActiveBoard)] !== undefined
      ? JSON.parse(state.Board[Number(state.ActiveBoard)].content)
      : [];
};
const SBoardSlicer = createSlice({
  name: "sBoard",
  initialState,
  reducers: {
    setActiveBoard: (state, { payload }) => {
      state.ActiveBoard = state.ActiveBoard === payload ? -1 : payload;
      state.ActiveLayout =
        state.Board[Number(state.ActiveBoard)] !== undefined
          ? JSON.parse(state.Board[payload].content)
          : [];
    },
    setSound: (state, { payload }) => ({ ...state, sound: payload }),
    setHandlerLayout: (state, { payload }) => {
      state.ActiveLayout = payload.map((value: any, index: any) => ({
        ...state.ActiveLayout[index],
        ...value,
      }));
      state.BoardAsChanged = true;
    },
    lock: (state) => {
      state.ActiveLayout = state.ActiveLayout.map((value: any) => ({
        ...value,
        static: true,
      }));
    },
    unLock: (state) => {
      state.ActiveLayout = state.ActiveLayout.map((value: any) => ({
        ...value,
        static: false,
      }));
    },
    addButton: (state) => {
      state.ActiveLayout = state.ActiveLayout.concat([
        {
          i:
            state.ActiveLayout.length > 0
              ? String(
                  Number(state.ActiveLayout[state.ActiveLayout.length - 1].i) +
                    1
                )
              : "0",
          x: 0,
          y: 0,
          w: 1,
          h: 2,
          text: state.button,
          url: state.url,
          type: state.type,
          static: state.ActiveLayout[0]?.static || false,
        },
      ]);
      state.url = "";
      state.button = "";
      state.BoardAsChanged = true;
      state.type = 0;
      state.editing = false;
      state.id=-1
    },
    editButton: (state) => {
      state.ActiveLayout[state.id].url = state.url;
      state.ActiveLayout[state.id].text = state.button;
      state.ActiveLayout[state.id].type = state.type;
      state.url = "";
      state.button = "";
      state.BoardAsChanged = true;
      state.type = 0;
      state.editing = false;
      state.id=-1
    },
    loadButton: (state, { payload }) => {
      state.url = state.ActiveLayout[payload].url;
      state.button = state.ActiveLayout[payload].text;
      state.type = state.ActiveLayout[payload].type;
      state.editing = true;
      state.id=payload
    },
    removeButton: (state, { payload }) => {
      state.ActiveLayout.splice(payload, 1);
      state.BoardAsChanged = true;
    },
    resetCreateButtonModal: (state) => {
      state.url = "";
      state.button = "";
      state.BoardAsChanged = true;
      state.type = 0;
      state.editing = false;
      state.id=-1
    },
    setUrl: (state, { payload }) => ({ ...state, url: payload }),
    setButton: (state, { payload }) => ({ ...state, button: payload }),
    setType: (state, { payload }) => ({ ...state, type: Number(payload) }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetBoard.pending, (state) => {
        state.Pending = true;
      })
      .addCase(GetBoard.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(GetBoard.fulfilled, parse)
      .addCase(DeleteBoard.pending, (state) => {
        state.Pending = true;
      })
      .addCase(DeleteBoard.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(DeleteBoard.fulfilled, parse)
      .addCase(UpdateBoard.pending, (state) => {
        state.Pending = true;
      })
      .addCase(UpdateBoard.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(UpdateBoard.fulfilled, (state, action) => {
        state.BoardAsChanged = false;
        parse(state, action);
      })
      .addCase(CreateBoard.pending, (state) => {
        state.Pending = true;
      })
      .addCase(CreateBoard.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(CreateBoard.fulfilled, parse);
  },
});

export const {
  setActiveBoard,
  setSound,
  setHandlerLayout,
  lock,
  unLock,
  addButton,
  setUrl,
  setButton,
  removeButton,
  editButton,
  loadButton,
  setType,
  resetCreateButtonModal,
} = SBoardSlicer.actions;
export default SBoardSlicer.reducer;
