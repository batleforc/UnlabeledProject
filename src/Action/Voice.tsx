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
  async ({guildId,ChanId}: any,{dispatch}) => {
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
    return axios.post(ApiVoice+"volume")
      .then(value=>console.log(value))
  }
)
export const getStatus = createAsyncThunk(
  "voice/getStatus",
  async (something : void,{dispatch}) => {
    return axios.get(ApiVoice+"status")
      .then(value=>console.log(value)) //if 0 = good sinon pas good
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
      .then(value=>console.log(value))
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
  ChanId  : "",
  GuildId : "",
  Status  : false
} as Voice

const VoiceSlicer = createSlice({
  name:"Voice",
  initialState,
  reducers:{

  },
  extraReducers: builder => {

  }
})

export default VoiceSlicer.reducer