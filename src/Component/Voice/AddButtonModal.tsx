import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {hideCreateButton} from '../../Action/showModal'
import ButtonForm from './ButtonForm'

const TokenModalForm = ({ShowModal,dispatch}:any) =>{
  return(
    <Modal
      warn={false}
      on={ShowModal.CreateButton}
      exitOnEscape={true}
      title="Create Sound : "
      activate={()=>dispatch(hideCreateButton())}
      activateText="Exit"
      Content={ButtonForm} />
  )
}

export default connect(state=>state)(TokenModalForm)