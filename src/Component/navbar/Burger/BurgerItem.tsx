import React from 'react'
import {Link} from 'react-router-dom'

export const BurgerItem =({Icon = ()=><div></div>,label,to}:any)=>{
  return(
  <Link to={to} className="flex flex-row place-items-center justify-center m-2 rounded-md hover:bg-gray-200 mx-0.5">
    <Icon className="z-10 w-9 mx-0.5" />
    <p>{label}</p>
  </Link>)
}