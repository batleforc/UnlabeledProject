import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import {BotGetter} from '../Action/Bot'
import NavBar from './navbar'
export const App = ({dispatch}:any) => {
  useEffect(() => {
    dispatch(TokenGetter())
    dispatch(BotGetter())
  }, []);
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}


export default connect((state)=>state)(App)
