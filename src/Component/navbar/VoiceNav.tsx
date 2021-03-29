import React from 'react';
import { connect } from 'react-redux'
import { joinChan, leaveChan, setChanId, setVolume, stopVoice, resumeVoice } from '../../Action/Voice';
import {showCreateTab} from '../../Action/showModal'
export const VoiceNav = ({Voice,Bot,dispatch} : any) => {
  return(
    <nav className="bg-grey text-white flex">
      <div className={`${Bot.user!==undefined?"":"hidden"} flex`}>
        <select
        className="bg-grey focus:outline-none"
        value={Voice.ChanId}
        onChange={(event)=>dispatch(setChanId(event.currentTarget.value))}>
          <option className="text-black" value={-1} key="none" disabled>Select a VoiceChannel</option>
          {Bot.ActiveServeur!==-1&&Bot.ServeurChan?.filter((value : any)=>value.type==="voice").map((value:any)=>
            <option key={value.id} value={value.id}>{value.name}</option>)}
        </select>
        <button
        disabled={Voice.ChanId==="-1"}
        className="px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50"
        onClick={()=>dispatch(joinChan({guildId:Bot.ActiveServeur,ChanId:Voice.ChanId}))} >
          Join
        </button>
        <button
        disabled={!Voice.Status}
        className={`px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
        onClick={()=>dispatch(leaveChan())} >
          Leave
        </button>
        <button
        className={`px-1 mx-4 my-1 bg-gray-600 border rounded-md border-gray-900 disabled:opacity-50`}
        onClick={()=>dispatch(showCreateTab())} >
          CreateTab
        </button>
      </div>
      <div className={`${Voice.Status?"":"hidden"} self-center justify-end flex flex-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>dispatch(resumeVoice())} className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>dispatch(stopVoice())} className="bg-gray-400 rounded-md hover:bg-gray-200 mx-0.5" style={{width:"24px",height:"24px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="hover:bg-gray-900">
          <label htmlFor="volume">Volume:</label>
          <input className="bg-grey" type="number"name="volume" min="0" max="10" onChange={(event)=>dispatch(setVolume(Number(event.target.value)))} value={Voice.Volume} />
        </div>
      </div>
    </nav>
  )
}


export default connect(state=>state)(VoiceNav)