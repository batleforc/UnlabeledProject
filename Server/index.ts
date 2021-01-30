require('dotenv-flow').config()
import WebServer from './Utils/Server'

var Serveur = new WebServer(Number(process.env.SERVER_PORT))

console.log(process.env.SERVER_PORT)
console.log("JE suis un test2")



Serveur.ListenServer(()=>{
    console.log("Serveur is listening on "+process.env.SERVER_PORT)
})