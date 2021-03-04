import {Log, ModuleLog} from './Utils/Log'
ModuleLog("Serveur","Starting")
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
  Log("Socket","Un utilisateur est connecter")
})
Serveur.AddListener("message",(socket : any,param : any)=>{
  socket.emit("test",param)
})
DiscordClient.DefaultFire(Serveur.GetSocket())

Serveur.ListenServer(()=>{
  ModuleLog("Serveur",`Le serveur est en écoute sur le port ${String(process.env.SERVER_PORT)} et fonctionne en ${String(process.env.NODE_ENV)}`)
})