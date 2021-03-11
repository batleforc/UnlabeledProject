import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
interface Event {
  ReloadBot : Boolean,
  Ready : Boolean,
  Pending : Boolean,
  ResetBot : Boolean,
  Voice  : {
    Start : Boolean,
    Volume : Boolean,
    Speaking : Boolean
  }
}
const initialState = {
  ReloadBot: false,
  Ready:false,
  Pending:false,
  ResetBot:false,
  Voice : {
    Start : false,
    Volume : false,
    Speaking : false
  }
} as Event

export const EventInit = createAsyncThunk(
  "Event/init",
  async ({socket}:any,{dispatch}) =>{
    socket.on("botUpdate",()=>{
      dispatch(setUpdateBot())
    })
    socket.on("botReset",()=>{
      dispatch(setResetBot())
    })
    socket.on("VoiceStart",()=>{
      dispatch(setVoiceStart())
    })
    socket.on("VoiceVolume",()=>{
      dispatch(setVoiceVolume())
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
    setUpdateBot : (state) => {state.ReloadBot = true;},
    resetUpdateBot : (state) => {state.ReloadBot = false},
    setResetBot : (state) => {state.ResetBot=true},
    resetResetBot : (state) => {state.ResetBot=false},
    setVoiceStart : (state) => {state.Voice.Start=true},
    resetVoiceStart : (state) => {state.Voice.Start=false},
    setVoiceVolume : (state) => {state.Voice.Volume=true},
    resetVoiceVolume : (state) => {state.Voice.Volume=false},
    setVoiceSpeaking : (state) => {state.Voice.Speaking=true},
    resetVoiceSpeaking : (state) => {state.Voice.Speaking=false},
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
  resetUpdateBot,
  setResetBot,
  resetResetBot,
  setVoiceSpeaking,
  setVoiceStart,
  setVoiceVolume,
  resetVoiceSpeaking,
  resetVoiceStart,
  resetVoiceVolume
} = EventSlicer.actions
export default EventSlicer.reducer