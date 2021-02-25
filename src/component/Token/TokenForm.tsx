import React,{useState} from 'react'
import { connect } from 'react-redux'

export const TokenForm = ({dispatch,...props}:any) => {
  var [label,setLabel] = useState("");
  var [token,setToken] = useState("");
  return (
    <div>
      <input type="text" name="Label" value={label} onChange={event=>setLabel(event.target.value)} />
      <input type="text" name="Token" value={token} onChange={event=>setToken(event.target.value)} />
      <input type="button" name="send" value="Send" />
    </div>
  )
}

export default connect(state=>state)(TokenForm)
