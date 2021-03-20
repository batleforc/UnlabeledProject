import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import {hideCreateTab} from '../../Action/showModal'

const TokenModalForm = ({ShowModal,dispatch}:any) =>{
  return(
    <Modal
      warn={false}
      on={ShowModal.CreateTab}
      exitOnEscape={true}
      title="Create Tab : "
      activate={()=>dispatch(hideCreateTab())}
      activateText="Exit"
      Content={()=><div></div>} />
  )
}

export default connect(state=>state)(TokenModalForm)