import { Socket } from "dgram"
import Router from "koa-router"
var {Log} = require('./Log')

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
        Log("WebServer","Le webServeur est initialiser")
    }

    GetApp = () => this.app
    GetSocket = () => this.io
    GetServer = () => this.server

    // KOA
    AddRouter = ( router : Router ) => this.app.use(router.routes()).use(router.allowedMethods())

    ListenServer = ( callback : Function ) => this.server.listen(this.Port,callback)

    AddToAppContext = ( key : string , ContextObject : object ) => this.app.context[key] = ContextObject

    MountStatic = ( path : string , koaMiddleware : any ) => this.app.use(mount(path,koaMiddleware))

    // SOCKET.IO
    AddListener = ( event : string , whatToDo : Function ) => this.io.on('connection', (Socket : Socket) => {
        Socket.on(event,(param : any)=>whatToDo(Socket,param))
    })
}

export default WebServer;