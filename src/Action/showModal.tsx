import {createSlice} from '@reduxjs/toolkit'

interface Modal{
  TokenForm:Boolean
}

const initialState ={TokenForm:false} as Modal

const ShowModalSlicer = createSlice({
  name:"showModal",
  initialState,
  reducers :{
    showTokenForm : (state) => {state.TokenForm=true},
    hideTokenForm : (state) => {state.TokenForm=false}
  }
})

export const {
  showTokenForm,
  hideTokenForm
} = ShowModalSlicer.actions
export default ShowModalSlicer.reducer