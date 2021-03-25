import React from 'react';
import { connect } from 'react-redux'
import { setButton,setUrl, addButton } from '../../Action/sBoard';

export const ButtonForm =({dispatch,Voice,sBoard,...props}:any)=>{
  var send = () =>{
    if(sBoard.button.length>=2&&sBoard.url.length>=2){
      dispatch(addButton())
    }
  }
  return(
    <div className=" px-3 py-3 space-y-4 justify-self-center">
      <div className="flex flex-col flex-wrap content-center">
        <label className="block text-center">
          <span>Label</span>
          <input className="px-1 rounded-md border border-primary block" placeholder="Label" type="text" name="Label" value={sBoard.button} onChange={(event)=>dispatch(setButton(event.currentTarget.value))} />
        </label>
        <label className="block text-center">
          <span>url</span>
          <input className="px-1 rounded-md border border-primary block" placeholder="url" type="text" name="Token" value={sBoard.url} onChange={(event)=>dispatch(setUrl(event.currentTarget.value))} />
        </label>
        <input disabled={sBoard.Pending} className="py-1 my-3 text-center rounded-md border border-primary px-2" type="button" name="send" value="Send" onClick={send} />
      </div>
    </div>
  )
}

export default connect(state=>state)(ButtonForm)