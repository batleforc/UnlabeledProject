import React,{useState} from 'react';
import { connect } from 'react-redux'
import { CreateBoard } from '../../Action/sBoard';

export const TabForm =({dispatch,Voice,...props}:any)=>{
  var [label,setLabel] = useState("");
  var send = () => {
    if(label.length>=2){
      dispatch(CreateBoard({label:label}))
      setLabel("")
    }
  }
  return(
    <div className=" px-3 py-3 space-y-4 justify-self-center">
      <div className="flex flex-col flex-wrap content-center">
        <label className="block text-center">
          <span>Board label</span>
          <input className="px-1 rounded-md border border-primary block" placeholder="Label" type="text" name="Label" value={label} onChange={event=>setLabel(event.target.value)} />
        </label>
        <input disabled={Voice.Pending} className="py-1 my-3 text-center rounded-md border border-primary px-2" type="button" name="send" value="Send" onClick={send} />
      </div>
    </div>
  )
}

export default connect(state=>state)(TabForm)