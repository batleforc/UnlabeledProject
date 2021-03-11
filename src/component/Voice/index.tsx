import React,{useState} from 'react';
import { connect } from 'react-redux';
import {startVoice} from '../../Action/Voice'

export const Index = ({Voice,Bot,dispatch} : any) => {
  var [sound,setSound] = useState("")
  return(
    <div className="bg-gray-500">
      <input type="string" value={sound} onChange={(event)=>setSound(event.currentTarget.value)} />
      <button onClick={()=>dispatch(startVoice(sound))} >Play</button>
    </div>
  )
}


export default connect(state=>state)(Index)