import Router from '@koa/router'
import DataBase from '../../Utils/Db';
var sBoard = new Router();

sBoard
  .get("/", async (ctx : any, next : any) =>{
    ctx.body=ctx.Db.GetAllTab()
    next()
  })
  .post("/",async (ctx : any, next : any) => {
    var {label} = ctx.request.body
    if(label===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body = (ctx.Db as DataBase).InsertTab(label);
    return next()
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
  .put("/:TabId", async (ctx : any, next : any) => {
    var {label} = ctx.request.body
    var {TabId} = ctx.params
    if(label===undefined&&TabId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body = (ctx.Db as DataBase).EditTabLabel(TabId,label)
    return next()
  })
  .put("/:TabId/", async (ctx : any, next : any) =>{
    var {content} = ctx.request.body
    var {TabId} = ctx.params
    if(content===undefined&&TabId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return next()
    }
    ctx.body = (ctx.Db as DataBase).EditTabContent(TabId,content)
    return next()
  })



export default sBoard;