import React from 'react'
import { connect } from 'react-redux'

export const TokenItem = ({Token,dispatch,value,load=false,...props}:any) => {
  return (
    <div className={load?"animate-pulse":""}>
      <p>{value.label}</p>
      <p>{value.token?value.token.substring(0,4):""}...{value.token?value.token.substring(value.token.length-4):""}</p>
    </div>
  )
}

export default connect(state=>state)(TokenItem)
