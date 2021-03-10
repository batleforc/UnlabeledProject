import React from 'react';
import { connect } from 'react-redux'

export const VoiceNav = ({Voice,Bot} : any) => {

  return(
    <nav className="bg-grey text-white flex">
      <div className={`${Bot.user!==undefined?"":"hidden"}`}>
        <h1>test</h1>
      </div>
      <div className={`${Voice.Status?"":"hidden"}`}>

      </div>
    </nav>
  )
}


export default connect(state=>state)(VoiceNav)