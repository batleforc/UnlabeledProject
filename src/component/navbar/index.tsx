import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ServeurSelect from './ServeurSelect'

export const index = ({Bot,...props}: any) => {
  return (
    <nav className="bg-secondary text-white flex">
      <div id="Label" className=" px-2 justify-start ">
        <Link to="/">
          <p className="text-lg">{process.env.REACT_APP_NAME}</p>
        </Link>
      </div>
      {Bot.user!==undefined&&<ServeurSelect />}
      <div id="BotLogo" className="flex flex-1 place-items-center text-center justify-end leading-3">
        {Bot.link!==""&&
        <div className="px-2">
          <Link to="/token"><p className="text-base">{Bot.user?Bot.user.tag:""}</p></Link>
          <a className="text-xs" href={Bot.link} target="_blank" rel="noreferrer">Lien d'invitation</a>
        </div>}
        {Bot.link===""&&
        <Link to="/token" className="px-2">
          <p className="text-base">No bot Ready</p>
        </Link>}
        <img alt="Icon du bot" className=" z-10 w-9 rounded" src={Bot.img} />
      </div>
    </nav>
  )
}

export default connect(state=>state)(index)
