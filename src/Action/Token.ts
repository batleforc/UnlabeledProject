import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';

interface Token{
  id : number,
  label : string,
  token : string
}
interface TokenState{
  AllToken : [Token] | [],
  ActiveTokenId : number | null
}


export const TokenGetter = createAsyncThunk(
  "token/get",
  async (value,{dispatch}) => {
    return axios.get(process.env.REACT_APP_SERVER+"/api/token")
      .then((value)=>value.data)
  },{
    condition:(force : boolean |void,{getState}) : boolean => {
      var test = getState()
      if((test as any).Token.AllToken.length!==0)
        return false
      return true
    }
  }
)

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