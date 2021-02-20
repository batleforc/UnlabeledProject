import Router from '@koa/router'
import Token from './Api/Token'
var router = new Router({
  prefix: '/Api'
});
router
  .get("/",async (ctx : any,next : any)=>{
    ctx.body = "Hello World"
  })
  .post("/",(ctx : any,next : any)=>{
    ctx.body=ctx.request.body
  })

router.use('/', Token.routes(), Token.allowedMethods());

export default router