import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TokenGetter } from "../Action/Token";
import {
  BotGetter,
  BotServerGetter,
  CanPlay,
  BotServeurChanGetter,
  BotPresenceGetter,
} from "../Action/Bot";
import { Route } from "react-router-dom";
import TokenComponent from "./Token";
import NavBar from "./navbar";
import BotCanPlay from "./Bot/modal";
import io from "socket.io-client";
import { EventInit } from "../Action/Event";
import { getVoice } from "../Action/Voice";
import Voice from "./Voice";
var socket = io(process.env.REACT_APP_SERVER as string, {});
export const App = ({ dispatch, Token, Event, Bot }: any) => {
  useEffect(() => {
    dispatch(TokenGetter());
    dispatch(CanPlay());
    dispatch(BotGetter({})).then(() => dispatch(BotServerGetter()));
    dispatch(BotPresenceGetter())
    dispatch(getVoice()).then(({ payload }: any) => {
      if (payload.Chan && payload.Server) {
        dispatch(BotServeurChanGetter(payload.Server.id));
      }
    });
    dispatch(EventInit({ socket }));
    if (process.env.REACT_APP_NAME !== undefined)
      document.title = process.env.REACT_APP_NAME;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Route path={["/", "/token"]} exact component={TokenComponent} />
      <Route path="/voice" component={Voice} />
      <BotCanPlay />
    </div>
  );
};

export default connect((state) => state)(App);
