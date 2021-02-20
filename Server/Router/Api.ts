var Router = require('@koa/router');
var router = new Router({
    prefix: '/Api'
});
router.get("/",async (ctx : any,next : any)=>{
    ctx.body = "Hello World"
})






export default router