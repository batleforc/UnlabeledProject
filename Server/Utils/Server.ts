import Router from "koa-router"

var Koa = require('koa')
var KoaBody = require('koa-body')
var mount = require('koa-mount')
class WebServer{
    app : any
    io : any
    server : any
    constructor(Port : number){
        this.app= new Koa();
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.app.use(KoaBody())
        this.app.use(async (ctx:any,next:any)=>{

        })
    }

    GetApp = () => this.app
    GetSocket = () => this.io
    GetServer = () => this.server

    AddRouter = (router:Router) => this.app.use(router.routes()).use(router.allowedMethods())
    
    ListenServer = (Port:number,callback:Function) => this.server.listen(Port,callback)

    AddToAppContext = (key:string,ContextObject:object) => this.app.context[key] = ContextObject

    MountStatic = (path:string,koaMiddleware:any) => this.app.use(mount(path,koaMiddleware))
}

export default WebServer;