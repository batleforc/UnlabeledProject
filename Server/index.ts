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
Serveur.AddRouter(Api)

DiscordClient.FireWhenReady(()=>{
  console.log("I'm ready")
})

Serveur.ListenServer(()=>{
  console.log("Serveur is listening on "+process.env.SERVER_PORT)
})