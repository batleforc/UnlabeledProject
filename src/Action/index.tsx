import { configureStore } from "@reduxjs/toolkit";
import Token from "./Token";
import ShowModal from "./showModal";
import Bot from "./Bot";
import Event from "./Event";
import Voice from "./Voice";
import sBoard from "./sBoard";

export default configureStore({
  reducer: {
    Token,
    Bot,
    ShowModal,
    Event,
    Voice,
    sBoard,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
