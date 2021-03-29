import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {setBurger} from '../../Action/showModal'
import ServeurSelect from './ServeurSelect'
import Nav from './nav'

export const TopNavBar = ({Bot,dispatch,ShowModal,...props}: any) => {
  return (
    <nav className="bg-secondary text-white flex">
      <div id="Label" className=" px-2 justify-start ">
        <Link to="/">
          <p className="text-lg">{process.env.REACT_APP_NAME}</p>
        </Link>
      </div>
      {Bot.user!==undefined&&<ServeurSelect />}
      <Nav />
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
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>dispatch(setBurger(!ShowModal.Burger))} className="rounded-md z-10 w-9 hover:bg-gray-200 mx-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </nav>
  )
}

export default connect(state=>state)(TopNavBar)
