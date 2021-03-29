import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
interface Event {
  ReloadBot : Boolean,
  Ready : Boolean,
  Pending : Boolean,
  ResetBot : Boolean,
  Voice  : {
    Change    : Boolean,
    Queue     : Boolean,
    Error     : Boolean,
    Playing   : Boolean,
    Join      : Boolean,
    Leave     : Boolean,
  }
}
const initialState = {
  ReloadBot: false,
  Ready:false,
  Pending:false,
  ResetBot:false,
  Voice : {
      Change    : false,
      Queue     : false,
      Error     : false,
      Playing   : false,
      Join      : false,
      Leave     : false,
  }
} as Event

export const EventInit = createAsyncThunk(
  "Event/init",
  async ({socket}:any,{dispatch}) =>{
    socket.on("botUpdate",()=>{
      dispatch(setUpdateBot(true))
    })
    socket.on("botReset",()=>{
      dispatch(setResetBot(true))
    })
    socket.on("VoiceChange",()=>{
      dispatch(setVoiceChange(true))
    })
    socket.on("VoiceQueue",()=>{
      dispatch(setVoiceQueue(true))
    })
    socket.on("VoiceError",()=>{
      dispatch(setVoiceError(true))
    })
    socket.on("VoicePlaying",()=>{
      dispatch(setVoicePlaying(true))
    })
    socket.on("VoiceJoin",()=>{
      dispatch(setVoiceJoin(true))
    })
    socket.on("VoiceLeave",()=>{
      dispatch(setVoiceLeave(true))
    })

  },{
    condition:(force:boolean|void,{getState}) : boolean => {
      var test = getState()
      if((test as any).Event.Ready)
        return false
      return true
    }
  }
)

const EventSlicer = createSlice({
  name:"Event",
  initialState,
  reducers:{
    setUpdateBot : (state,{payload}) => {state.ReloadBot = payload;},
    setResetBot : (state,{payload}) => {state.ResetBot=payload},
    setVoiceChange : (state,{payload}) => {state.Voice.Change=payload},
    setVoiceQueue : (state,{payload}) => {state.Voice.Change=payload},
    setVoiceError : (state,{payload}) => {state.Voice.Change=payload},
    setVoicePlaying : (state,{payload}) => {state.Voice.Change=payload},
    setVoiceJoin : (state,{payload}) => {state.Voice.Change=payload},
    setVoiceLeave : (state,{payload}) => {state.Voice.Change=payload},

  },
  extraReducers : builder => {
    builder
      .addCase(EventInit.pending,(state)=>{state.Pending=true})
      .addCase(EventInit.rejected,(state)=>{state.Pending=false})
      .addCase(EventInit.fulfilled,(state)=>{
        state.Pending=false
        state.Ready=true
      })
  }
})


export const {
  setUpdateBot,
  setResetBot,
  setVoiceChange,
  setVoiceError,
  setVoiceJoin,
  setVoiceLeave,
  setVoicePlaying,
  setVoiceQueue
} = EventSlicer.actions
export default EventSlicer.reducer