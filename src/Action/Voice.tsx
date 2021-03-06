import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
var ApiVoice = process.env.REACT_APP_SERVER+"/api/voice/"

export const joinChan = createAsyncThunk(
  "voice/Join",
  async ({guildId,ChanId}: any,{dispatch}) => {
    return axios.post(ApiVoice+"join",{
      guildId:guildId,
      chanId:ChanId
    })
      .then(value=>console.log(value))
  }
)
export const leaveChan = createAsyncThunk(
  "voice/leaveChan",
  async (something : void,{dispatch}) => {
    return axios.post(ApiVoice+"leave")
      .then(value=>console.log(value))
  }
)
export const stopVoice = createAsyncThunk(
  "voice/stopVoice",
  async (something : void,{dispatch}) => {
    return axios.post(ApiVoice+"pause")
      .then(value=>console.log(value))
  }
)
export const startVoice = createAsyncThunk(
  "voice/startVoice",
  async (something: string,{dispatch}) => {
    return axios.post(ApiVoice+"play",{
      toPlay : something
    })
      .then(value=>console.log(value))
  }
)
export const resumeVoice = createAsyncThunk(
  "voice/resumeVoice",
  async (something : void,{dispatch}) => {
    return axios.post(ApiVoice+"resume")
      .then(value=>console.log(value))
  }
)
export const setVolume = createAsyncThunk(
  "voice/setVolume",
  async (volume : number,{dispatch}) => {
    return axios.post(ApiVoice+"volume",{vol:volume})
      .then(value=>value.data)
  }
)
export const getStatus = createAsyncThunk(
  "voice/getStatus",
  async (something : void,{dispatch}) => {
    return axios.get(ApiVoice+"status")
      .then(value=>value.data===0) //if 0 = good sinon pas good
  }
)
export const getPause = createAsyncThunk(
  "voice/getStatus",
  async (something : void,{dispatch}) => {
    return axios.get(ApiVoice+"pause")
      .then(value=>console.log(value))
  }
)
export const getVolume = createAsyncThunk(
  "voice/getVolume",
  async (something : void,{dispatch}) => {
    return axios.get(ApiVoice+"volume")
      .then(value=>value.data)
  }
)

interface Voice{
  Pending   : boolean,
  Playing   : boolean,
  Volume    : number,
  ChanId    : string,
  GuildId   : string,
  Status    : Boolean
}
const initialState = {
  Pending : false,
  Playing : false,
  Volume  : 0,
  ChanId  : "-1",
  GuildId : "",
  Status  : false
} as Voice

const VoiceSlicer = createSlice({
  name:"Voice",
  initialState,
  reducers:{
    setChanId : (state,{payload}) =>{state.ChanId=payload}
  },
  extraReducers: builder => {
    builder
      .addCase(getStatus.pending,(state,payload)=>{state.Pending=true})
      .addCase(getStatus.rejected,(state,payload)=>{state.Pending=false})
      .addCase(getStatus.fulfilled,(state,{payload})=>{state.Pending=false;state.Status=payload})
      .addCase(getVolume.pending,(state,payload)=>{state.Pending=true})
      .addCase(getVolume.rejected,(state,payload)=>{state.Pending=false})
      .addCase(getVolume.fulfilled,(state,{payload})=>{state.Pending=false;state.Volume=payload})
  }
})

export const {setChanId} = VoiceSlicer.actions
export default VoiceSlicer.reducer