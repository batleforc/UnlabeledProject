import Router from '@koa/router'
import Discord from '../../Utils/Discord';
var Voice = new Router();

Voice
  .get("/volume", async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetVolume()
    next()
  })
  .get("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetIsPaused()
    next()
  })
  .get("/status",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetStatus()
    next()
  })
  .get("/",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetChan()
    next()
  })
  .post("/join",async (ctx : any, next : any)=>{
    var {guildId,chanId} = ctx.request
    if(guildId===undefined||chanId===undefined){
      ctx.body={message:"Param manquant",guildId:guildId===undefined,chanId:chanId===undefined}
    }
    ctx.body=(ctx.discord as Discord).VoiceJoin(guildId,chanId);
    next()
  })
  .post("/leave",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceLeave()
    next()
  })
  .post("/volume",async (ctx : any, next : any)=>{
    var {vol} = ctx.request
    if(vol===undefined){
      ctx.body={message:"Param manquant",vol:vol===undefined}
    }
    ctx.body=(ctx.discord as Discord).VoiceVolume(vol);
    next()
  })
  .post("/play",async (ctx : any, next : any)=>{
    var {toPlay,option} = ctx.request
    if(toPlay===undefined){
      ctx.body={message:"Param manquant",toPlay:toPlay===undefined}
    }
    ctx.body=(ctx.discord as Discord).VoicePlay(toPlay,option);
    next()
  })
  .post("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceStop()
    next()
  })
  .post("/resume",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceResume()
    next()
  })


export default Voice;