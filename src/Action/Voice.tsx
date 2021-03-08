import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'

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