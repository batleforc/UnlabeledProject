import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {startVoice} from '../../Action/Voice'
import GridLayout from 'react-grid-layout'
import { addButton, GetBoard, lock, removeButton, setActiveBoard, setButton, setHandlerLayout, setUrl, unLock, UpdateBoard } from '../../Action/sBoard';
import AddButtonModal from './AddButtonModal'
import AddTabModal from './AddTabModal'

export const Index = ({sBoard,Voice,Bot,dispatch} : any) => {
  var enumMedia ={1:"mp3",2:"YouTube",3:"spotify"}
  // eslint-disable-next-line
  useEffect(()=>dispatch(GetBoard()),[])
  return(
    <div>
      <div className="bg-gray-500 flex">
        {sBoard.ActiveLayout.length!==0&&
          <div>
            <input className="border-2 border-gray-800 mx-2" placeholder="Label" type="string" value={sBoard.button} onChange={(event)=>dispatch(setButton(event.currentTarget.value))} />
            <input className="border-2 border-gray-800 mx-2" placeholder="Url" type="string" value={sBoard.url} onChange={(event)=>dispatch(setUrl(event.currentTarget.value))} />
            <button onClick={()=>dispatch(addButton())} > addButton </button>
            <button className="mx-2" onClick={()=>dispatch(lock())} > Lock </button>
            <button className="mx-2" onClick={()=>dispatch(unLock())} > UnLock </button>
            <button
              className="mx-2"
              onClick={()=>dispatch(UpdateBoard({
                tabId:sBoard.Board[sBoard.ActiveBoard].id,
                content:sBoard.ActiveLayout
              }))}
            >
              Save Layout
            </button>
          </div>}
      </div>
      <div>
        <nav className="flex flex-col sm:flex-row">
          {sBoard.Board.map((value:any,index:number)=>
          <button
            className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${sBoard.ActiveBoard===index?"border-b-2 font-medium border-blue-500":""}`}
            onClick={()=>dispatch(setActiveBoard(index))}
            key={value.id} value={value.id}>
            {value.label}
          </button>)}
        </nav>
      </div>
      <GridLayout onLayoutChange={(Layout)=>dispatch(setHandlerLayout(Layout))} className="layout" layout={sBoard.ActiveLayout} cols={12} rowHeight={30} width={1200}>
        {sBoard.ActiveLayout.map((value:any, index:number)=>
          <div
          key={value.i}
          className="bg-red-500 border-black border-2 cursor-pointer select-none"
          onClick={()=>{if(value.static)dispatch(startVoice(value.url))}} >
            {value.text}
            {!value.static&&
            <div>
              <svg onClick={()=>dispatch(removeButton(index))} className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>}
          </div>)}
      </GridLayout>
      <AddButtonModal />
      <AddTabModal />
    </div>
  )
}


export default connect(state=>state)(Index)