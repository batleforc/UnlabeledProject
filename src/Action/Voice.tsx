import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const joinChan = createAsyncThunk(
  "voice/Join",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const leaveChan = createAsyncThunk(
  "voice/leaveChan",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const getVolume = createAsyncThunk(
  "voice/getVolume",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const stopVoice = createAsyncThunk(
  "voice/stopVoice",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const startVoice = createAsyncThunk(
  "voice/startVoice",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const resumeVoice = createAsyncThunk(
  "voice/resumeVoice",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)
export const setVolume = createAsyncThunk(
  "voice/setVolume",
  async ({guildId,ChanId}: any,{dispatch}) => {

  }
)

interface Voice{
  Pending   : boolean,
  Volume    : number,
  ChanId    : string,
  GuildId   : string,
  Status    : Boolean
}
const initialState = {
  Pending : false,
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