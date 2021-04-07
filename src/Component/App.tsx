import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TokenGetter } from "../Action/Token";
import {
  BotGetter,
  BotServerGetter,
  reset,
  CanPlay,
  BotServeurChanGetter,
} from "../Action/Bot";
import { Route, Link } from "react-router-dom";
import TokenComponent from "./Token";
import NavBar from "./navbar";
import TokenModalForm from "./Token/TokenModalForm";
import BotCanPlay from "./Bot/modal";
import io from "socket.io-client";
import {
  EventInit,
  setResetBot,
  setUpdateBot,
  setVoiceChange,
  setVoiceJoin,
  setVoiceQueue
} from "../Action/Event";
import { getStatus, getVoice } from "../Action/Voice";
import Voice from "./Voice";
var socket = io(process.env.REACT_APP_SERVER as string, {});
export const App = ({ dispatch, Token, Event, Bot }: any) => {
  useEffect(() => {
    dispatch(TokenGetter());
    dispatch(CanPlay());
    dispatch(BotGetter({})).then(() => dispatch(BotServerGetter()));
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
  useEffect(() => {
    if (Event.ReloadBot)
      dispatch(BotGetter({ force: true }))
        .then(() => dispatch(setUpdateBot(false)))
        .then(() => dispatch(BotServerGetter()));
    if (Event.ResetBot)
      dispatch(reset()).then(() => dispatch(setResetBot(false)));
    if (Event.Voice.Join)
      dispatch(getStatus()).then(() => dispatch(setVoiceJoin(false)));
    if (Event.Voice.Change||Event.Voice.Queue)
      dispatch(getVoice()).then(() => dispatch(setVoiceChange(false))&&dispatch(setVoiceQueue(false)));
    // eslint-disable-next-line
  }, [Event]);

  return (
    <div className="App">
      <NavBar />
      {!Token.Pending && Token.AllToken.length === 0 && (
        <Link to="/token">Est mec ta pas de Bot ! clic moi dessus</Link>
      )}
      <Route path={["/","/token"]} exact component={TokenComponent} />
      <Route path="/voice" component={Voice} />
      <TokenModalForm />
      <BotCanPlay />
    </div>
  );
};

export default connect((state) => state)(App);
