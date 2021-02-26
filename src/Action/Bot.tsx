import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

interface User{
  img : any,
  user : any,
  link: string
  Pending:Boolean
  Serveur: [any] | []
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
export const BotServerGetter = createAsyncThunk(
  "Bot/serveur/get",
  async (value,{dispatch}) => {
    return axios.get(process.env.REACT_APP_SERVER+"/api/bot/serveur")
      .then((value)=>value.data)
  },{
    condition:(force : boolean |void,{getState}) : boolean => {
      var test = getState()
      if((test as any).Bot.user===null)
        return false
      return true
    }
  }
)

const initialState = {img:null,user:null,Pending:false,link:"",Serveur:[]} as User

const BotSlicer = createSlice({
  name : "Bot",
  initialState,
  reducers : {
  },
  extraReducers:builder =>{
    builder
      .addCase(BotGetter.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.img=payload.img
        state.user=payload.user
        state.link=payload.link
      })
      .addCase(BotGetter.rejected,(state,action)=>{
        state.Pending=false
      })
      .addCase(BotGetter.pending,(state,Action)=>{state.Pending=true})
      .addCase(BotServerGetter.pending,(state)=>{state.Pending=true})
      .addCase(BotServerGetter.rejected,(state)=>{state.Pending=false})
      .addCase(BotServerGetter.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.Serveur=payload
      })
  }
})

export default BotSlicer.reducer