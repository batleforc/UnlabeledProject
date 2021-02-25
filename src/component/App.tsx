import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter} from '../Action/Bot'
import NavBar from './navbar'
export const App = ({dispatch}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(BotGetter())
    if(process.env.REACT_APP_NAME!==undefined)
      document.title=process.env.REACT_APP_NAME
  }, []);
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}


export default connect((state)=>state)(App)
