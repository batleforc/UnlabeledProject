import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Db } from "../index";

export interface Token {
  id: number;
  label: string;
  token: string;
}

export interface iTokenState {
  Token: [Token] | [any] | any | [];
  Ready: Boolean;
}

export const TokenGetter = createAsyncThunk(
  "Token/Get",
  async(undefin,{dispatch}) => {
    dispatch(setReady(Db.db !== undefined))
    return Db.GetAllToken();
  }
)

export const TokenCreate = createAsyncThunk(
  "Token/Create",
  async ({ label, token }: { label: string, token: string }, { dispatch }) => {
    await Db.InsertToken(label, token);
    await dispatch(TokenGetter());
  }
)

export const TokenDelete = createAsyncThunk(
  "Token/Delete",
  async ({ TokenId }: { TokenId: number },{dispatch}) => {
    await Db.DeleteToken(TokenId);
    await dispatch(TokenGetter());
  }
)

export const TokenUpdate = createAsyncThunk(
  "Token/Update",
  async ({id,label,token}:Token,{dispatch}) => {
    await Db.EditToken(id,label,token)
    await dispatch(TokenGetter())
  }
)


const initialState = {
  Token: [],
  Ready: false,
} as iTokenState;
const Token = createSlice({
  name: "Token",
  initialState,
  reducers: {
    setReady: (state, { payload }) => {
      state.Ready=payload
    }
  },
  extraReducers: (builder) =>
    builder.addCase(TokenGetter.fulfilled, (state, { payload }) => {
      state.Token = payload;
    })
})

export const { setReady } = Token.actions
export default Token.reducer;