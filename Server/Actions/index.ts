import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Board from "./Board";
import Event from "./Event";
import Token from "./Token";
import Bot from "./Bot";
import Voice from "./VoiceHandler";

const store = configureStore({
  reducer: {
    Board,
    Event,
    Token,
    Voice,
    Bot,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
