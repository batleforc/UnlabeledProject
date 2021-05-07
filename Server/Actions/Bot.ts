import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DiscordClient } from "../index";

export interface iBot {
  Ready: Boolean;
  BotId: number;
  BotStatut: string;
}
const initialState = {
  Ready: false,
  BotId: -1,
  BotStatut:""
} as iBot;

const Bot = createSlice({
  name: "Bot",
  initialState,
  reducers: {},
});

export default Bot.reducer;
