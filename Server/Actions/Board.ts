import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Db } from "../index";

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
    dispatch(setReady(Db.db !== undefined));
    return Db.GetAllTab();
  }
);

export const BoardCreate = createAsyncThunk(
  "Board/Create",
  async ({ label }: { label: string }, { dispatch, getState }) => {
    await Db.InsertTab(label);
    await dispatch(BoardGetter({force:false}))
  }
);


export const BoardDelete = createAsyncThunk(
  "Board/Create",
  async ({ TabId }: { TabId: number }, { dispatch, getState }) => {
    await Db.DeleteTab(TabId)
    await dispatch(BoardGetter({force:false}))
  }
);

export const BoardUpdate = createAsyncThunk(
  "Board/Update",
  async ({ TabId, label, content }: { TabId: number, label?: string, content?: object },{dispatch}) => {
    if(label!==undefined){
      await Db.EditTabLabel(TabId,label)
    }
    if(content!==undefined){
      await Db.EditTabContent(TabId,JSON.stringify(content))
    }
    await dispatch(BoardGetter({force:false}))
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
export const { setReady } = Board.actions
export default Board.reducer;
