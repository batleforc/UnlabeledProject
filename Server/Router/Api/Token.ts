import Router from "@koa/router";
import { EnhancedStore } from "@reduxjs/toolkit";
import { TokenCreate, TokenDelete, TokenUpdate } from "../../Actions/Token";
var Token = new Router();

Token.get("/", async (ctx: any, next: any) => {
  ctx.body = (ctx.Redux as EnhancedStore).getState().Token.Token;
  await next();
})
  .post("/", async (ctx: any, next: any) => {
    var body = ctx.request.body;
    if (body.label === undefined || body.token === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await ctx.Redux.dispatch(
        TokenCreate({ label: body.label, token: body.token })
      );
      ctx.body = (ctx.Redux as EnhancedStore).getState().Token.Token;
    }
    await next();
  })
  .delete("/:id", async (ctx: any, next: any) => {
    var params = ctx.params.id;
    if (params === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await ctx.Redux.dispatch(TokenDelete({ TokenId: Number(params) }));
    }
    ctx.body = (ctx.Redux as EnhancedStore).getState().Token.Token;
    await next();
  })
  .put("/:id", async (ctx: any, next: any) => {
    var body = ctx.request.body;
    if (
      ctx.params.id === undefined ||
      body.label === undefined ||
      body.token === undefined
    ) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await ctx.Redux.dispatch(
        TokenUpdate({ id: ctx.params.id, label: body.label, token: body.token })
      );
    }
    ctx.body = (ctx.Redux as EnhancedStore).getState().Token.Token;
    await next();
  });

export default Token;
