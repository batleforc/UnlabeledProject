var Router = require('@koa/router');
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






export default router