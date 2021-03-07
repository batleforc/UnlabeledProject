import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

interface User{
  img : any,
  user : any,
  link: string,
  Pending:Boolean,
  Serveur: [any] | [],
  ActiveServeur : String,
  ServeurChan : [any] |[]
}

export const BotGetter = createAsyncThunk(
  "Bot/get",
  async ({force}:{force?: boolean |undefined},{dispatch}) => {
    return axios.get(process.env.REACT_APP_SERVER+"/api/me")
      .then((value)=>value.data)
  },{
    condition:({force}:{force?: boolean |undefined},{getState}) : boolean => {
      var test = getState()
      if((test as any).Bot.user!==null&&force!==true)
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

export const BotServeurChanGetter = createAsyncThunk(
  "Bot/Serveur/chan/get",
  async(value : string,{dispatch}) => {
    return axios.get(process.env.REACT_APP_SERVER+`/api/bot/chan/${value}`)
      .then((res)=>({id:value,res:res.data}))
  }
)

const initialState = {img:null,user:null,Pending:false,link:"",Serveur:[],ActiveServeur:"-1",ServeurChan:[]} as User

const BotSlicer = createSlice({
  name : "Bot",
  initialState,
  reducers : {
    reset : (state) => {state=initialState}
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
      .addCase(BotServeurChanGetter.pending,(state)=>{state.Pending=true})
      .addCase(BotServeurChanGetter.rejected,(state)=>{state.Pending=false})
      .addCase(BotServeurChanGetter.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.ActiveServeur=payload.id
        state.ServeurChan=payload.res
      })
  }
})

export const {reset} = BotSlicer.actions
export default BotSlicer.reducer