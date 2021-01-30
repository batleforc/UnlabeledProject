import Router from "koa-router"

var Koa = require('koa')
var KoaBody = require('koa-body')
var mount = require('koa-mount')
class WebServer{
    app : any
    io : any
    server : any
    Port : number
    constructor(Port : number){
        this.Port =Port
        this.app= new Koa();
        this.server = require('http').createServer(this.app.callback())
        this.io = require('socket.io')(this.server)
        this.app.use(KoaBody())
        this.app.use(async (ctx:any,next:any)=>{

            next()
        })
    }

    GetApp = () => this.app
    GetSocket = () => this.io
    GetServer = () => this.server

    AddRouter = (router:Router) => this.app.use(router.routes()).use(router.allowedMethods())
    
    ListenServer = (callback:Function) => this.server.listen(this.Port,callback)

    AddToAppContext = (key:string,ContextObject:object) => this.app.context[key] = ContextObject

    MountStatic = (path:string,koaMiddleware:any) => this.app.use(mount(path,koaMiddleware))
}

export default WebServer;