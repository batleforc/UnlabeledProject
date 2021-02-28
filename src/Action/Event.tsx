import {createSlice} from '@reduxjs/toolkit'

interface Event {
  ReloadBot : Boolean
}

const initialState = {ReloadBot: false} as Event

const EventSlicer = createSlice({
  name:"Event",
  initialState,
  reducers:{

  }
})


export const {

} = EventSlicer.actions
export default EventSlicer.reducer