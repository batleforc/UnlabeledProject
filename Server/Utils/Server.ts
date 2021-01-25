const Koa = require('koa')

class WebServer{
    app
    io
    server
    constructor(Port : number){
        this.app=Koa();
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
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