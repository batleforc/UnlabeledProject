import Router from '@koa/router'
import Token from './Api/Token'
var router = new Router({
  prefix: '/Api'
});
router
  .get("/",async (ctx : any,next : any)=>{
    ctx.body = "Hello World"
    next()
  })
  .post("/",(ctx : any,next : any)=>{
    ctx.body=ctx.request.body
    next()
  })
  .get("/me",async (ctx:any,next:any)=>{
    if(ctx.discord.Ready)
      ctx.body={
        img:ctx.discord.GetUser()?ctx.discord.GetUser().displayAvatarURL():"https://cdn.discordapp.com/embed/avatars/0.png",
        user:ctx.discord.GetUser()
      }
    else
      ctx.body={
        img:"https://cdn.discordapp.com/embed/avatars/0.png",
        message:"Bot not started yet or not ready"
      }
      next()
  })

router.use('/token', Token.routes(), Token.allowedMethods());

export default router