import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Board from "./Board";

const store = configureStore({
  reducer: {
    Board,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(),
  devTools:true
});

export default store;
