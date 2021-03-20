import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {hideCreateButton} from '../../Action/showModal'

const TokenModalForm = ({ShowModal,dispatch}:any) =>{
  return(
    <Modal
      warn={false}
      on={ShowModal.CreateButton}
      exitOnEscape={true}
      title="Create Button : "
      activate={()=>dispatch(hideCreateButton())}
      activateText="Exit"
      Content={()=><div></div>} />
  )
}

export default connect(state=>state)(TokenModalForm)