import React from 'react'
import { connect } from 'react-redux'

export const index = ({Bot,...props}: any) => {
  return (
    <nav className="bg-secondary text-white flex">
      <div id="Label" className=" px-2 justify-start ">
        <p className="text-lg">{process.env.REACT_APP_NAME}</p>
      </div>
      <div id="Nav" className="flex-1 justify-start">
        
      </div>
      <div id="BotLogo" className="flex flex-1 place-items-center text-center justify-end leading-3">
        {Bot.link!==""&&
        <div className="px-2">
          <p className="text-base">{Bot.user?Bot.user.tag:""}</p>
          <a className="text-xs" href={Bot.link} target="_blank" rel="noreferrer">Lien d'invitation</a>
        </div>}
        {Bot.link===""&&
        <div className="px-2">
          <p className="text-base">No bot Ready</p>
        </div>}
        <img className=" z-10 w-9 rounded" src={Bot.img} />
      </div>
    </nav>
  )
}

export default connect(state=>state)(index)
