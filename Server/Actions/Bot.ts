import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export interface iBot {
  Ready: Boolean;
  BotId: number;
  Presence: {
    Status: string;

  }
}
const initialState = {
  Ready: false,
  BotId: -1,
  Presence: {
    Status : ""
  }
} as iBot;

const Bot = createSlice({
  name: "Bot",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(BotLogin.fulfilled, (state, { payload }) => {
      state.BotId = payload;
    }),
});

export default Bot.reducer;
