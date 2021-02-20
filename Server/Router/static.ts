var serve =require('koa-static')
var fs = require('fs')
var path = require('path')
var  getStaticContent = ()=>{
  var CheminClient = path.join(__dirname,"client","build")
  if(!fs.existsSync(CheminClient)){

  }
}

export default {
    
}