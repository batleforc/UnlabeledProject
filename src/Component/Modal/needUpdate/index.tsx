import React from 'react'
import { connect } from 'react-redux'
import Modal from '../index'
import {setNeedUpdate} from '../../../Action/showModal'
const NeedUpdate = ({ShowModal,dispatch}:any) =>{
  return(
    <Modal
      warn={false}
      on={ShowModal.needUpdate}
      exitOnEscape={true}
      title="Votre application n'est pas a jours : "
      activate={()=>dispatch(setNeedUpdate(false))}
      activateText="Exit"
      Content={() => {
        return <div>
          <h1>Votre application est en {process.env.REACT_APP_VERSION}</h1>
          <p>La dernière version de l'application est la {ShowModal.versionGithub}</p>
          <a href="https://github.com/batleforc/UnlabeledProject/releases">&gt; Veuillez mettre a jours votre application &lt;</a>
        </div>
      }} />
  )
}

export default connect(state=>state)(NeedUpdate)