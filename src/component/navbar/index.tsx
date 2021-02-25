import React from 'react'
import { connect } from 'react-redux'

export const index = ({Bot,...props}: any) => {
  return (
    <nav className="bg-primary flex">
      <div id="Label" className="flex-1">
        <h1>{process.env.REACT_APP_NAME}</h1>
      </div>
      <div id="Nav" className="flex-1">
        
      </div>
      <div id="BotLogo" className="flex-1 place-items-center text-right">
        <img className=" z-10 w-9 rounded float-right" src={Bot.img} />
        <p>{Bot.user?Bot.user.tag:""}</p>
      </div>
    </nav>
  )
}

export default connect(state=>state)(index)
