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
    next()
  })
  .get("/chan/:id", async (ctx : any, next : any) => {
    var params = ctx.params.id;
    if(ctx.discord.Ready){
      ctx.body = (ctx.discord as Discord).GetAllChan(params).filter(value=>["text","voice"].includes(value.type))
    }
    else
      ctx.body=[]
    next()
  })
  .get("/join", async (ctx : any, next: any)=>{
    var chann = (ctx.discord as Discord).GetOneChan("516033688484446228","516033688933498892")
    var connection = (chann as VoiceChannel).join()
    var dispatch = (await connection).play("C:\\Users\\Maxime\\Downloads\\run-vine-sound-effect.mp3")
  })
  .post("/start", async (ctx : any, next :any) => {
    if(ctx.request.body.id===undefined)
    if(ctx.discord.Ready)
      (ctx.discord as Discord).DisconnectClient(ctx.io);
    (ctx.discord).LoginClient((ctx.Db as DataBase).GetToken(ctx.request.body.id).token);
    ctx.body={message:"all Is Green"}
    next()
  })
  .post("/stop", async (ctx : any, next :any) => {
    (ctx.discord as Discord).DisconnectClient(ctx.io);
    ctx.body={message:"all Is Green"}
    next()
  })

export default Bot;