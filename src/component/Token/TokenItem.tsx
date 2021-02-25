import React from 'react'
import { connect } from 'react-redux'

export const TokenItem = ({Token,dispatch,value,load=false,...props}:any) => {
  return (
    <div className={load?"animate-pulse":""}>
      <p>{value.label}</p>
      <p>{value.token}</p>
    </div>
  )
}

export default connect(state=>state)(TokenItem)
