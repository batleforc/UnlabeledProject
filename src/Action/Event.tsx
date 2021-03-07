import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
interface Event {
  ReloadBot : Boolean,
  Ready : Boolean,
  Pending : Boolean,
  ResetBot : Boolean
}
const initialState = {
  ReloadBot: false,
  Ready:false,
  Pending:false,
  ResetBot:false
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
    resetResetBot : (state) => {state.ResetBot=false}
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
  resetResetBot
} = EventSlicer.actions
export default EventSlicer.reducer