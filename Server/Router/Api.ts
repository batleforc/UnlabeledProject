import Router from '@koa/router'
import Token from './Api/Token'
import Bot from './Api/Bot'
import Voice from './Api/Voice'
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
        user:ctx.discord.GetUser(),
        link:`https://discord.com/oauth2/authorize?client_id=${ctx.discord.GetUser().id}&scope=bot&permissions=343273214`
      }
    else
      ctx.body={
        img:"https://cdn.discordapp.com/embed/avatars/0.png",
        message:"Bot not started yet or not ready",
        link:""
      }
      next()
  })

router.use('/token', Token.routes(), Token.allowedMethods());
router.use('/bot', Bot.routes(), Bot.allowedMethods());
router.use('/voice',Voice.routes(),Voice.allowedMethods());

export default router