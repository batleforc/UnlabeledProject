import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios, {AxiosResponse} from 'axios';

interface Token{
  id : number,
  label : string,
  token : string
}
interface TokenState{
  AllToken : [Token] | [],
  ActiveTokenId : number | null
}

const initialState = {AllToken:[],ActiveTokenId:null} as TokenState

const TokenSlicer = createSlice({
  name : "Token",
  initialState,
  reducers : {
    setActiveTokenId : (state,action:PayloadAction<number>) => {
      state.ActiveTokenId = action.payload
    }
  }
})

export const {setActiveTokenId} = TokenSlicer.actions
export default TokenSlicer.reducer