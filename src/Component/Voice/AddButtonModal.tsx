import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {hideCreateButton} from '../../Action/showModal'
import ButtonForm from './ButtonForm'
import { resetCreateButtonModal } from '../../Action/sBoard'

const TokenModalForm = ({ShowModal,dispatch}:any) =>{
  return(
    <Modal
      warn={false}
      on={ShowModal.CreateButton}
      exitOnEscape={true}
      title="Create Sound : "
      activate={() => {
        dispatch(hideCreateButton())
        dispatch(resetCreateButtonModal())
      }}
      activateText="Exit"
      Content={ButtonForm} />
  )
}

export default connect(state=>state)(TokenModalForm)