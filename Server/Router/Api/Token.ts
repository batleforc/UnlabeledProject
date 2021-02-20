import Router from '@koa/router'
var Token = new Router({
  prefix:'token'
});

Token
  .get("/", async (ctx : any , next : any) => {
    ctx.body = ctx.Db.GetAllToken()
  })
  .post("/", async (ctx : any , next : any) => {
    var body = ctx.request.body;
    if(body.label===undefined||body.token===undefined){
      ctx.status = 400
      return ctx.body={message:"Error one argument missing"}
    }
    return ctx.body = ctx.Db.InsertToken(body.label,body.token)
  })
  .delete("/:id", async (ctx : any , next : any) => {
    var params = ctx.params.id;
    console.log(params)
    if(params===undefined){
      ctx.status = 400
      return ctx.body={message:"Error one argument missing"}
    }
    ctx.body = ctx.Db.DeleteToken(params)
  })
  .put("/:id", async (ctx : any , next : any) => {
    var body = ctx.request.body;
    if(ctx.params.id===undefined||body.label===undefined||body.token===undefined){
      ctx.status = 400
      return ctx.body={message:"Error one argument missing"}
    }
    return ctx.body = ctx.Db.EditToken(ctx.params.id,body.label,body.token)
  })

export default Token;