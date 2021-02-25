import Router from '@koa/router'
var Bot = new Router();

Bot
  .get("/serveur", async (ctx : any , next : any) => {
    if(ctx.discord.Ready)
      ctx.body=ctx.body = ctx.discord.GetAllServer()
    else
      ctx.body={
        message:"Bot not started yet or not ready"
      }
    next()
  })

export default Bot;