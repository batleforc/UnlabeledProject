import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
var ApiSBoard = process.env.REACT_APP_SERVER+"/api/sboard/"


export const GetBoard = createAsyncThunk(
  "sBoard/get",
  async (nothing,{dispatch}) => {
    return axios.get(ApiSBoard)
      .then(value=>value.data)
  }
)
export const DeleteBoard = createAsyncThunk(
  "sBoard/Delete",
  async ({tabId}: any,{dispatch}) => {
    return axios.delete(ApiSBoard+`${tabId}`)
      .then(value=>value.data)
  }
)
export const UpdateBoard = createAsyncThunk(
  "sBoard/updateLabel",
  async ({tabId,label,content}: any,{dispatch}) => {
    return axios.put(ApiSBoard+`${tabId}`,{
      label:label,
      content:content
    })
    .then(value=>value.data)
  }
)

export const CreateBoard = createAsyncThunk(
  "sBoard/CreateBoard",
  async ({tabId,label}: any,{dispatch}) => {
    return axios.post(ApiSBoard,{
      label:label
    })
      .then(value=>value.data)
  }
)

interface Board{
  Pending     : Boolean,
  Board       : [any] | [] | any,
  ActiveBoard : Number
}
const initialState = {
  Pending : false,
  Board   : [],
  ActiveBoard : 1
} as Board

const SBoardSlicer = createSlice({
  name:"sBoard",
  initialState,
  reducers:{
    setActiveBoard : (state,{payload}) =>{state.ActiveBoard=payload}
  },
  extraReducers : builder => {
    builder
      .addCase(GetBoard.pending,(state)=>{state.Pending=true})
      .addCase(GetBoard.rejected,(state)=>{state.Pending=false})
      .addCase(GetBoard.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.Board=payload
      })
      .addCase(DeleteBoard.pending,(state)=>{state.Pending=true})
      .addCase(DeleteBoard.rejected,(state)=>{state.Pending=false})
      .addCase(DeleteBoard.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.Board=payload
      })
      .addCase(UpdateBoard.pending,(state)=>{state.Pending=true})
      .addCase(UpdateBoard.rejected,(state)=>{state.Pending=false})
      .addCase(UpdateBoard.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.Board=payload
      })
      .addCase(CreateBoard.pending,(state)=>{state.Pending=true})
      .addCase(CreateBoard.rejected,(state)=>{state.Pending=false})
      .addCase(CreateBoard.fulfilled,(state,{payload})=>{
        state.Pending=false
        state.Board=payload
      })
  }
})

export const {setActiveBoard} = SBoardSlicer.actions
export default SBoardSlicer.reducer