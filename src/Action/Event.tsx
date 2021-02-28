import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
interface Event {
  ReloadBot : Boolean,
  Ready : Boolean,
  Pending : Boolean
}
const initialState = {
  ReloadBot: false,
  Ready:false,
  Pending:false
} as Event

export const EventInit = createAsyncThunk(
  "Event/init",
  async ({socket}:any,{dispatch}) =>{
    socket.on("botupdate",()=>{
      dispatch(setUpdateBot())
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
    resetUpdateBot : (state) => {state.ReloadBot = false}
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
  resetUpdateBot
} = EventSlicer.actions
export default EventSlicer.reducer