import React,{useState} from 'react'
import { connect } from 'react-redux'
import {TokenCreate} from '../../Action/Token'

export const TokenForm = ({dispatch,...props}:any) => {
  var [label,setLabel] = useState("");
  var [token,setToken] = useState("");
  var send = () =>{
    dispatch(TokenCreate({label,token}))
  }
  return (
    <div className=" px-3 py-3 space-y-4 justify-self-center">
      <p>Create Token : </p>
      <div className="flex flex-col flex-wrap content-center">
        <label className="block">
          <span>Label</span>
          <input className="px-1 rounded-md border border-primary block" placeholder="Label" type="text" name="Label" value={label} onChange={event=>setLabel(event.target.value)} />
        </label>
        <label className="block">
          <span>Token</span>
          <input className="px-1 rounded-md border border-primary block" placeholder="Token" type="text" name="Token" value={token} onChange={event=>setToken(event.target.value)} />
        </label>
        <input className="flex rounded-md border border-primary px-2" type="button" name="send" value="Send" onClick={send} />
      </div>
    </div>
  )
}

export default connect(state=>state)(TokenForm)
