import Router from "@koa/router";
import { Log } from "../../Utils/Log";
import Store from "../../Actions/index";
import { BoardCreate, BoardDelete, BoardUpdate } from "../../Actions/Board";

var sBoard = new Router();

sBoard
  .get("/", async (ctx: any, next: any) => {
    ctx.body = Store.getState().Board.Board;
    await next();
  })
  .post("/", async (ctx: any, next: any) => {
    var { label } = ctx.request.body;
    if (label === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await Store.dispatch(BoardCreate({ label: label }));
      Log("Board", `[${ctx.request.ip}] ajout d'un board nommer ${label}`);
      ctx.body = Store.getState().Board.Board;
    }
    await next();
  })
  .delete("/:TabId", async (ctx: any, next: any) => {
    if (ctx.params.TabId === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await Store.dispatch(BoardDelete({ TabId: ctx.params.TabId }));
      Log(
        "Board",
        `[${ctx.request.ip}] suppression d'un board a l'id ${ctx.params.TabId}`
      );
      ctx.body = Store.getState().Board.Board;
    }
    await next();
  })
  .put("/:TabId", async (ctx: any, next: any) => {
    var { label, content } = ctx.request.body;
    var { TabId } = ctx.params;
    if (TabId === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error one argument missing" };
    } else {
      await Store.dispatch(
        BoardUpdate({
          TabId: TabId,
          label: label,
          content: content,
        })
      );
      Log(
        "Board",
        `[${
          ctx.request.ip
        }] modification du board ${TabId} => {content:${JSON.stringify(
          content
        )},label:${label}}`
      );
      ctx.body = Store.getState().Board.Board;
    }
    await next();
  });

export default sBoard;
