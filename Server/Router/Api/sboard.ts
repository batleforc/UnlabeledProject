import Router from '@koa/router'
import DataBase from '../../Utils/Db';
var sBoard = new Router();

sBoard
  .get("/", async (ctx : any, next : any) =>{
    ctx.body= await ctx.Db.GetAllTab()
    next()
  })
  .post("/",async (ctx : any, next : any) => {
    var {label} = ctx.request.body
    if(label===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    await (ctx.Db as DataBase).InsertTab(label);
    ctx.body=ctx.Db.GetAllTab()
    await next()
  })
  .delete("/:TabId", async (ctx : any, next : any) =>{
    if(ctx.params.TabId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    await ctx.Db.DeleteTab(ctx.params.TabId)
    ctx.body=ctx.Db.GetAllTab()
    return await next()
  })
  .put("/:TabId", async (ctx : any, next : any) => {
    var {label,content} = ctx.request.body
    var {TabId} = ctx.params
    if(TabId===undefined){
      ctx.status = 400
      ctx.body={message:"Error one argument missing"}
      return await next()
    }
    if(label!==undefined){
      await (ctx.Db as DataBase).EditTabLabel(TabId,label)
    }
    if(content!==undefined){
      await (ctx.Db as DataBase).EditTabContent(TabId,JSON.stringify(content))
    }
    ctx.body= await ctx.Db.GetAllTab()
    return await next()
  })



export default sBoard;