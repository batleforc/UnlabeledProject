import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActivityType } from "discord.js";
import { DiscordClient, Db } from "../index";

export const BotGet = createAsyncThunk("Bot/Get", async () =>
  DiscordClient.GetUser()
);

export const BotLogin = createAsyncThunk(
  "Bot/Login",
  async ({ id }: { id: string }) => {
    return Db.GetToken(id).then((value) => {
      DiscordClient.LoginClient(value.token, Number(id));
      return Number(id);
    });
  }
);

export const BotSetActivity = createAsyncThunk(
  "Bot/SetActivity",
  async (
    {
      online,
      name,
      type,
    }: { online: boolean; name: string; type: ActivityType },
    { dispatch }
  ) => {
    DiscordClient.SetPresence(online, name, type);
    dispatch(BotGetActivity());
  }
);

export const BotGetActivity = createAsyncThunk("Bot/GetActivity", async () => ({
  status: DiscordClient.GetPresence().status,
  name: DiscordClient.GetPresence().activities[0].name,
  type: DiscordClient.GetPresence().activities[0].type,
}));

export interface iBot {
  Ready: Boolean;
  BotId: number;
  Presence: {
    Status: string;
    name: string;
    type: string;
  };
}
const initialState = {
  Ready: false,
  BotId: -1,
  Presence: {
    Status: "",
    name: "",
    type: "",
  },
} as iBot;

const Bot = createSlice({
  name: "Bot",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(BotLogin.fulfilled, (state, { payload }) => {
        state.BotId = payload;
      })
      .addCase(BotGetActivity.fulfilled, (state, { payload }) => {
        state.Presence.Status = payload.status;
        state.Presence.name = payload.name;
        state.Presence.type = payload.type;
      }),
});

export default Bot.reducer;
