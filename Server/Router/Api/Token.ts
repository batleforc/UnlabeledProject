import Router from '@koa/router'
var Token = new Router();

Token
  .get("/", async (ctx : any , next : any) => {
    ctx.body = ctx.Db.GetAllToken()
    return await next()
  })
  .post("/", async (ctx : any , next : any) => {
    var body = ctx.request.body;
    if(body.label===undefined||body.token===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    ctx.body = ctx.Db.InsertToken(body.label,body.token)
    await next()
  })
  .delete("/:id", async (ctx : any , next : any) => {
    var params = ctx.params.id;
    if(params===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    ctx.body = ctx.Db.DeleteToken(params)
    await next()
  })
  .put("/:id", async (ctx : any , next : any) => {
    var body = ctx.request.body;
    if(ctx.params.id===undefined||body.label===undefined||body.token===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    ctx.body = ctx.Db.EditToken(ctx.params.id,body.label,body.token)
    await next()
  })

export default Token;