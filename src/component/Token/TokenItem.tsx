import React from 'react'
import { connect } from 'react-redux'
import { TokenDelete } from '../../Action/Token'

export const TokenItem = ({Token,dispatch,value,load=false,...props}:any) => {
  var del =()=>{
    dispatch(TokenDelete(value.id))
  }
  return (
    <div className={`${load?"animate-pulse":""} border border-primary`}>
      <p>{value.label}</p>
      <p>{value.token?value.token.substring(0,4):""}...{value.token?value.token.substring(value.token.length-4):""}</p>
      <svg xmlns="http://www.w3.org/2000/svg" style={{width:"24px",height:"24px"}} onClick={del} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  )
}

export default connect(state=>state)(TokenItem)
