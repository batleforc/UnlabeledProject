const Koa = require('koa')
const KoaBody = require('koa-body')
class WebServer{
    app : any
    io : any
    server : any
    constructor(Port : number){
        this.app=Koa();
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.app.use(KoaBody())
        this.app.use(async (ctx,next)=>{

        })
    }

    GetApp = () => this.app
    GetSocket = () => this.io
    GetServer = () => this.server
    
    ListenServer = (Port:number,callback:Function) => this.server.listen(Port,callback)

    AddToAppContext = (key:string,ContextObject:object) => this.app.context[key] = ContextObject
}

module.exports = WebServer