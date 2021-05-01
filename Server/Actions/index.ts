import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Board from "./Board";
import Event from './Event';
import Token from './Token';
import VoiceHandler from './VoiceHandler';

const store = configureStore({
  reducer: {
    Board,
    Event,
    Token,
    VoiceHandler
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(),
  devTools:true
});

export default store;
