import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
import NavBar from './navbar'
export const App = (props:any) => {
  useEffect(() => {
    props.dispatch(TokenGetter())
  }, []);
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}


export default connect((state)=>state)(App)
