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
  .delete("/tab/:ItemId", async (ctx : any, next : any) =>{
    if(ctx.params.ItemId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body=ctx.Db.DeleteTabItem(ctx.params.ItemId)
    next()
  })
  .delete("/:TabId", async (ctx : any, next : any) =>{
    if(ctx.params.TabId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body=ctx.Db.DeleteTab(ctx.params.TabId)
    next()
  })



export default sBoard;