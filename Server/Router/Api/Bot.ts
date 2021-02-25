import Router from '@koa/router'
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

export default Bot;