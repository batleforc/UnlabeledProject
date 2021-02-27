import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter} from '../Action/Bot'
import { Route ,Link} from 'react-router-dom'
import TokenComponent from './Token'
import NavBar from './navbar'
import Modal from './Modal'
export const App = ({dispatch,Token}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(BotGetter())
    if(process.env.REACT_APP_NAME!==undefined)
      document.title=process.env.REACT_APP_NAME
      // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {(!Token.Pending && Token.AllToken.length===0) &&<Link to="/token">Est mec ta pas de token ! clic moi dessus</Link>}
      <NavBar />
      <Route path="/token" component={TokenComponent} />
      <Modal warn={true} />
    </div>
  );
}


export default connect((state)=>state)(App)
