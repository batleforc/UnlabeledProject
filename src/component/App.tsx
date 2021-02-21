import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import {TokenGetter} from '../Action/Token'
export const App = (props:any) => {
  useEffect(() => {
    props.dispatch(TokenGetter())
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default connect((state)=>state)(App)
