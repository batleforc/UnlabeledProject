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
  async ({ force }: { force?: boolean | undefined }, { dispatch, getState }) => {
    dispatch(Board.actions.setReady(Db.db!==undefined))
    return Db.GetAllTab()
  }
);

const initialState = {
  Board: [],
  Ready:false
} as iBoardState;
const Board = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setReady: (state, { payload }) => {
      state.Ready=payload
    }
  },
  extraReducers: (builder) =>
    builder.addCase(BoardGetter.fulfilled, (state, { payload }) => {
      state.Board = payload;
    }),
});

export default Board.reducer;
