import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter} from '../Action/Bot'
import { Route ,Link} from 'react-router-dom'
import TokenComponent from './Token'
import NavBar from './navbar'
import Modal from './Modal'
import TokenModalForm from './Token/TokenModalForm'
import io from 'socket.io-client'
import {EventInit} from '../Action/Event'
var socket = io((process.env.REACT_APP_SERVER as string),{})
export const App = ({dispatch,Token,Event}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(BotGetter({}))
    dispatch(EventInit({socket}))
    if(process.env.REACT_APP_NAME!==undefined)
      document.title=process.env.REACT_APP_NAME
      // eslint-disable-next-line
  }, []);
  useEffect(()=>{
    if(Event.ReloadBot){
      dispatch(BotGetter({force:true}))
    }
    // eslint-disable-next-line
  },[Event])

  return (
    <div className="App">
      <NavBar />
      {(!Token.Pending && Token.AllToken.length===0) && <Link to="/token">Est mec ta pas de token ! clic moi dessus</Link>}
      <Route path="/token" component={TokenComponent} />
      <Modal warn={true} on={false} />
      <TokenModalForm />
    </div>
  );
}


export default connect((state)=>state)(App)
