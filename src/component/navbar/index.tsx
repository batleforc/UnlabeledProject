import React from 'react'
import { connect } from 'react-redux'

export const index = ({props}: any) => {
  return (
    <nav className="bg-primary">
      <div id="Label" className="">
        <h1>{process.env.REACT_APP_NAME}</h1>
      </div>
      <div id="Nav" className="">
        
      </div>
      <div id="BotLogo" className="">
        
      </div>
    </nav>
  )
}



export default connect(state=>state)(index)
