import serve from 'koa-static'
import koa from 'koa'
import path from 'path'

var Client = new koa();
console.log(path.resolve(__dirname,"..",'..',"build"))
Client.use(serve(path.resolve(__dirname,"..",'..',"build")))

export default Client;
