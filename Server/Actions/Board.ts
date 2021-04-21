import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface iBoard{
  id: number;
  label: string;
  content: string
}
export interface iBoardState{
  Board : [iBoard]|[]
}




const initialState = {
  Board:[]
} as iBoardState
const Board = createSlice({
  name: "Board",
  initialState,
  reducers: {
    
  }

})

export default Board.reducer;