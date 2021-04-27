import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Serveur } from "../index";

export enum BoardEvent {
  BoardUpdate = "BoardUpdate",
  BoardCreate = "BoardCreate",
  BoardDelete = "BoardDelete",
}

export enum VoiceEvent {
  VoiceJoin = "VoiceJoin",
  VoiceLeave = "VoiceLeave",
  VoiceUpdate = "VoiceUpdate",
  VoiceQueue = "VoiceQueueUpdate",
  VoiceError = "VoiceError",
  VoiceVolume = "VoiceVolume",
}

export enum BotEvent {
  BotConnect = "BotConnect",
  BotDisconnect = "BotDisconnect",
  BotUpdate = "BotUpdate",
  GuildUpdate = "guildUpdate",
  
}

export enum TokenEvent {
  TokenCreate = "TokenCreate",
  TokenDelete = "TokenDelete",
}

interface event {}
const initialState = {} as event;
const Event = createSlice({
  name: "Event",
  initialState,
  reducers: {
    SocketEmit: (state, { payload }) => {
      Serveur.GetSocket().emit(payload);
    },
  },
});

export default Event.reducer;
export const { SocketEmit } = Event.actions;
