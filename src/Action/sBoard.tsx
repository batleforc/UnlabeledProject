import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
var ApiSBoard = process.env.REACT_APP_SERVER+"/api/sboard/"


export const GetBoard = createAsyncThunk(
  "sBoard/get",
  async (nothing,{dispatch}) => {
    return axios.get(ApiSBoard)
      .then(value=>console.log(value))
  }
)
export const DeleteBoard = createAsyncThunk(
  "sBoard/Delete",
  async ({tabId}: any,{dispatch}) => {
    return axios.delete(ApiSBoard+`${tabId}`)
      .then(value=>console.log(value))
  }
)
export const UpdateBoardLabel = createAsyncThunk(
  "sBoard/updateLabel",
  async ({tabId,label}: any,{dispatch}) => {
    return axios.put(ApiSBoard+`${tabId}`,{
      label:label
    })
      .then(value=>console.log(value))
  }
)
export const UpdateBoardContent = createAsyncThunk(
  "sBoard/updateContent",
  async ({tabId,content}: any,{dispatch}) => {
    return axios.put(ApiSBoard+`${tabId}/`,{
      content:content
    })
      .then(value=>console.log(value))
  }
)
export const CreateBoard = createAsyncThunk(
  "sBoard/updateLabel",
  async ({tabId,label}: any,{dispatch}) => {
    return axios.post(ApiSBoard,{
      label:label
    })
      .then(value=>console.log(value))
  }
)