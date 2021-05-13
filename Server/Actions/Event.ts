import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Serveur } from "../index";

export enum BoardEvent {
  BoardUpdate = "BoardUpdate",
  BoardCreate = "BoardCreate",
  BoardDelete = "BoardDelete",
}

export enum VoiceEvent {
  VoiceJoin = "VoiceJoin",
  VoiceChange = "VoiceChanChange",
  VoiceLeave = "VoiceLeave",
  VoiceUpdate = "VoiceUpdate",
  VoiceQueue = "VoiceQueueUpdate",
  VoiceError = "VoiceError",
  VoiceVolume = "VoiceVolume",
}

export enum BotEvent {
  BotReady = "BotReady",
  BotDisconnect = "BotDisconnect",
  BotUpdate = "BotUpdate",
  GuildUpdate = "guildUpdate",
}

export enum TokenEvent {
  TokenCreate = "TokenCreate",
  TokenDelete = "TokenDelete",
  TokenUpdate = "TokenUpdate",
}

export enum AppEvent {
  ServeurRestart = "AppRestart",
  ServeurStop = "AppStop",
  ConfUpdate = "ConfigUpdate",
  ClientRestart = "AppRestart",
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
