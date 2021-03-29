import Router from '@koa/router'
import Discord from '../../Utils/Discord';
import {Song} from '../../Utils/VoiceHandler'
var Voice = new Router();

Voice
  .get("/volume", async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().getVolume()
    await next()
  })
  .get("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().getIsPaused()
    await next()
  })
  .get("/status",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().getStatus()
    await next()
  })
  .get("/",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().getVoiceStatus()
    await next()
  })
  .post("/join",async (ctx : any, next : any)=>{
    var {guildId,chanId} = ctx.request.body
    if(guildId===undefined||chanId===undefined){
      ctx.body={message:"Param manquant",guildId:guildId===undefined,chanId:chanId===undefined}
    }else{
      (ctx.discord as Discord).VoiceJoin(guildId,chanId,ctx.io)
      ctx.body={
        launched:true
      };
    }
    await next()
  })
  .post("/leave",async (ctx : any, next : any)=>{
    (ctx.discord as Discord).VoiceLeave(ctx.io)
    ctx.body={launched:true}
    await next()
  })
  .post("/volume",async (ctx : any, next : any)=>{
    var {vol} = ctx.request.body
    if(vol===undefined){
      ctx.body={message:"Param manquant",vol:vol===undefined}
    }else{
      (ctx.discord as Discord).getVoice().SetVolume(ctx.io,vol)
      ctx.body={launched:true}
    }
    await next()
  })
  .post("/play",async (ctx : any, next : any)=>{
    var {toPlay,now} = ctx.request.body
    if(toPlay===undefined){
      ctx.body={message:"Param manquant ",toPlay:toPlay===undefined}
    }else{
      (ctx.discord as Discord).getVoice().Play(ctx.io,(toPlay as Song),now)
      ctx.body={launched:true}
    }
    await next()
  })
  .post("/pause",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().Pause(ctx.io)
    ctx.body={launched:true}
    await next()
  })
  .post("/resume",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().Resume(ctx.io)
    ctx.body={launched:true}
    await next()
  })
  .post("/stop",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().Stop(ctx.io)
    ctx.body={launched:true}
    await next()
  })
  .post("/skip",async (ctx : any, next : any)=>{
    ctx.body=(ctx.discord as Discord).getVoice().Skip(ctx.io)
    ctx.body={launched:true}
    await next()
  })



export default Voice;