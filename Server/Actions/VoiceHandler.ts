import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VoiceChannel, VoiceConnection } from "discord.js";
import { DiscordClient } from "../index";
import { canJoin } from "../Utils/Permissions";
import { SocketEmit, VoiceEvent } from "./Event";
import ytdl from "ytdl-core";
import FFmpeg from "prism-media";

export enum SongType {
  link = 1,
  YouTube = 2,
  Spotify = 3,
}

export interface Song {
  title: string;
  url: string;
  type: SongType;
}

export interface SongQueue {
  voiceChannel: VoiceChannel | null;
  connection: VoiceConnection | null;
}
const SongGState = {
  voiceChannel: null,
  connection: null,
} as SongQueue;

export interface VoiceState {
  Volume: number;
  playing: boolean;
  canPlay: boolean;
  queue: Array<Song>;
}
export const initialState = {
  Volume: 5,
  playing: false,
  queue: [],
  canPlay: false,
} as VoiceState;

export const getIsPaused = () => SongGState.connection?.dispatcher?.paused;
export const getStatus = () => SongGState.connection?.status;

export const GetVoiceStatus = createAsyncThunk(
  "Voice/GetState",
  async (nothing, { getState }) => {
    var { Voice } = getState() as { Voice: VoiceState };

    return {
      Queue: Voice.queue,
      Volume: Voice.Volume,
      Server: SongGState.voiceChannel?.guild,
      Chan: SongGState.voiceChannel,
      Paused: SongGState.connection?.dispatcher?.paused || false,
      Status: SongGState.connection?.status,
    };
  }
);

export const Leave = createAsyncThunk("Voice/Leave", async (_,{dispatch}) => {
  SongGState.connection?.disconnect();
  SongGState.voiceChannel = null;
  dispatch(SocketEmit(VoiceEvent.VoiceLeave))
  return;
});
export const Join = createAsyncThunk(
  "Voice/join",
  async (
    { guildId, channelId }: { guildId: string; channelId: string },
    { dispatch }
  ) => {
    var voiceChan = DiscordClient.GetOneChan(
      guildId,
      channelId
    ) as VoiceChannel;
    if (canJoin(voiceChan)) {
      return voiceChan.join().then((value) => {
        SongGState.voiceChannel = voiceChan;
        SongGState.connection = value;
        dispatch(SocketEmit(VoiceEvent.VoiceJoin))
        return true;
      });
    }
    return false;
  }
);
export const Pause = createAsyncThunk("Voice/Pause", async (_, { dispatch }) => {
  SongGState.connection?.dispatcher?.pause();
  dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
});
export const Resume = createAsyncThunk("Voice/Resume", async (_, { dispatch }) => {
  SongGState.connection?.dispatcher?.resume();
  dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
});

export const Stop = createAsyncThunk(
  "Voice/Stop",
  async (nothing, { dispatch }) => {
    dispatch(Voice.actions.Stop());
    SongGState.connection?.dispatcher?.end();
    dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
  }
);

export const Skip = createAsyncThunk("Voice/Skip", async (_, { dispatch }) => {
  SongGState.connection?.dispatcher?.end();
  dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
});

export const Play = createAsyncThunk(
  "Voice/Play",
  async (
    { song, now }: { song?: Song; now?: boolean },
    { dispatch, getState }
  ) => {
    var { Voice: voice } = getState() as { Voice: VoiceState };
    if (!voice.canPlay || !song) return;
    if (song.type === 2)
      song.title = (await ytdl.getInfo(song.url)).videoDetails.title;
    if (now) {
      dispatch(Voice.actions.AddSongNow({ song: song }));
    } else dispatch(Voice.actions.AddSong({ song: song }));
    if (voice.queue.length <= 1) {
      dispatch(Player());
    }
    dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
  }
);
const Player = createAsyncThunk(
  "Voice/Player",
  async ({}, { getState, dispatch }) => {
    var { Voice: voice } = getState() as { Voice: VoiceState };
    if (voice.queue.length === 0) {
      dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
      return;
    }
    if (voice.canPlay) {
      var dispatcher = SongGState.connection
        ?.play(
          voice.queue[0].type === SongType.link
            ? voice.queue[0].url
            : voice.queue[0].type === SongType.YouTube
            ? ytdl(voice.queue[0].url, { filter: "audioonly" })
            : voice.queue[0].url
        )
        .on("finish", () => {
          dispatch(Voice.actions.ShiftSong());
          dispatch(Player());
          dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
        })
        .on("error", (error) => {
          dispatch(Voice.actions.setPlaying(false));
        });
      dispatch(Voice.actions.setPlaying(true));
      dispatcher?.setVolumeLogarithmic(voice.Volume / 5);
    } else {
      dispatch(Voice.actions.setPlaying(false));
    }
  }
);

export const canPlay = createAsyncThunk("Voice/canPlay", async () => {
  try {
    FFmpeg.FFmpeg.getInfo();
    return { canPlay: true };
  } catch (error) {
    return { canPlay: false, msg: error };
  }
});

export const setVolume = createAsyncThunk(
  "Voice/SetVolume",
  async (volume: Number, { dispatch }) => {
    dispatch(Voice.actions.setVolume(volume))
    dispatch(SocketEmit(VoiceEvent.VoiceVolume))
  }
);

export const DeleteSong = createAsyncThunk(
  "Voice/DeleteSong",
  async (id: number, { dispatch }) => {
    dispatch(Voice.actions.DeleteSong(id))
    dispatch(SocketEmit(VoiceEvent.VoiceUpdate))
  }
)

const Voice = createSlice({
  name: "Voice",
  initialState,
  reducers: {
    setCanPlay: (state, { payload }) => {
      state.canPlay = payload;
    },
    setVolume: (state, { payload }) => {
      state.Volume = payload;
      SongGState.connection?.dispatcher?.setVolumeLogarithmic(payload / 5);
    },
    setPlaying: (state, { payload }) => {
      state.playing = payload;
    },
    DeleteSong: (state, { payload: { id } }) => {
      state.queue.splice(id, 1);
    },
    Stop: (state) => {
      state.queue = [];
    },
    AddSongNow: (state, { payload: { song } }) => {
      state.queue.splice(1, 0, song);
    },
    AddSong: (state, { payload: { song } }) => {
      state.queue.push(song);
    },
    ShiftSong: (state) => {
      state.queue.shift();
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(Leave.fulfilled, (state) => {
        state.canPlay = false;
        state.queue = [];
        state.playing = false;
      })
      .addCase(Join.fulfilled, (state, { payload }) => {
        state.canPlay = payload;
      })
      .addCase(canPlay.fulfilled, (state, { payload }) => {
        state.canPlay = payload.canPlay;
      }),
});

export default Voice.reducer;
