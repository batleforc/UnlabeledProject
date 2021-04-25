import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Db } from "../index";
import {Log} from '../Utils/Log'
export interface iBoard {
  id: number;
  label: string;
  content: string;
}
export interface iBoardState {
  Board: [iBoard] | [any] | any | [];
  Ready: Boolean;
}

export const BoardGetter = createAsyncThunk(
  "Board/get",
  async (
    { force }: { force?: boolean | undefined },
    { dispatch, getState }
  ) => {
    dispatch(Board.actions.setReady(Db.db !== undefined));
    return Db.GetAllTab();
  }
);

export const BoardCreate = createAsyncThunk(
  "Board/Create",
  async ({ label }: { label: string }, { dispatch, getState }) => {
    await Db.InsertTab(label);
    dispatch(BoardGetter({force:false}))
  }
);


export const BoardDelete = createAsyncThunk(
  "Board/Create",
  async ({ TabId }: { TabId: number }, { dispatch, getState }) => {
    await Db.DeleteTab(TabId)
    dispatch(BoardGetter({force:false}))
  }
);

export const BoardUpdate = createAsyncThunk(
  "Board/Update",
  async ({ TabId, label, content }: { TabId: number, label?: string, content?: object }) => {
    if(label!==undefined){
      await Db.EditTabLabel(TabId,label)
    }
    if(content!==undefined){
      await Db.EditTabContent(TabId,JSON.stringify(content))
    }
  }
)

const initialState = {
  Board: [],
  Ready: false,
} as iBoardState;
const Board = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setReady: (state, { payload }) => {
      state.Ready = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(BoardGetter.fulfilled, (state, { payload }) => {
      state.Board = payload;
    }),
});

export default Board.reducer;
