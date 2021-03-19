import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {startVoice} from '../../Action/Voice'
import GridLayout from 'react-grid-layout'
import { addButton, GetBoard, lock, setActiveBoard, setButton, setHandlerLayout, setUrl, unLock, UpdateBoard } from '../../Action/sBoard';

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
        {sBoard.ActiveLayout.map((value:any)=>
          <div
          key={value.i}
          className="bg-red-500 border-black border-2 cursor-pointer select-none"
          onClick={()=>{if(value.static)dispatch(startVoice(value.url))}} >
            {value.text}
          </div>)}
      </GridLayout>
    </div>
  )
}


export default connect(state=>state)(Index)