import Router from '@koa/router'
import Token from './Api/Token'
import Bot from './Api/Bot'
import Voice from './Api/Voice'
import sBoard from './Api/sboard'
import FFmpeg from 'prism-media'
import os from 'os'
var router = new Router({
  prefix: '/Api'
});
router
  .get("/",async (ctx : any,next : any)=>{
    ctx.body = "Hello World"
    await next()
  })
  .post("/", async (ctx : any,next : any)=>{
    ctx.body=ctx.request.body
    await next()
  })
  .get("/canPlay", async (ctx : any, next:any)=>{
    ctx.body={
      canPlay:false,
      os : process.env.npm_config_platform || os.platform(),
      ffmpeg:"https://www.ffmpeg.org/download.html",
      link:{
        win:"#build-windows",
        linux:"#build-linux",
        mac:"#build-mac"
      },
      where:ctx.store.GetConf("ffmpeg")
    }
    try{
      FFmpeg.FFmpeg.getInfo()
      ctx.body.canPlay = true
    } catch(error){
      ctx.body.canPlay = false
      ctx.body.message=error
    }
    await next()
  })
  .get("/me",async (ctx:any,next:any)=>{
    if(ctx.discord.Ready)
      ctx.body={
        img:ctx.discord.GetUser()?ctx.discord.GetUser().displayAvatarURL():"https://cdn.discordapp.com/embed/avatars/0.png",
        user:ctx.discord.GetUser(),
        link:`https://discord.com/oauth2/authorize?client_id=${ctx.discord.GetUser().id}&scope=bot&permissions=343273214`,
        botId:ctx.discord.GetBotId()
      }
    else
      ctx.body={
        img:"https://cdn.discordapp.com/embed/avatars/0.png",
        message:"Bot not started yet or not ready",
        link:"",
        botId: -1
      }
      await next()
  })

router.use('/token', Token.routes(), Token.allowedMethods());
router.use('/bot', Bot.routes(), Bot.allowedMethods());
router.use('/voice',Voice.routes(),Voice.allowedMethods());
router.use('/sboard',sBoard.routes(),sBoard.allowedMethods());

export default router