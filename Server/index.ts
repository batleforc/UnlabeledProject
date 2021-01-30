require('dotenv-flow').config()
import WebServer from './Utils/Server'

var Serveur = new WebServer(Number(process.env.PORT))

console.log(process.env.PORT)
console.log("JE suis un test2")