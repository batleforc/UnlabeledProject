import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActivityType } from "discord.js";
import { DiscordClient, Db } from "../index";
import { Leave } from "./VoiceHandler";
import { SocketEmit, BotEvent } from "./Event";

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
export const BotDisconnect = createAsyncThunk(
  "Bot/disconnect",
  async (_, { dispatch }) => {
    DiscordClient.DisconnectClient({
      whenReady: () => {
        dispatch(BotGetActivity());
        dispatch(setReady(true));
        dispatch(SocketEmit(BotEvent.BotReady));
      },
      onLeave: () => {
        dispatch(Leave());
        dispatch(SocketEmit(BotEvent.BotDisconnect));
      },
      BotUpdate: () => {
        dispatch(SocketEmit(BotEvent.BotUpdate));
      },
      GuildUpdate: () => {
        dispatch(SocketEmit(BotEvent.GuildUpdate));
      },
    });
  }
);

export const BotGetAllParsedServeur = createAsyncThunk(
  "Bot/GetAllServeur",
  async () =>
    DiscordClient.GetAllServer().map((value: any) => {
      return {
        id: value.id,
        ServeurName: value.name,
        ServeurAcronyme: value.nameAcronym,
        Icon: value.iconURL(),
        nbrMembre: value.memberCount,
        ownerID: value.ownerID,
      };
    })
);

export const BotGetAllChan = createAsyncThunk(
  "Bot/GetAllChan",
  async ({ params }: { params: string }) =>
    DiscordClient.GetAllChan(params)?.filter((value) =>
      ["text", "voice"].includes(value.type)
    )
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
  status: DiscordClient.GetPresence()?.status || "",
  name: DiscordClient.GetPresence()?.activities[0].name || "",
  type: DiscordClient.GetPresence()?.activities[0].type || "",
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
  reducers: {
    setReady: (state, { payload }) => {
      state.Ready = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(BotLogin.fulfilled, (state, { payload }) => {
        state.BotId = payload;
      })
      .addCase(BotGetActivity.fulfilled, (state, { payload }) => {
        state.Presence.Status = payload.status;
        state.Presence.name = payload.name;
        state.Presence.type = payload.type;
      })
      .addCase(BotDisconnect.fulfilled, (state) => {
        state.Ready = false;
        state.BotId = -1;
        state.Presence = initialState.Presence;
      }),
});

export const { setReady } = Bot.actions;
export default Bot.reducer;
