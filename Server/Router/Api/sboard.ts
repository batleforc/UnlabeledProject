import Router from '@koa/router'
var sBoard = new Router();

sBoard
  .get("/", async (ctx : any, next : any) =>{
    ctx.body=ctx.Db.GetAllTab()
    next()
  })
  .get("/:id", async (ctx : any, next : any) =>{
    if(ctx.params.id===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body=ctx.Db.GetAllTabItem(ctx.params.id)
    next()
  })



export default sBoard;