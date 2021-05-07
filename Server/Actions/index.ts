import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Board from "./Board";
import Event from "./Event";
import Token from "./Token";
import Bot from "./Bot";
import VoiceHandler from "./VoiceHandler";

const store = configureStore({
  reducer: {
    Board,
    Event,
    Token,
    VoiceHandler,
    Bot,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
