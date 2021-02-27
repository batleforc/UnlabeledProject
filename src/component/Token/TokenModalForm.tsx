import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import TokenForm from './TokenForm'
import {hideTokenForm} from '../../Action/showModal'

const TokenModalForm = ({ShowModal,dispatch}:any) =>{
  const onEchap = ({key}:any)=>{
    if(key==="Escape"){
      dispatch(hideTokenForm())
      window.removeEventListener('keydown',onEchap);
    }
  }
  useEffect(()=>{
    window.addEventListener("keydown",onEchap);
    return () =>{
      window.removeEventListener('keydown',onEchap);
    }
  })
  return(
    <Modal
      warn={false}
      on={ShowModal.TokenForm}
      title="Create Token : "
      activate={()=>{dispatch(hideTokenForm())}}
      activateText="Exit"
      Content={TokenForm} />
  )
}

export default connect(state=>state)(TokenModalForm)