import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVoice } from "./Voice";
import axios from "axios";
var ApiBot = process.env.REACT_APP_SERVER + "/api/bot/";
interface User {
  img: any;
  user: any;
  link: string;
  Pending: Boolean;
  Serveur: [any] | [];
  ActiveServeur: String;
  ActiveBot: number;
  ServeurChan: [any] | [];
  canPlay: any;
  Presence: {
    Status: string;
    name: string;
    type: string;
  };
}

export const BotGetter = createAsyncThunk(
  "Bot/get",
  async ({ force }: { force?: boolean }, { dispatch }) => {
    return axios
      .get(process.env.REACT_APP_SERVER + "/api/me")
      .then((value) => value.data);
  },
  {
    condition: ({ force }: { force?: boolean }, { getState }): boolean => {
      var test = getState();
      if ((test as any).Bot.user !== null && force !== true) return false;
      return true;
    },
  }
);

export const CanPlay = createAsyncThunk(
  "Bot/CanPlay",
  async (nothing, { dispatch }) => {
    return axios
      .get(process.env.REACT_APP_SERVER + "/api/canplay")
      .then((value) => value.data);
  }
);

export const BotServerGetter = createAsyncThunk(
  "Bot/serveur/get",
  async (value, { dispatch }) => {
    return axios.get(ApiBot + "serveur").then((value2) => value2.data);
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var test = getState();
      if ((test as any).Bot.user === null) return false;
      return true;
    },
  }
);

export const BotServeurChanGetter = createAsyncThunk(
  "Bot/Serveur/chan/get",
  async (value: string, { dispatch }) => {
    return axios
      .get(`${ApiBot}chan/${value}`)
      .then((res) => ({ id: value, res: res.data }));
  }
);
export const BotPresenceGetter = createAsyncThunk(
  "Bot/presence/getter",
  async () => {
    return axios.get(`${ApiBot}presence`).then((value2) => value2.data);
  }
);
export const BotPresenceSetter = createAsyncThunk(
  "Bot/presence/Setter",
  async ({
    online,
    name,
    type,
  }: {
    online: string;
    name: string;
    type: string;
  }) => {
    return axios
      .post(`${ApiBot}presence`, {
        online,
        name,
        type,
      })
      .then((value2) => value2.data);
  }
);

const initialState = {
  img: null,
  user: null,
  Pending: false,
  link: "",
  Serveur: [],
  ActiveServeur: "-1",
  ActiveBot: -1,
  ServeurChan: [],
  canPlay: {
    canPlay: true,
  },
  Presence: {
    Status: "",
    name: "",
    type: "",
  },
} as User;

const BotSlicer = createSlice({
  name: "Bot",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setStatus: (state, { payload }) => {
      state.Presence.Status = payload;
    },
    setName: (state, { payload }) => {
      state.Presence.name = payload;
    },
    setType: (state, { payload }) => {
      state.Presence.type = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BotGetter.fulfilled, (state, { payload }) => {
        state.Pending = false;
        state.img = payload.img;
        state.user = payload.user;
        state.link = payload.link;
        state.ActiveBot = payload.botId;
      })
      .addCase(BotGetter.rejected, (state, action) => {
        state.Pending = false;
      })
      .addCase(BotGetter.pending, (state, Action) => {
        state.Pending = true;
      })
      .addCase(BotServerGetter.pending, (state) => {
        state.Pending = true;
      })
      .addCase(BotServerGetter.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(BotServerGetter.fulfilled, (state, { payload }) => {
        state.Pending = false;
        state.Serveur = payload;
      })
      .addCase(BotServeurChanGetter.pending, (state) => {
        state.Pending = true;
      })
      .addCase(BotServeurChanGetter.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(BotServeurChanGetter.fulfilled, (state, { payload }) => {
        state.Pending = false;
        state.ActiveServeur = payload.id;
        state.ServeurChan = payload.res;
      })
      .addCase(CanPlay.pending, (state) => {
        state.Pending = true;
      })
      .addCase(CanPlay.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(CanPlay.fulfilled, (state, { payload }) => {
        state.Pending = false;
        state.canPlay = payload;
      })
      .addCase(getVoice.fulfilled, (state, { payload }) => {
        if (payload.Server) state.ActiveServeur = payload.Server.id;
      })
      .addCase(BotPresenceGetter.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.Presence = payload;
      });
  },
});

export const { reset, setStatus, setName, setType } = BotSlicer.actions;
export default BotSlicer.reducer;
