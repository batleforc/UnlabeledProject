import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter} from '../Action/Bot'
import { Route } from 'react-router-dom'
import TokenComponent from './Token'
import NavBar from './navbar'
export const App = ({dispatch,Token}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(BotGetter())
    if(process.env.REACT_APP_NAME!==undefined)
      document.title=process.env.REACT_APP_NAME
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Route path="/token" component={TokenComponent} />
    </div>
  );
}


export default connect((state)=>state)(App)
