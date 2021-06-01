import Router from "@koa/router";
import Discord from "../../Utils/Discord";
import {
  Song,
  getIsPaused,
  getStatus,
  GetVoiceStatus,
  Join,
  DeleteSong,
  Leave,
  setVolume,
  Play,
  Pause,
  Resume,
  Stop,
  Skip
} from "../../Actions/VoiceHandler";
import Store from "../../Actions/index";
var Voice = new Router();

Voice.get("/volume", async (ctx: any, next: any) => {
  ctx.body = Store.getState().Voice.Volume;
  await next();
})
  .get("/pause", async (ctx: any, next: any) => {
    ctx.body = getIsPaused();
    await next();
  })
  .get("/status", async (ctx: any, next: any) => {
    ctx.body = getStatus();
    await next();
  })
  .get("/", async (ctx: any, next: any) => {
    await Store.dispatch(GetVoiceStatus()).then(({payload}) => {
      ctx.body = payload;
    });
    await next();
  })
  .post("/join", async (ctx: any, next: any) => {
    var { guildId, chanId } = ctx.request.body;
    if (guildId === undefined || chanId === undefined) {
      ctx.body = {
        message: "Param manquant",
        guildId: guildId === undefined,
        chanId: chanId === undefined,
      };
    } else {
      Store.dispatch(Join({ guildId: guildId, channelId: chanId }));
      ctx.body = {
        launched: true,
      };
    }
    await next();
  })
  .post("/skipAt", async (ctx: any, next: any) => {
    var { id } = ctx.request.body;
    if (id === undefined) {
      ctx.body = {
        message: "Param manquant",
        SongId: id === undefined,
      };
    } else {
      Store.dispatch(DeleteSong(id));
      ctx.body = {
        launched: true,
      };
    }
    await next();
  })
  .post("/leave", async (ctx: any, next: any) => {
    Store.dispatch(Leave());
    ctx.body = { launched: true };
    await next();
  })
  .post("/volume", async (ctx: any, next: any) => {
    var { vol } = ctx.request.body;
    if (vol === undefined) {
      ctx.body = { message: "Param manquant", vol: vol === undefined };
    } else {
      Store.dispatch(setVolume(vol));
      ctx.body = Store.getState().Voice.Volume;
    }
    await next();
  })
  .post("/play", async (ctx: any, next: any) => {
    var { toPlay, now } = ctx.request.body;
    if (toPlay === undefined) {
      ctx.body = { message: "Param manquant ", toPlay: toPlay === undefined };
    } else {
      Store.dispatch(Play({ song: (toPlay as Song), now: now }));
      ctx.body = { launched: true };
    }
    await next();
  })
  .post("/pause", async (ctx: any, next: any) => {
    Store.dispatch(Pause())
    ctx.body = { launched: true };
    await next();
  })
  .post("/resume", async (ctx: any, next: any) => {
    Store.dispatch(Resume())
    ctx.body = { launched: true };
    await next();
  })
  .post("/stop", async (ctx: any, next: any) => {
    Store.dispatch(Stop())
    ctx.body = { launched: true };
    await next();
  })
  .post("/skip", async (ctx: any, next: any) => {
    Store.dispatch(Skip())
    ctx.body = { launched: true };
    await next();
  });

export default Voice;
