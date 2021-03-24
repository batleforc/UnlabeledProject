import Router from '@koa/router'
import Discord from '../../Utils/Discord';
var Voice = new Router();

Voice
  .get("/volume", async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetVolume()||5
    return await next()
  })
  .get("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetIsPaused()
    return await next()
  })
  .get("/status",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetStatus()
    return await next()
  })
  .get("/",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceGetChan()
    return await next()
  })
  .post("/join",async (ctx : any, next : any)=>{
    var {guildId,chanId} = ctx.request.body
    if(guildId===undefined||chanId===undefined){
      ctx.body={message:"Param manquant",guildId:guildId===undefined,chanId:chanId===undefined}
    }
    (ctx.discord as Discord).VoiceJoin(guildId,chanId,ctx.io)
    ctx.body={
      launched:true
    };
    return await next()
  })
  .post("/leave",async (ctx : any, next : any)=>{
    (ctx.discord as Discord).VoiceLeave()
    ctx.body={launched:true}
    return await next()
  })
  .post("/volume",async (ctx : any, next : any)=>{
    var {vol} = ctx.request.body
    if(vol===undefined){
      ctx.body={message:"Param manquant",vol:vol===undefined}
      return await next()
    }
    (ctx.discord as Discord).VoiceVolume(vol);
    ctx.body={launched:true}
    return await next()
  })
  .post("/play",async (ctx : any, next : any)=>{
    var {toPlay,option} = ctx.request.body
    if(toPlay===undefined){
      ctx.body={message:"Param manquant ",toPlay:toPlay===undefined}
    }
    (ctx.discord as Discord).VoicePlay(toPlay,option)
    ctx.body={launched:true}
    return await next()
  })
  .post("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceStop()
    ctx.body={launched:true}
    return await next()
  })
  .post("/resume",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).VoiceResume()
    ctx.body={launched:true}
    return await next()
  })


export default Voice;