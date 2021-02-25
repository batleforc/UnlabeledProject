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
  Pending:Boolean
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

const initialState = {AllToken:[],ActiveTokenId:null,Pending:false} as TokenState

const TokenSlicer = createSlice({
  name : "Token",
  initialState,
  reducers : {
    setActiveTokenId : (state,action:PayloadAction<number>) => {
      state.ActiveTokenId = action.payload
    }
  },
  extraReducers:builder =>{
    builder.addCase(TokenGetter.fulfilled,(state,action)=>{
      state.Pending=false
      state.AllToken=action.payload
    })
    builder.addCase(TokenGetter.rejected,(state,action)=>{
      state.Pending=false
    })
    builder.addCase(TokenGetter.pending,(state,Action)=>{state.Pending=true})
  }
})

export const {setActiveTokenId} = TokenSlicer.actions
export default TokenSlicer.reducer