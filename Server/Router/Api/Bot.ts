import Router from '@koa/router'
import { VoiceChannel } from 'discord.js';
import DataBase from '../../Utils/Db';
import Discord from '../../Utils/Discord';
var Bot = new Router();

Bot
  .get("/serveur", async (ctx : any , next : any) => {
    if(ctx.discord.Ready)
      ctx.body=ctx.body = ctx.discord.GetAllServer().map((value:any,index:number)=>{
        return {
          id:value.id,
          ServeurName :value.name,
          ServeurAcronyme:value.nameAcronym,
          Icon : value.iconURL(),
          nbrMembre:value.memberCount,
          ownerID:value.ownerID
        }
      })
    else
      ctx.body={
        message:"Bot not started yet or not ready"
      }
      await next()
  })
  .get("/chan/:id", async (ctx : any, next : any) => {
    var params = ctx.params.id;
    if(ctx.discord.Ready){
      ctx.body = (ctx.discord as Discord).GetAllChan(params)?.filter(value=>["text","voice"].includes(value.type))
    }
    else
      ctx.body=[]
    await next()
  })
  .post("/start", async (ctx : any, next :any) => {
    var {id} = ctx.request.body
    if(id===undefined){
      ctx.body={message:"id manquant"}
      await next()
    }else{
      if(ctx.discord.Ready)
        (ctx.discord as Discord).DisconnectClient(ctx.io);
      (ctx.Db as DataBase).GetToken(id)
        .then((value)=>{
          (ctx.discord).LoginClient(value.token,id);
        });
      ctx.body={message:"all Is Green"}
    }
    await next()
  })
  .post("/stop", async (ctx : any, next :any) => {
    (ctx.discord as Discord).DisconnectClient(ctx.io);
    ctx.body={message:"all Is Green"}
    await next()
  })

export default Bot;