import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter, BotServerGetter, reset,CanPlay} from '../Action/Bot'
import { Route, Link} from 'react-router-dom'
import TokenComponent from './Token'
import NavBar from './navbar'
import TokenModalForm from './Token/TokenModalForm'
import io from 'socket.io-client'
import {
  EventInit,
  resetResetBot,
  resetUpdateBot,
  resetVoiceSpeaking,
  resetVoiceStart,
  resetVoiceVolume,
} from '../Action/Event'
import {getVolume, getPause, getStatus} from '../Action/Voice'
import Voice from './Voice';
var socket = io((process.env.REACT_APP_SERVER as string),{})
export const App = ({dispatch,Token,Event,Bot}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(CanPlay())
    dispatch(BotGetter({}))
      .then(()=>dispatch(BotServerGetter()))
    dispatch(EventInit({socket}))
    if(process.env.REACT_APP_NAME!==undefined)
      document.title=process.env.REACT_APP_NAME
      // eslint-disable-next-line
  }, []);
  useEffect(()=>{
    if(Event.ReloadBot)
      dispatch(BotGetter({force:true}))
        .then(()=>dispatch(resetUpdateBot()))
        .then(()=>dispatch(BotServerGetter()))
    if(Event.ResetBot)
      dispatch(reset())
        .then(()=>dispatch(resetResetBot()))
    if(Event.Voice.Start)
      dispatch(getStatus())
        .then(()=>dispatch(resetVoiceStart()))
    if(Event.Voice.Volume)
      dispatch(getVolume())
        .then(()=>dispatch(resetVoiceVolume()))
    if(Event.Voice.Speaking)
      dispatch(getPause())
        .then(()=>dispatch(resetVoiceSpeaking()))
    // eslint-disable-next-line
  },[Event])

  return (
    <div className="App">
      <NavBar />
      {(!Token.Pending && Token.AllToken.length===0) && <Link to="/token">Est mec ta pas de token ! clic moi dessus</Link>}
      <Route path="/token" component={TokenComponent} />
      <Route path="/voice" component={Voice} />
      <TokenModalForm />
    </div>
  );
}


export default connect((state)=>state)(App)
