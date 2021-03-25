import React from 'react'
import { connect } from 'react-redux'
import { TokenDelete , TokenActivate , TokenDeactivate } from '../../Action/Token'

export const TokenItem = ({Token,dispatch,value={label:"Unlabeled Token"},load=false,...props}:any) => {
  var del =()=>{if(value.id) dispatch(TokenDelete(value.id))}
  var play = () =>{if(value.id) dispatch(TokenActivate(value.id))}
  var stop = () => {if(value.id) dispatch(TokenDeactivate(value.id))}
  return (
    <div className={`${load?"animate-pulse":""} mx-1 my-1 border border-primary flex flex-col flex-wrap rounded-md p-1 whitespace-wrap text-center`}>
      <p>{value.label}</p>
      <p>{value.token?value.token.substring(0,4):"To...Ken"}{value.token?"...":""}{value.token?value.token.substring(value.token.length-4):""}</p>
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} onClick={del} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} onClick={play} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} onClick={stop} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </div>
  )
}

export default connect(state=>state)(TokenItem)
