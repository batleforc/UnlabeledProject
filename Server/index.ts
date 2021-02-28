console.log("Serveur Start")
require('dotenv-flow').config()
import WebServer from './Utils/Server'
import Store from './Utils/Store'
import DataBase from './Utils/Db'
import Discord from './Utils/Discord'
import Api from './Router/Api'
var DiscordClient = new Discord();
var store = new Store();
var Serveur = new WebServer(Number(process.env.SERVER_PORT))
var Db = new DataBase(store);

Serveur.AddToAppContext("Db",Db)
Serveur.AddToAppContext("discord",DiscordClient)
Serveur.AddToAppContext("store",store)
Serveur.AddToAppContext("io",Serveur.GetSocket())
Serveur.AddRouter(Api)
Serveur.GetSocket().on('connection',(socket:any)=>{
  console.log("JOSEPHINE EST CONNECTER")
})
Serveur.AddListener("message",(socket : any,param : any)=>{
  socket.emit("test",param)
})

DiscordClient.FireWhenReady(Serveur.GetSocket(),()=>{
  console.log("I'm ready")
})

DiscordClient.FireWhenDisconnect(()=>{
  console.log("I'm Off")
})

Serveur.ListenServer(()=>{
  console.log("Serveur is listening on "+process.env.SERVER_PORT)
})