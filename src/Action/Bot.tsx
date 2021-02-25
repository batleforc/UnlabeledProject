import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

interface User{
  img : any,
  user : any,
  Pending:Boolean
}

export const BotGetter = createAsyncThunk(
  "Bot/get",
  async (value,{dispatch}) => {
    return axios.get(process.env.REACT_APP_SERVER+"/api/me")
      .then((value)=>value.data)
  },{
    condition:(force : boolean |void,{getState}) : boolean => {
      var test = getState()
      if((test as any).Bot.user!==null)
        return false
      return true
    }
  }
)

const initialState = {img:null,user:null,Pending:false} as User

const BotSlicer = createSlice({
  name : "Bot",
  initialState,
  reducers : {
  },
  extraReducers:builder =>{
    builder.addCase(BotGetter.fulfilled,(state,{payload})=>{
      state.Pending=false
      state.img=payload.img
      state.user=payload.user
    })
    builder.addCase(BotGetter.rejected,(state,action)=>{
      state.Pending=false
    })
    builder.addCase(BotGetter.pending,(state,Action)=>{state.Pending=true})
  }
})

export default BotSlicer.reducer